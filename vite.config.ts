import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: rewrite /onix and /onix/ to the static onix page, matching
// how production/`vite preview` serve public/onix/index.html.
function onixStaticPage() {
  return {
    name: 'onix-static-page',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const path = url.split('?')[0];
        if (path === '/onix' || path === '/onix/') {
          req.url = '/onix/index.html';
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), onixStaticPage()],
  server: { port: 5174 },
});
