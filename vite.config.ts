import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: rewrite static case-study roots (e.g. /onix, /onix/) to their
// static page, matching how production/`vite preview` serve
// public/<name>/index.html.
function staticCaseStudyPages(names: string[]) {
  return {
    name: 'static-case-study-pages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const path = url.split('?')[0];
        for (const name of names) {
          if (path === `/${name}` || path === `/${name}/`) {
            req.url = `/${name}/index.html`;
            break;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), staticCaseStudyPages(['onix', 'soluna'])],
  server: { port: 5174 },
});
