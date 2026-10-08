import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// leja.bimforce.com — productsite van Leja (2026-10-08, quest-143 step-03 / quest-144 sessie 8).
// Zelfde stack als grids.bimforce.com en knowledge.bimforce.com: Astro 5 + Tailwind + Cloudflare Pages.
// De stijl komt uit het Leja-stijlpakket (leja-brain, map brand/), gekopieerd naar src/brand
// met `node brand/scripts/sync-to-site.mjs <pad naar deze repo>`.
export default defineConfig({
  site: 'https://leja.bimforce.com',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
