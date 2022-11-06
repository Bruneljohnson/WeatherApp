/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: "development" | "production" | "test";
    REACT_APP_API_KEY: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_ONECALL_URL: string;
  }
}

interface Window {
  Stripe: any;
}
