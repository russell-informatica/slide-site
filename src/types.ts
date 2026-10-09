/** A single label/value pair shown as metadata on a slide card. */
export interface SlideMeta {
  label: string;
  value: string;
}

/**
 * Data for one slide deck card. A section page holds an array of these and
 * renders one `SlideCard` per entry.
 */
export interface Slide {
  /** Card title, e.g. the lesson or deck name. */
  title: string;
  /** External URL of the slide deck. */
  href: string;
  /** Optional short description. */
  description?: string;
  /** Optional display date, e.g. "2026-09-15". */
  date?: string;
  /** Optional tags rendered as small chips. */
  tags?: string[];
  /** Optional extra metadata rendered as a definition list. */
  meta?: SlideMeta[];
}
