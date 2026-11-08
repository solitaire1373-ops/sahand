import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const previewMode = process.env.BASE44_PREVIEW_MODE === '1';
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // The Base44 preview proxy reaches the dev server through a rotating
    // per-sandbox host name. Outside preview mode Vite keeps its default
    // localhost-only host checking.
    allowedHosts: previewMode && sandboxHostDomain ? [`.${sandboxHostDomain}`] : [],
  },
});
