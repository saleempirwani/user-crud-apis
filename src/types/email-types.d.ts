import { OtpType } from "./UserModelTypes";

export interface EmailOptions {
  senderName: string;
  senderEmail: string;
  receiverEmails: string[];
  subject: string;
  html: string;
}

export interface OtpEmail {
  recipientEmail: string;
  recipientName: string;
  code: string;
  type: OtpType;
}
