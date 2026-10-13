import { resend } from "@/helper/resend";

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]
  );

export const CAMPAIGN_TEMPLATES = {
  resume_sharing: {
    subject: "Your resume is ready to share!",
    badge: "RESUME SHARING READY",
    previewText:
      "Your premium resume is ready to share. Create a live shareable link for recruiters today.",
    headline: name => `Hi ${name}, your resume is ready to share!`,
    intro:
      "Great job unlocking your professional resume on NextCV! You now have access to live resume sharing so you can send a clean, verified link directly to recruiters and hiring managers.",
    secondaryText:
      "Sharing a direct web link lets recruiters review your credentials instantly on mobile or desktop without downloading bulky email attachments.",
    benefitsTitle: "Why share your live resume?",
    benefits: [
      {
        title: "One-click sharing",
        description: "Send your verified resume link via LinkedIn, WhatsApp, or email.",
      },
      {
        title: "Optimized for mobile & web",
        description: "Recruiters and hiring managers see a fast, responsive layout.",
      },
      {
        title: "Full privacy control",
        description: "Turn link access on or off anytime with a single toggle in your dashboard.",
      },
    ],
    ctaText: "Share My Resume",
    ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
  },

  portfolio_creation: {
    subject: "Complete your professional portfolio",
    badge: "PORTFOLIO BUILDER INCLUDED",
    previewText:
      "Your NextCV upgrade includes a free personal web portfolio. Set it up in minutes.",
    headline: name => `Hi ${name}, turn your resume into a live portfolio!`,
    intro:
      "Your NextCV Premium/Elite access includes a free, modern web portfolio automatically generated from your resume information. Show employers what you can do with a personal portfolio website.",
    secondaryText:
      "A live portfolio gives you a competitive edge when applying for tech, engineering, design, marketing, and business roles.",
    benefitsTitle: "What you get with your portfolio:",
    benefits: [
      {
        title: "Instant setup",
        description:
          "Your projects, skills, and background are converted into a personal site automatically.",
      },
      {
        title: "Showcase real projects",
        description: "Feature live demo links, GitHub repositories, and quantifiable achievements.",
      },
      {
        title: "Personal link for your bio",
        description:
          "Add your personal portfolio URL to your LinkedIn profile and job applications.",
      },
    ],
    ctaText: "Create My Portfolio",
    ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
  },

  portfolio_publish: {
    subject: "Your portfolio is waiting to go live",
    badge: "READY TO PUBLISH",
    previewText:
      "Your portfolio is ready on NextCV. Publish it now so employers can explore your work.",
    headline: name => `Hi ${name}, your portfolio is ready to go live!`,
    intro:
      "You've built your personal portfolio on NextCV, but it's currently set to private. Make it public with one click so recruiters, hiring managers, and clients can find and explore your work.",
    secondaryText:
      "Publishing your portfolio gives you an active public profile link that you can share across job portals, professional networks, and resumes.",
    benefitsTitle: "Ready when you are:",
    benefits: [
      {
        title: "One-click publish",
        description: "Switch your portfolio from private to public instantly from your dashboard.",
      },
      {
        title: "Custom web address",
        description: "Share your dedicated NextCV portfolio URL with recruiters and clients.",
      },
      {
        title: "Private whenever you want",
        description: "You have 100% control—pause or unpublish your link anytime.",
      },
    ],
    ctaText: "Publish My Portfolio",
    ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
  },

  premium_draft: {
    subject: "Finish your professional resume",
    badge: "PREMIUM DRAFT IN PROGRESS",
    previewText: "Finish your executive-grade resume on NextCV and get ready to apply.",
    headline: name => `Hi ${name}, let's finish your professional resume!`,
    intro:
      "You started crafting a resume using an executive-grade template on NextCV. You're just a few steps away from an ATS-ready document that highlights your true potential.",
    secondaryText:
      "Take a few minutes today to complete your experience, skills, and projects so you're ready when the right opportunity arrives.",
    benefitsTitle: "Finish strong with NextCV:",
    benefits: [
      {
        title: "ATS-tested formatting",
        description: "Designed for clear automated parsing and high recruiter readability.",
      },
      {
        title: "AI writing assistant",
        description: "Refine bullet points, impact metrics, and summaries in seconds.",
      },
      {
        title: "Real-time layout preview",
        description: "See your final PDF formatting update as you type.",
      },
    ],
    ctaText: "Finish My Resume",
    ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
  },

  draft_resume: {
    subject: "Your resume is waiting for you",
    badge: "YOUR RESUME IS WAITING",
    previewText: "Pick up where you left off on NextCV. Finish your resume in minutes.",
    headline: name => `Hi ${name}, let's finish what you started!`,
    intro:
      "You started building your resume on NextCV. Don't let that progress go to waste—take the next step toward presenting your skills and experience with confidence.",
    secondaryText:
      "Whether you're applying for your first role or seeking a new opportunity, a clean, structured resume helps recruiters recognize your qualifications.",
    benefitsTitle: "Make your resume stand out:",
    benefits: [
      {
        title: "AI-powered writing",
        description: "Improve your summary, experience, and project descriptions.",
      },
      {
        title: "Professional templates",
        description: "Present your qualifications in a clean, ATS-friendly format.",
      },
      {
        title: "Showcase skills & impact",
        description: "Help employers see what you can actually achieve.",
      },
    ],
    ctaText: "Continue My Resume",
    ctaUrl: "https://www.nextcv.in/dashboard/my-resume",
  },

  create_resume: {
    subject: "Create your professional resume",
    badge: "START YOUR RESUME",
    previewText: "Build a job-ready ATS resume in under 5 minutes with NextCV.",
    headline: name => `Hi ${name}, build your professional resume!`,
    intro:
      "Welcome to NextCV! Take the first step toward your next career move by creating a professional, ATS-optimized resume.",
    secondaryText:
      "Even if you're a fresher, our guided builder helps you showcase your education, coursework, and projects clearly for campus and off-campus drives.",
    benefitsTitle: "Here's how NextCV helps:",
    benefits: [
      {
        title: "Guided 5-minute builder",
        description: "Step-by-step sections make it simple to draft your qualifications.",
      },
      {
        title: "ATS-friendly design",
        description: "Formatting tested for seamless recruiter and screening readability.",
      },
      {
        title: "AI bullet suggestions",
        description: "Write clear, impactful descriptions for your projects and skills.",
      },
    ],
    ctaText: "Build My Resume",
    ctaUrl: "https://www.nextcv.in/dashboard/builder",
  },
};

