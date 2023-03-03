declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_CONNECTION: string;
      DB_USER: string;
      DB_PASS: string;
    }
  }
}
export {};
