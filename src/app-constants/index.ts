import { OtpExpiry } from "../types";

export const ALLOWED_IMG_TYPE = ["image/jpeg", "image/jpg", "image/png"];
export const BYTE_1_MB = 1000000;

export const APP_NAME = "Zella";
export const NO_REPLY_EMAIL = "msr.pirwani.dev@gmail.com";

export const OTP_EXPIRY: OtpExpiry = { amount: 5, unit: "minutes" };
export const ACCESS_TOKEN_EXPIRY: string | number = "7d";

export const COORDINATES = [8.6753, 9.082];
