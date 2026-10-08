# leja-bimforce

Bron van **leja.bimforce.com**, de productsite van Leja, de AI-kennispartner van bimforce. Eerste versie op 8 oktober 2026: alleen de homepagina (quest-143 step-03, quest-144 sessie 8). De overige pagina's (Geheugen, Regie, Eigendom, Het dashboard, Hoe het werkt, In de praktijk, Over, Contact) volgen in quest-143 step-04.

Stack: Astro 5, Tailwind 3.4 met het Leja-stijlpakket, Cloudflare Pages. Zelfde patroon als grids.bimforce.com en knowledge.bimforce.com.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## Stijl

`src/brand/` is een **kopie** van `brand/` uit `mdrbimforce/leja-brain` (tokens, lettertypes, iconen, beeldmerk, Tailwind-preset), met een stempel in `src/brand/.leja-brand.json`. Wijzig het pakket in leja-brain en draai daar:

```bash
node brand/scripts/sync-to-site.mjs ../leja-bimforce          # kopieert naar src/brand
node brand/scripts/sync-to-site.mjs ../leja-bimforce --check  # faalt als de kopie afwijkt
```

Regels uit `brand/README.md`: een scherm verwijst naar een rol (`bg-surface`, `text-ink`, `bg-accent`), nooit naar een hex-waarde; licht en donker volgen het apparaat (`data-theme` op `<html>` wint); vakjargon blijft staan (graph, knowledge graph, dashboard, route); teksten voor publiek gaan door `tools/leja-brand/enforce_voice.py`.

## Kerncijfers

`data/cijfers.json` bevat de aantallen uit de Leja-graph van bimforce (sessies, geheugenfragmenten, beslissingen, inzichten, fouten, kennisartikelen, protocollen, routes, datum van de laatste vrijdagronde). Alleen aantallen, nooit inhoud; er loopt geen pad van internet naar de graph. Het bestand wordt geschreven door `tools/site/cijfers.mjs` in leja-brain, via een dagelijkse timer op Hermes die het bestand in deze repo commit. Elke commit op `main` zet een nieuwe build op Pages, dus de site leest het bestand tijdens de build.

## Publicatie

Cloudflare Pages-project `leja-bimforce`, production branch `main`, build `npm run build`, output `dist`. Custom domain `leja.bimforce.com`; de DNS staat bij Wix (CNAME naar `leja-bimforce.pages.dev`). Het dashboard verhuist eerst naar `dashboard.bimforce.com` (runbook in leja-brain: `documents/deployment/2026-10-08-dashboard-naar-dashboard-bimforce-com.md`); pas daarna gaat `leja.bimforce.com` naar deze site.

## Inhoud

Tekst en opbouw volgen leja-brain `documents/marketing/2026-09-30-leja-positionering-voorstel.md`: de muur in één beeld, de draagzin "Huur het model, bezit de kennis", de drie pijlers (Geheugen, Regie, Eigendom), de bewijscijfers, één alinea die GRiDS plaatst, en een oproep tot een gesprek. Geen klantnamen, mailadressen of projectnummers van derden.
