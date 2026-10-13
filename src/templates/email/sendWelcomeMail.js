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

export const sendWellcomeMessage = async (email, name) => {
  try {
    const safeName = escapeHtml(name?.trim() || "there");

    const { data, error } = await resend.emails.send({
      from: "NextCV <team@nextcv.in>",
      to: email,
      subject: "Welcome to NextCV 👋 Your resume starts here",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to NextCV</title>
</head>

<body style="margin:0;padding:0;background:#f3f5fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">

  <!-- Email preview -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Create a professional, ATS-friendly resume with NextCV and take the next step in your career.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f5fb;">
    <tr>
      <td align="center" style="padding:30px 12px;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
          style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:26px 30px;border-bottom:1px solid #edf0f5;">
              <a href="https://www.nextcv.in/"
                style="font-size:26px;font-weight:800;letter-spacing:-1px;color:#4f46e5;text-decoration:none;">
                NextCV<span style="color:#111827;">.</span>
              </a>
              <p style="margin:5px 0 0;font-size:12px;color:#7b8498;">
                Your career journey starts here
              </p>
            </td>
          </tr>

          <!-- Welcome content -->
          <tr>
            <td style="padding:34px 30px 30px;">

              <div style="display:inline-block;background:#eef2ff;color:#4338ca;padding:7px 12px;border-radius:20px;font-size:12px;font-weight:bold;">
                WELCOME TO NEXTCV
              </div>

              <h1 style="margin:22px 0 14px;font-size:30px;line-height:1.25;letter-spacing:-0.7px;color:#111827;">
                Hey ${safeName} 👋<br>
                Let's build your next opportunity.
              </h1>

              <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#536078;">
                We're glad you're here! NextCV helps you turn your skills, education, and projects into a professional resume that presents your strengths clearly.
              </p>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#536078;">
                Whether you're applying for your first job or exploring your next move, you can get started with AI-powered writing assistance and professional resume templates.
              </p>

              <!-- Benefits -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                style="background:#f8f9ff;border:1px solid #e7eaff;border-radius:12px;">
                <tr>
                  <td style="padding:22px 20px;">
                    <h2 style="margin:0 0 18px;font-size:18px;color:#111827;">
                      Here's how NextCV helps
                    </h2>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="32" valign="top" style="padding-bottom:15px;font-size:19px;color:#4f46e5;">&#10003;</td>
                        <td style="padding-bottom:15px;font-size:14px;line-height:1.7;color:#374151;">
                          <strong>Professional, ATS-friendly layouts</strong><br>
                          Present your qualifications in a clear, organized format.
                        </td>
                      </tr>
                      <tr>
                        <td width="32" valign="top" style="padding-bottom:15px;font-size:19px;color:#4f46e5;">&#10003;</td>
                        <td style="padding-bottom:15px;font-size:14px;line-height:1.7;color:#374151;">
                          <strong>AI-powered writing assistance</strong><br>
                          Improve your summary, work experience, and project descriptions.
                        </td>
                      </tr>
                      <tr>
                        <td width="32" valign="top" style="font-size:19px;color:#4f46e5;">&#10003;</td>
                        <td style="font-size:14px;line-height:1.7;color:#374151;">
                          <strong>Made for your career journey</strong><br>
                          Highlight your education, skills, and projects—even if you're a fresher.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                <tr>
                  <td align="center" bgcolor="#4f46e5" style="border-radius:9px;">
                    <a href="https://www.nextcv.in/dashboard"
                      target="_blank"
                      style="display:block;padding:17px 20px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:9px;">
                      Create My Resume &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:14px 0 0;text-align:center;font-size:12px;line-height:1.7;color:#7b8498;">
                Start building today. Your first step is the most important one.
              </p>

              <!-- Personal support -->
              <div style="margin-top:28px;padding-top:22px;border-top:1px solid #edf0f5;">
                <p style="margin:0 0 12px;font-size:14px;line-height:1.8;color:#536078;">
                  <strong style="color:#111827;">A quick tip:</strong> Don't worry if you're a fresher. Your projects, skills, and education can help tell your story.
                </p>

                <p style="margin:0;font-size:14px;line-height:1.8;color:#536078;">
                  Have a question? Just reply to this email—we're happy to help.
                </p>

                <p style="margin:20px 0 0;font-size:15px;line-height:1.7;color:#374151;">
                  Here's to your next big move,<br>
                  <strong style="color:#111827;">Team NextCV 🚀</strong>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px 25px;background:#fafbfe;border-top:1px solid #edf0f5;">
              <a href="https://www.nextcv.in/"
                style="font-size:13px;font-weight:bold;color:#4f46e5;text-decoration:none;">
                www.nextcv.in
              </a>

              <p style="margin:10px 0 0;font-size:11px;line-height:1.7;color:#929bad;">
                You received this email because you created an account on NextCV.
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:16px 0 0;font-size:11px;color:#9aa2b2;text-align:center;">
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
      console.error("Welcome email failed:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Welcome email error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    };
  }
};
