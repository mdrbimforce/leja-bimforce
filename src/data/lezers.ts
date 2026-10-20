// De vier lezers van de site (besluit Martijn, 20 oktober 2026): het verhaal wordt per lezer
// verteld. Gedeeld door de navigatie, het blok op de homepagina en de onderkant van elke lezerspagina.
export type LezerId = 'it' | 'managers' | 'gebruikers' | 'techneuten';

export interface Lezer {
  id: LezerId;
  href: string;
  label: string;
  zin: string;
}

export const lezers: Lezer[] = [
  {
    id: 'it',
    href: '/voor-it/',
    label: 'Voor IT',
    zin: 'Zekerheid over wat er in een model gaat, door wie, wanneer, en wat ermee mag.',
  },
  {
    id: 'managers',
    href: '/voor-managers/',
    label: 'Voor managers',
    zin: 'Inzicht in de kennis die het bedrijf ontwikkelt: wie besliste wat, wanneer, en op basis waarvan.',
  },
  {
    id: 'gebruikers',
    href: '/voor-gebruikers/',
    label: 'Voor gebruikers',
    zin: 'Verder waar je gebleven was, met de afspraken en de vakkennis van het bedrijf erbij.',
  },
  {
    id: 'techneuten',
    href: '/voor-techneuten/',
    label: 'Voor techneuten',
    zin: 'De opbouw op hoofdlijnen: één graph als bron, één poort naar modellen, routes onder regie.',
  },
];
