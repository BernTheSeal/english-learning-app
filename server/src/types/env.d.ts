declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    MONGO_URI: string;
    CLIENT_URL: string;
    PORT?: string;
    JWT_SECRET: string;
    MAILTRAP_TOKEN;
  }
}
