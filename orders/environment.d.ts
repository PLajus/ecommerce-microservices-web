declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB: string;
      DB_USER: string;
    }
  }
}
export {};
