declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "local" | "dev" | "prod";
      MONGODB_URL: string;
      // ACCESS_TOKEN_SECRET: string;
      // REGION: string;
      // S3_BUCKET: string;
      // ACCESS_KEY_ID: string;
      // SECRET_ACCESS_KEY: string;
      // CRYPTO_SECRET: string;
      // ACCESS_TOKEN_SECRET: string;
      // VERIFY_TOKEN_SECRET: string;
      // WEB_BASE_URL: string;
      // BCRYPT_ROUNDS: number;
      // OTP_SECRET: string;
      // NODEMAILER_USER: string;
      // NODEMAILER_PWD: string;
      // CLOUDINARY_NAME: string;
      // CLOUDINARY_API_KEY: string;
      // CLOUDINARY_API_SECRET: string;
    }
  }
}

export {};
