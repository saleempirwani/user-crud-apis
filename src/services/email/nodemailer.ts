import nodemailer from "nodemailer";
import { EmailOptions } from "../../types/email-types";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PWD,
  },
});

export const nodemailerEmail = async (options: EmailOptions) => {
  const { senderName, senderEmail, receiverEmails, subject, html } = options;

  return await transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: receiverEmails.join(" "),
    subject: subject,
    html: html,
  });
};
