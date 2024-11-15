import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export function sendEmail({ to, subject, html }) {
  transporter.sendMail({
    to,
    subject,
    html,
  });
}

function sendActivationEmail(to, token) {
  const href = `${process.env.CLIENT_ORIGIN}/activation/${token}`;
  const html = `
    <h1>Activate account</h1>
    <a href="${href}">${href}</a>
  `;

  return sendEmail({
    to,
    subject: "Activate account",
    html,
  });
}

export const emailService = {
  sendActivationEmail,
  sendEmail,
};
