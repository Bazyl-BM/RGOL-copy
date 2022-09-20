declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: string;
      NEXTAUTH_JWT_SECRET: string;
      NEXTAUTH_SECRET: string;
    }
  }
}
