// src/env.d.ts
declare module '*.env' {
  const env: {
    VITE_API_URL: string
  }
  export default env
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
/// <reference types="vite/client" />
