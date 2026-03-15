import { resend } from "@/helper/resend";

export const ReminderEmail = async (email, name) => {
  try {
    resend.emails.send({
      from: "Nextcv <team@nextcv.in>",
      to: email,
      subject: `${name}, finish your resume and start getting interview calls`,
      html: `
  <div style="font-family: Arial, sans-serif; line-height:1.6;">
    <h2>Hi ${name},</h2>

    <p>You signed up for <b>NextCV</b> but haven’t finished your resume yet.</p>

    <p>A strong resume is often the first step to getting interview calls.</p>

    <p>It takes less than <b>2 minutes</b> to generate a clean ATS-friendly resume.</p>

    <p>
      <a href="https://nextcv.in/resume-builder"
         style="background:#4f46e5;color:white;padding:12px 20px;text-decoration:none;border-radius:6px;">
         Finish My Resume
      </a>
    </p>

    <p>Your next job opportunity could start with this resume.</p>

    <p>— Team NextCV 🚀</p>
  </div>
  `,
    });
  } catch (error) {
    return error;
    console.log("error", error.message);
  }
};
