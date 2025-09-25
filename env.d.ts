declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_PORT: number;
    REDIS_HOST: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_DB: number;
  }
}
