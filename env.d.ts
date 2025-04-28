/// <reference types="vite/client" />
/// <reference types="@remix-run/node" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
    readonly VITE_SESSION_SECRET: string
    readonly VITE_SMTP_USERNAME: string
    readonly VITE_SMTP_PASSWORD: string
    readonly VITE_SENTRY_DSN: string
}
