import { resend } from "@/helper/resend";

export const sendWellcomeMessage = async (email, name) => {
  try {
    await resend.emails.send({
      from: "team@nextcv.in",
      to: email,
      subject: `${name}, your ATS-friendly resume is 3 minutes away 🚀`,

      html: `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333">
    
    <h2>Hey ${name} 👋</h2>

    <p>Welcome to <b>NextCV</b> — glad you're here.</p>

    <p>
      We built NextCV to help you create a <b>clean, ATS-friendly resume</b> 
      that recruiters can actually read and shortlist.
    </p>

    <p>
      Most users finish their resume in <b>under 3 minutes</b>.
    </p>

    <div style="margin:30px 0">
      <a 
        href="https://www.nextcv.in/dashboard"
        style="
          background:#4f46e5;
          color:white;
          padding:14px 22px;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
        "
      >
        Build My Resume →
      </a>
    </div>

    <p style="color:#555">
      Tip: Resumes built with NextCV are designed to pass
      <b>ATS screening used by most companies</b>.
    </p>

    <p>
      If you need help, just reply to this email.  
      I'm happy to help you land your next job.
    </p>

    <p>— Team NextCV</p>

  </div>
`,
    });
  } catch (error) {
    console.log("error", error?.message || "Internal serverr error");
  }
};
