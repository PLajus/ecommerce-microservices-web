declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_TABLE: string;
      DB_USER: string;
      DB_PASS: string;
      DB_HOST: string;
    }
  }
}
export {};
