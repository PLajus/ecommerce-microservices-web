declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      REDIS_PORT: number;
    }
  }
}
export {};
