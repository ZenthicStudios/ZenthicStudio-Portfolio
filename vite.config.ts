import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import handler from "./api/roblox-stats.ts";
import { site } from "./src/data/site.ts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-metadata",
      transformIndexHtml(html) {
        const escape = (value: string) =>
          value
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;");
        const host =
          process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
        const origin = host ? `https://${host}` : "";
        return html
          .replaceAll("__SITE_TITLE__", escape(site.title))
          .replaceAll("__SITE_DESCRIPTION__", escape(site.description))
          .replaceAll("__SOCIAL_DESCRIPTION__", escape(site.socialDescription))
          .replaceAll("__SOCIAL_IMAGE__", escape(origin + site.socialImage))
          .replace(
            "__CANONICAL__",
            origin
              ? `<link rel="canonical" href="${escape(origin)}/" /><meta property="og:url" content="${escape(origin)}/" />`
              : "",
          );
      },
    },
    {
      name: "local-roblox-api",
      configureServer(server) {
        server.middlewares.use("/api/roblox-stats", (req, res) => {
          void handler(req, res);
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use("/api/roblox-stats", (req, res) => {
          void handler(req, res);
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
