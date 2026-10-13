import { User } from "@/modules/auth";
import Resume from "@/modules/resume/models/resume.model";
import { portfolio } from "@/modules/portfolio/model/portfolio";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import { ReminderEmail } from "@/templates/email/remiderEmail";
import { apiResponse } from "@/shared";
import { NextResponse } from "next/server";
import dbConnect from "@/shared/utils/dbConnect";

/**
 * Checks whether a given templateName belongs to the Premium or Elite tier.
 * Uses the canonical getTemplateByName lookup helper.
 */
export const isPremiumOrElite = templateName => {
  if (!templateName) return false;
  const template = getTemplateByName(templateName);
  if (!template || !template.tier) return false;
  const tier = String(template.tier).toLowerCase();
  return tier === "premium" || tier === "elite";
};

/**
 * Determines the single highest-priority reminder campaign for a given user.
 *
 * Priority order:
 * 1. Paid Premium/Elite resume without a shared resume (resume_sharing)
 * 2. Paid Premium/Elite resume without a portfolio (portfolio_creation)
 * 3. Existing portfolio that is unpublished (portfolio_publish)
 * 4. Draft Premium/Elite resume (premium_draft)
 * 5. Other draft resume (draft_resume)
 * 6. No resume (create_resume)
 * Fallback: null (no reminder needed)
 */
export const evaluateUserCampaign = ({
  user: _user = null,
  resumes = [],
  sharedResumesMap = new Map(),
  portfoliosMap = new Map(),
}) => {
  // Priority 6: No resume
  // User has no resume documents associated with their resume field
  if (!resumes || resumes.length === 0) {
    return {
      campaign: "create_resume",
      priority: 6,
      subject: "Create your professional resume",
      ctaText: "Build My Resume",
      ctaUrl: "https://www.nextcv.in/dashboard/builder",
      resumeId: null,
      resumeName: null,
      templateName: null,
    };
  }

  // Identify paid Premium or Elite resumes
  const paidPremiumResumes = resumes.filter(
    r => r.status === "paid" && isPremiumOrElite(r.ResumeType)
  );

  // Priority 1: Paid Premium/Elite resume without a shared resume
  const resumeNeedingSharing = paidPremiumResumes.find(r => {
    const rId = r._id.toString();
    return !sharedResumesMap.has(rId);
  });

  if (resumeNeedingSharing) {
    return {
      campaign: "resume_sharing",
      priority: 1,
      subject: "Your resume is ready to share!",
      ctaText: "Share My Resume",
      ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
      resumeId: resumeNeedingSharing._id,
      resumeName: resumeNeedingSharing.name,
      templateName: resumeNeedingSharing.ResumeType,
    };
  }

  // Priority 2: Paid Premium/Elite resume without a portfolio
  // (Condition: The paid Premium/Elite resume already has a shared resume, but no portfolio)
  const resumeNeedingPortfolio = paidPremiumResumes.find(r => {
    const rId = r._id.toString();
    const hasShared = sharedResumesMap.has(rId);
    const hasPortfolio = portfoliosMap.has(rId);
    return hasShared && !hasPortfolio;
  });

  if (resumeNeedingPortfolio) {
    return {
      campaign: "portfolio_creation",
      priority: 2,
      subject: "Complete your professional portfolio",
      ctaText: "Create My Portfolio",
      ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
      resumeId: resumeNeedingPortfolio._id,
      resumeName: resumeNeedingPortfolio.name,
      templateName: resumeNeedingPortfolio.ResumeType,
    };
  }

  // Priority 3: Existing portfolio that is unpublished (isPublic === false)
  // (Do not send a portfolio-publishing reminder when the portfolio is already public)
  const resumeNeedingPublish = paidPremiumResumes.find(r => {
    const rId = r._id.toString();
    const portfolioDoc = portfoliosMap.get(rId);
    return portfolioDoc && portfolioDoc.isPublic === false;
  });

  if (resumeNeedingPublish) {
    return {
      campaign: "portfolio_publish",
      priority: 3,
      subject: "Your portfolio is waiting to go live",
      ctaText: "Publish My Portfolio",
      ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
      resumeId: resumeNeedingPublish._id,
      resumeName: resumeNeedingPublish.name,
      templateName: resumeNeedingPublish.ResumeType,
    };
  }

  // Priority 4: Draft Premium/Elite resume
  const draftPremiumResume = resumes.find(
    r => r.status === "draft" && isPremiumOrElite(r.ResumeType)
  );

  if (draftPremiumResume) {
    return {
      campaign: "premium_draft",
      priority: 4,
      subject: "Finish your professional resume",
      ctaText: "Finish My Resume",
      ctaUrl: `https://www.nextcv.in/dashboard/resume/${draftPremiumResume._id}`,
      resumeId: draftPremiumResume._id,
      resumeName: draftPremiumResume.name,
      templateName: draftPremiumResume.ResumeType,
    };
  }

  // Priority 5: Other draft resume (any tier)
  const anyDraftResume = resumes.find(r => r.status === "draft");

  if (anyDraftResume) {
    return {
      campaign: "draft_resume",
      priority: 5,
      subject: "Your resume is waiting for you",
      ctaText: "Continue My Resume",
      ctaUrl: `https://www.nextcv.in/dashboard/resume/${anyDraftResume._id}`,
      resumeId: anyDraftResume._id,
      resumeName: anyDraftResume.name,
      templateName: anyDraftResume.ResumeType,
    };
  }

  // No reminder applicable (e.g. all paid resumes are shared & portfolios public, no pending drafts)
  return null;
};

