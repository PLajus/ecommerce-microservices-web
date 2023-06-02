declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      CONTACT_POINT: string;
    }
  }
}
export {};
