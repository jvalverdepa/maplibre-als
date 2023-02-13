interface ImportMetaEnv {
  STORYBOOK_IDENTITY_POOL_ID: string;
  STORYBOOK_REGION: string;
  STORYBOOK_MAP_NAME: string;
  STORYBOOK_MAP_STYLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