/**
 * Main reminder campaign executor.
 *
 * Evaluates all eligible users across the 3 main groups and 6 priority levels,
 * selecting exactly one campaign per user, and dispatches the relevant emails.
 *
 * @param {Object} options
 * @param {number} [options.maxReminders=3] - Maximum reminder limit per user
 * @param {boolean} [options.force=false] - Bypass the reminderCount limit
 * @param {boolean} [options.dryRun=false] - Preview calculations without sending emails
 * @param {number} [options.limit=null] - Maximum number of users to process
 * @param {string} [options.targetUserId=null] - Run exclusively for a specific user ID
 */
export const sendReminder = async (options = {}) => {
  await dbConnect();

  const {
    maxReminders = 3,
    force = false,
    dryRun = false,
    limit = null,
    targetUserId = null,
  } = options;

  // 1. Build user query
  const userQuery = {
    email: { $exists: true, $ne: "" },
  };

  if (targetUserId) {
    userQuery._id = targetUserId;
  } else if (!force) {
    userQuery.$or = [
      { reminderCount: { $lt: maxReminders } },
      { reminderCount: { $exists: false } },
      { reminderCount: null },
    ];
  }

  let queryBuilder = User.find(userQuery).sort({ lastActive: -1 });

  if (limit && Number.isInteger(Number(limit)) && Number(limit) > 0) {
    queryBuilder = queryBuilder.limit(Number(limit));
  }

  const users = await queryBuilder.lean();

  if (!users || users.length === 0) {
    return NextResponse.json(
      new apiResponse(200, "No eligible users found for reminder campaign", {
        totalEvaluated: 0,
        eligible: 0,
        sent: 0,
        failed: 0,
        campaignBreakdown: {},
      })
    );
  }

  // 2. Gather all resume ObjectIds referenced in User.resume
  const allResumeIds = [];
  users.forEach(user => {
    if (Array.isArray(user.resume)) {
      user.resume.forEach(id => {
        if (id) allResumeIds.push(id);
      });
    } else if (user.resume) {
      allResumeIds.push(user.resume);
    }
  });

  // 3. Batch query Resume, SharedResume, and portfolio collections in parallel
  const [resumes, sharedResumes, portfolios] = await Promise.all([
    allResumeIds.length > 0
      ? Resume.find({ _id: { $in: allResumeIds } })
          .select("_id status ResumeType name")
          .lean()
      : [],
    allResumeIds.length > 0
      ? SharedResume.find({ resumeId: { $in: allResumeIds } })
          .select("resumeId userId isPublic slug")
          .lean()
      : [],
    allResumeIds.length > 0
      ? portfolio
          .find({ resumeId: { $in: allResumeIds } })
          .select("resumeId userId isPublic slug")
          .lean()
      : [],
  ]);

  // 4. Build indexed Maps for fast in-memory lookups
  const resumesById = new Map();
  resumes.forEach(r => {
    if (r?._id) resumesById.set(r._id.toString(), r);
  });

  const sharedResumesByResumeId = new Map();
  sharedResumes.forEach(sr => {
    if (sr?.resumeId) sharedResumesByResumeId.set(sr.resumeId.toString(), sr);
  });

  const portfoliosByResumeId = new Map();
  portfolios.forEach(p => {
    if (p?.resumeId) portfoliosByResumeId.set(p.resumeId.toString(), p);
  });

  // 5. Evaluate each user and select highest priority campaign
  const campaignQueue = [];
  const campaignBreakdown = {
    resume_sharing: 0,
    portfolio_creation: 0,
    portfolio_publish: 0,
    premium_draft: 0,
    draft_resume: 0,
    create_resume: 0,
  };

  for (const user of users) {
    const userResumeIds = Array.isArray(user.resume)
      ? user.resume.map(id => id?.toString()).filter(Boolean)
      : user.resume
        ? [user.resume.toString()]
        : [];

    const userResumes = userResumeIds.map(id => resumesById.get(id)).filter(Boolean);

    const decision = evaluateUserCampaign({
      user,
      resumes: userResumes,
      sharedResumesMap: sharedResumesByResumeId,
      portfoliosMap: portfoliosByResumeId,
    });

    if (decision) {
      campaignQueue.push({
        user,
        decision,
      });
      campaignBreakdown[decision.campaign] = (campaignBreakdown[decision.campaign] || 0) + 1;
    }
  }

  // 6. Handle Dry Run mode
  if (dryRun) {
    return NextResponse.json(
      new apiResponse(200, "Dry run completed. No emails were dispatched.", {
        dryRun: true,
        totalUsersEvaluated: users.length,
        eligibleForReminder: campaignQueue.length,
        noReminderNeeded: users.length - campaignQueue.length,
        campaignBreakdown,
        sampleQueue: campaignQueue.slice(0, 10).map(item => ({
          userId: item.user._id,
          email: item.user.email,
          campaign: item.decision.campaign,
          priority: item.decision.priority,
          subject: item.decision.subject,
          ctaText: item.decision.ctaText,
          ctaUrl: item.decision.ctaUrl,
        })),
      })
    );
  }

  // 7. Dispatch emails in controlled batches to respect Resend rate limits
  let sentCount = 0;
  let failCount = 0;
  const dispatchErrors = [];
  const BATCH_SIZE = 5;

  for (let i = 0; i < campaignQueue.length; i += BATCH_SIZE) {
    const batch = campaignQueue.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async ({ user, decision }) => {
        try {
          const res = await ReminderEmail(user.email, user.name, decision);

          if (res?.success) {
            sentCount++;
            await User.updateOne({ _id: user._id }, { $inc: { reminderCount: 1 } });
          } else {
            failCount++;
            dispatchErrors.push({
              email: user.email,
              campaign: decision.campaign,
              error: res?.error || "Send failed",
            });
          }
        } catch (err) {
          failCount++;
          dispatchErrors.push({
            email: user.email,
            campaign: decision.campaign,
            error: err.message,
          });
        }
      })
    );

    // Minor throttle between batches
    if (i + BATCH_SIZE < campaignQueue.length) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }

  return NextResponse.json(
    new apiResponse(200, "Reminder campaign executed successfully", {
      totalUsersEvaluated: users.length,
      eligibleForReminder: campaignQueue.length,
      sent: sentCount,
      failed: failCount,
      campaignBreakdown,
      errors: dispatchErrors.slice(0, 10),
    })
  );
};
