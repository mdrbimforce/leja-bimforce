// Leja stijlpakket: Tailwind-preset (Tailwind 3.4) voor de Astro-sites.
// Leest tokens.json; de kleuren verwijzen naar de custom properties uit tokens.css,
// zodat licht en donker vanzelf meegaan. Laad tokens.css en fonts.css dus ook in.
//
//   // tailwind.config.ts
//   import leja from './src/brand/tailwind-preset.cjs';
//   export default { presets: [leja], content: [...] };
const tokens = require('./tokens.json');

const p = `--${tokens.prefix}-`;
const own = (obj) => Object.entries(obj).filter(([k]) => !k.startsWith('$'));
// Met <alpha-value> werken bg-accent/50 en border-line/40 ook op een custom property.
const themed = (name) => `color-mix(in srgb, var(${p}${name}) calc(<alpha-value> * 100%), transparent)`;
const px = (rem) => `${parseFloat(rem) * 16}`;

const colors = {};
for (const [name] of own(tokens.color)) {
  if (name === 'scrim') colors[name] = `var(${p}scrim)`;
  else colors[name] = themed(name);
}

// Erfenis: de namen die knowledge-bimforce en grids-bimforce nu in hun eigen config hebben.
// Ze blijven werken, zodat een site zijn kopie kan vervangen zonder klassen te herschrijven.
// Nieuw werk gebruikt de rollen hierboven. bf-red is alleen voor het bimforce-logo.
const legacy = {
  'bf-red': { DEFAULT: '#BB0303', dark: '#7A303D', bright: '#FF3333', coral: '#E65F59' },
  navy: '#1c2a41',
  steel: '#475365',
  'steel-blue': '#657082',
  'grey-mid': '#747d8b',
  'grey-light': '#bbbfc6',
  white: '#fdfdfd',
  tan: '#C9B49F',
  beige: '#DECFBA',
  cream: '#F4F6F1',
  'light-blue': '#9BACB3',
  'pale-blue': '#ABC8D8',
  'off-white': '#E7ECEF',
  teal: '#00a8a8',
  'teal-deep': '#0c6980',
  'teal-soft': '#c0f0f7',
  'oa-blue': '#1f628e',
};

const fontSize = {};
for (const [name, value] of own(tokens.text)) {
  // text-lj-14 enzovoort: naast de standaardschaal van Tailwind, die blijft bestaan.
  const key = name === 'site-body' ? 'lj-body' : `lj-${px(value)}`;
  const size = name === 'site-body' ? parseFloat(value) * 16 : Number(px(value));
  fontSize[key] = [value, { lineHeight: size >= 24 ? '1.15' : size >= 20 ? '1.3' : '1.5' }];
}

const split = (stack) => stack.split(',').map((s) => s.trim().replace(/^'|'$/g, ''));

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: { ...tokens.breakpoint },
    extend: {
      colors: { ...legacy, ...colors },
      fontFamily: { sans: split(tokens.font.sans), mono: split(tokens.font.mono) },
      fontSize,
      borderRadius: {
        control: `var(${p}radius-control)`,
        card: `var(${p}radius-card)`,
        pill: `var(${p}radius-pill)`,
      },
      boxShadow: { 1: `var(${p}shadow-1)`, 2: `var(${p}shadow-2)` },
      zIndex: Object.fromEntries(own(tokens.layer).map(([k, v]) => [k, String(v)])),
      transitionDuration: { fast: tokens.motion.fast, base: tokens.motion.base },
      transitionTimingFunction: { lj: tokens.motion.ease },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': `var(${p}ink)`,
            '--tw-prose-headings': `var(${p}ink)`,
            '--tw-prose-bold': `var(${p}ink)`,
            '--tw-prose-links': `var(${p}accent)`,
            '--tw-prose-code': `var(${p}accent)`,
            '--tw-prose-quotes': `var(${p}ink-2)`,
            '--tw-prose-captions': `var(${p}ink-3)`,
            '--tw-prose-counters': `var(${p}ink-3)`,
            '--tw-prose-bullets': `var(${p}ink-3)`,
            '--tw-prose-hr': `var(${p}line)`,
            '--tw-prose-th-borders': `var(${p}line)`,
            '--tw-prose-td-borders': `var(${p}line)`,
            a: {
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': { color: `var(${p}accent-hover)` },
            },
            strong: { fontWeight: '700' },
            code: {
              backgroundColor: `var(${p}accent-soft)`,
              padding: '0.1em 0.35em',
              borderRadius: '0.25em',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
};
