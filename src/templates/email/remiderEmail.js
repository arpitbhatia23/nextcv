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

export const ReminderEmail = async (email, name) => {
  try {
    const safeName = escapeHtml(name?.trim() || "there");

    const { data, error } = await resend.emails.send({
      from: "NextCV <team@nextcv.in>",
      to: email,
      subject: "Your resume is waiting for you 🚀",
      text: `
Hi ${name?.trim() || "there"},

You started building your resume on NextCV. Let's finish what you started!

Create a professional, ATS-friendly resume with AI-powered writing assistance, showcase your projects and skills, and get ready to apply with confidence.

Continue building your resume:
https://www.nextcv.in/

Your next career opportunity starts with taking the next step.

Team NextCV
      `.trim(),

      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>Finish your resume | NextCV</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;color:#172033;">

  <!-- Hidden preview text -->
  <div style="display:none;font-size:1px;color:#f4f6fb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    You're just a few steps away from a professional resume. Pick up where you left off with NextCV.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f6fb;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;background:#ffffff;border-radius:16px;overflow:hidden;">

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

              <div style="display:inline-block;padding:7px 12px;background:#eef2ff;border-radius:20px;color:#4338ca;font-size:12px;font-weight:700;">
                YOUR RESUME IS WAITING
              </div>

              <h1 style="margin:22px 0 14px;font-size:30px;line-height:1.25;letter-spacing:-0.8px;color:#111827;">
                Hi ${safeName}, let's finish your resume!
              </h1>

              <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#536078;">
                You started creating your resume on NextCV. Don't let that progress go to waste — take the next step toward presenting your skills and experience with confidence.
              </p>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#536078;">
                Whether you're a fresher applying for your first job or looking for your next opportunity, a well-structured resume helps recruiters understand what you bring to the table.
              </p>

              <!-- Benefits card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f8f9ff;border:1px solid #e8eaff;border-radius:12px;">
                <tr>
                  <td style="padding:22px 20px;">
                    <h2 style="margin:0 0 17px;font-size:17px;color:#111827;">
                      Make your resume stand out
                    </h2>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" valign="top" style="padding:0 0 14px;font-size:18px;color:#4f46e5;">&#10003;</td>
                        <td style="padding:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
                          <strong>AI-powered writing</strong><br />
                          Improve your summary, experience and project descriptions.
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top" style="padding:0 0 14px;font-size:18px;color:#4f46e5;">&#10003;</td>
                        <td style="padding:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
                          <strong>Professional templates</strong><br />
                          Present your qualifications in a clean, ATS-friendly format.
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top" style="padding:0 0 14px;font-size:18px;color:#4f46e5;">&#10003;</td>
                        <td style="padding:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
                          <strong>Showcase your projects and skills</strong><br />
                          Help employers see what you can actually do.
                        </td>
                      </tr>
                      <tr>
                        <td width="30" valign="top" style="font-size:18px;color:#4f46e5;">&#10003;</td>
                        <td style="font-size:14px;line-height:1.7;color:#374151;">
                          <strong>More tools for your job search</strong><br />
                          Create a cover letter and share your professional profile.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Primary CTA -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                <tr>
                  <td align="center" style="border-radius:9px;background:#4f46e5;">
                    <a href="https://www.nextcv.in/"
                       target="_blank"
                       style="display:block;padding:17px 20px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:9px;">
                      Continue Building My Resume &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 0;text-align:center;font-size:12px;line-height:1.7;color:#7b8498;">
                Click the button to return to NextCV and continue.
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
              <a href="https://www.nextcv.in/" style="font-size:12px;color:#4f46e5;text-decoration:none;">
                www.nextcv.in
              </a>
              <p style="margin:12px 0 0;font-size:11px;line-height:1.6;color:#9aa2b2;">
                You received this email because you started creating a resume on NextCV.
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
      console.error("NextCV reminder email failed:", error);
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
