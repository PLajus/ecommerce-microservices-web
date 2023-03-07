declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      CONTACT_POINT: string;
      KEYSPACE: string;
      LOCALDATACENTER: string;
    }
  }
}
export {};
