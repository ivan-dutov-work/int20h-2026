interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string;
  readonly BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
