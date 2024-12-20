import ejs from "ejs";
import { APP_NAME, NO_REPLY_EMAIL } from "../../app-constants";
import { EmailOptions, OtpEmail } from "../../types/email-types";
import { nodemailerEmail } from "./nodemailer";

export const sendOTPEmail = async (optEmailOptions: OtpEmail) => {
  const { recipientEmail, recipientName, type, code } = optEmailOptions;

  let subject = "Confirm your Registration";
  let html = "";

  if (type === "RESET_PASSWORD") {
    subject = "Reset your Password";
  } else if (type === "CHANGED_EMAIL") {
    subject = "Change your Email";
  }

  const templatePath = `${process.cwd()}/src/email-templates/${
    type === "REGISTRATION" ? "registration" : "reset-password"
  }-otp.ejs`;

  ejs.renderFile(
    templatePath,
    { recipientName, code },
    (err: any, _html: string) => {
      if (err) {
        throw new Error(err);
      }

      html = _html;
    }
  );

  const options: EmailOptions = {
    senderName: APP_NAME,
    senderEmail: NO_REPLY_EMAIL,
    receiverEmails: [recipientEmail],
    subject,
    html: html,
  };

  await nodemailerEmail(options);
};
