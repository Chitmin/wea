declare namespace NodeJS {
  interface ProcessEnv {
    APP_URL: string;
    REDIS_PORT: number;
    REDIS_HOST: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_DB: number;
  }
}
