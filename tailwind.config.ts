import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import leja from './src/brand/tailwind-preset.cjs';

// Alle kleuren, maten en letters komen uit het stijlpakket (src/brand, kopie uit leja-brain).
// Een scherm verwijst naar een rol (bg-surface, text-ink, bg-accent), nooit naar een hex-waarde.
export default {
  presets: [leja],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  plugins: [typography],
} satisfies Config;
