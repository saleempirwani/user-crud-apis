declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "local" | "dev" | "prod";
      MONGODB_URL: string;
    }
  }
}

export {};
