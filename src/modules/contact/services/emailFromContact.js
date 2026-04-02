import { apiError, apiResponse } from "@/shared";
import nodemailer from "nodemailer";

export const emailFromContact = async ({ name, email, message }) => {
  if (!name || !email || !message) {
    throw new apiError(400, "all field are required");
  }

  // Create transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // true = 465, false = other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send email
  await transporter.sendMail({
    from: `"Logistics Website" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL, // where the data is sent
    subject: `New Contact Form Submission`,
    html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
  });

  return NextResponse.json(new apiResponse(200, "email send sucessullfy"));
};
