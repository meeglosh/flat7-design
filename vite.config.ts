import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: serve static case-study roots the way production does.
// `/<name>/` rewrites to public/<name>/index.html. `/<name>` (no trailing
// slash) REDIRECTS to `/<name>/` rather than rewriting: the pages load
// `scrollcraft.css` and `scrollcraft.js` by relative path, so served at
// `/<name>` those resolve to the site root, where the SPA fallback answers
// with HTML and the page renders unstyled. GitHub Pages already redirects
// to the slash form; this makes dev match it.
function staticCaseStudyPages(names: string[]) {
  return {
    name: 'static-case-study-pages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        const [path, query] = url.split('?');
        for (const name of names) {
          if (path === `/${name}`) {
            res.statusCode = 302;
            res.setHeader('Location', `/${name}/${query ? '?' + query : ''}`);
            res.end();
            return;
          }
          if (path === `/${name}/`) {
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
  plugins: [react(), staticCaseStudyPages(['onix', 'soluna', 'decathlon', 'wingman', 'renorun'])],
  server: { port: 5174 },
});
