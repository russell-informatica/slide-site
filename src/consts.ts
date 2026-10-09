import { withBase } from './utils/base';

export const SITE_NAME = 'Slide Site';
export const SITE_DESCRIPTION = 'Slide e materiali per le nostre classi e i nostri progetti.';

/** A top-bar section, one per class/project. */
export interface Section {
  /** URL segment, e.g. "esempio" -> /esempio (with the deployment base). */
  slug: string;
  /** Label shown in the navigation bar. */
  label: string;
}

/**
 * Sections shown in the top bar. Add an entry here and create the matching
 * page in `src/pages/<slug>.astro` (see `esempio.astro`).
 */
export const SECTIONS: Section[] = [
  { slug: 'prime', label: 'Prime' },
  { slug: 'seconde', label: 'Seconde' },
];

/** Navigation links shared by every page. */
export const navLinks = [
  { href: withBase('/'), label: 'Home' },
  ...SECTIONS.map((section) => ({
    href: withBase(`/${section.slug}`),
    label: section.label,
  })),
];