export const ReminderEmail = async (email, name, campaignOptions = {}) => {
  try {
    const safeName = escapeHtml(name?.trim() || "there");
    const rawName = name?.trim() || "there";

    // Determine campaign template
    const campaignKey = campaignOptions.campaign || "draft_resume";
    const templateConfig = CAMPAIGN_TEMPLATES[campaignKey] || CAMPAIGN_TEMPLATES.draft_resume;

    // Allow options to override default template values
    const subject = campaignOptions.subject || templateConfig.subject;
    const badge = campaignOptions.badge || templateConfig.badge;
    const previewText = campaignOptions.previewText || templateConfig.previewText;
    const headline = campaignOptions.headline || templateConfig.headline(safeName);
    const intro = campaignOptions.intro || templateConfig.intro;
    const secondaryText = campaignOptions.secondaryText || templateConfig.secondaryText;
    const benefitsTitle = campaignOptions.benefitsTitle || templateConfig.benefitsTitle;
    const benefits = campaignOptions.benefits || templateConfig.benefits;
    const ctaText = campaignOptions.ctaText || templateConfig.ctaText;
    const ctaUrl = campaignOptions.ctaUrl || templateConfig.ctaUrl;

    const safeSubject = escapeHtml(subject);
    const safeBadge = escapeHtml(badge);
    const safeCtaText = escapeHtml(ctaText);
    const safeCtaUrl = escapeHtml(ctaUrl);

    // Text version for text-only clients
    const benefitsText = benefits.map(b => `• ${b.title}: ${b.description}`).join("\n");

    const textContent = `
Hi ${rawName},

${intro}

${secondaryText}

${benefitsTitle}
${benefitsText}

${ctaText}:
${ctaUrl}

Your next career opportunity starts with taking the next step.

Team NextCV
https://www.nextcv.in
    `.trim();

    // HTML table rows for benefits
    const benefitsHtml = benefits
      .map(
        b => `
        <tr>
          <td width="30" valign="top" style="padding:0 0 14px;font-size:18px;color:#4f46e5;">&#10003;</td>
          <td style="padding:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
            <strong>${escapeHtml(b.title)}</strong><br />
            ${escapeHtml(b.description)}
          </td>
        </tr>`
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "NextCV <team@nextcv.in>",
      to: email,
      subject,
      text: textContent,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>${safeSubject} | NextCV</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">

  <!-- Hidden preview text -->
  <div style="display:none;font-size:1px;color:#f4f6fb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(previewText)}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f6fb;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);">

          <!-- Brand header -->
          <tr>
            <td style="padding:28px 32px;border-bottom:1px solid #edf0f5;">
              <a href="https://www.nextcv.in/" style="font-size:25px;font-weight:800;letter-spacing:-1px;color:#4f46e5;text-decoration:none;">
                NextCV<span style="color:#111827;">.</span>
              </a>
              <div style="margin-top:5px;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#7b8498;">
                Your next career move starts here
              </div>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:36px 32px 24px;">

              <div style="display:inline-block;padding:7px 12px;background:#eef2ff;border-radius:20px;color:#4338ca;font-size:12px;font-weight:700;letter-spacing:0.5px;">
                ${safeBadge}
              </div>

              <h1 style="margin:22px 0 14px;font-size:28px;line-height:1.3;letter-spacing:-0.8px;color:#111827;">
                ${headline}
              </h1>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#536078;">
                ${escapeHtml(intro)}
              </p>

              <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#536078;">
                ${escapeHtml(secondaryText)}
              </p>

              <!-- Benefits card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8f9ff;border:1px solid #e8eaff;border-radius:12px;">
                <tr>
                  <td style="padding:22px 20px;">
                    <h2 style="margin:0 0 17px;font-size:16px;color:#111827;">
                      ${escapeHtml(benefitsTitle)}
                    </h2>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      ${benefitsHtml}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Primary CTA -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                <tr>
                  <td align="center" style="border-radius:9px;background:#4f46e5;">
                    <a href="${safeCtaUrl}"
                       target="_blank"
                       style="display:block;padding:17px 24px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:9px;">
                      ${safeCtaText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 0;text-align:center;font-size:12px;line-height:1.7;color:#7b8498;">
                Click the button to continue directly on NextCV.
              </p>

              <p style="margin:28px 0 0;font-size:15px;line-height:1.8;color:#536078;">
                Your next opportunity could be closer than you think. Take the next step today.
              </p>

              <p style="margin:20px 0 0;font-size:15px;line-height:1.7;color:#374151;">
                Here's to your next big move,<br />
                <strong style="color:#111827;">Team NextCV</strong> 🚀
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:22px 32px;background:#fafbfe;border-top:1px solid #edf0f5;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;line-height:1.7;color:#7b8498;">
                Helping you put your best professional self forward.
              </p>
              <a href="https://www.nextcv.in/" style="font-size:12px;color:#4f46e5;text-decoration:none;font-weight:600;">
                www.nextcv.in
              </a>
              <p style="margin:12px 0 0;font-size:11px;line-height:1.6;color:#9aa2b2;">
                You received this email because you have an account on NextCV.
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:18px 0 0;font-size:11px;line-height:1.6;color:#9aa2b2;text-align:center;">
          © ${new Date().getFullYear()} NextCV. All rights reserved.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    if (error) {
      console.error(`NextCV reminder email failed for ${email} (campaign: ${campaignKey}):`, error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("NextCV reminder email error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send reminder email",
    };
  }
};
