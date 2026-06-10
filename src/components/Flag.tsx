// Renders a country flag as a real SVG image instead of a flag emoji.
//
// Why: a flag emoji (e.g. "🇬🇪") is two Unicode Regional Indicator Symbols.
// Apple/Google platforms render them as flags, but Windows ships no
// flag-emoji glyphs, so Chrome/Edge/Firefox on Windows show nothing (or the
// bare letters "GE"). We decode the emoji back to its ISO 3166-1 alpha-2 code
// and load a bundled SVG from public/flags/<code>.svg, which renders
// identically on every platform and offline (no external CDN call).
//
// The SVGs in public/flags/ are the public-domain set from lipis/flag-icons.

const BASE = import.meta.env.BASE_URL;

/**
 * Decode a flag emoji to a lowercase ISO 3166-1 alpha-2 code.
 * "🇬🇪" -> "ge". Returns null for anything that isn't exactly two Regional
 * Indicator Symbols (e.g. the white flag "🏳️" or plain text).
 */
export function emojiToA2(emoji: string | undefined | null): string | null {
  if (!emoji) return null;
  const indicators = Array.from(emoji)
    .map((ch) => ch.codePointAt(0) ?? 0)
    .filter((cp) => cp >= 0x1f1e6 && cp <= 0x1f1ff);
  if (indicators.length !== 2) return null;
  return indicators
    .map((cp) => String.fromCharCode(cp - 0x1f1e6 + 65))
    .join("")
    .toLowerCase();
}

export function Flag({
  emoji,
  title,
  sizeEm = 1,
  className = "",
}: {
  /** The flag emoji string carried in the data (e.g. country.flag_emoji). */
  emoji?: string;
  /** Country name, used for the image alt text. */
  title?: string;
  /**
   * Flag height in em (width is derived at the 4:3 ratio). Defaults to 1em so
   * the flag scales with the surrounding text; pass a smaller value next to
   * very large display headlines where a full-height flag would dominate.
   */
  sizeEm?: number;
  /** Extra classes (border radius, margins, etc.). */
  className?: string;
}) {
  const a2 = emojiToA2(emoji);

  // Non-country flag (e.g. 🏳️) or undecodable: fall back to the raw glyph.
  if (!a2) {
    return emoji ? <span className={className}>{emoji}</span> : null;
  }

  return (
    <img
      src={`${BASE}flags/${a2}.svg`}
      alt={title ? `${title} flag` : `${a2.toUpperCase()} flag`}
      width={16}
      height={12}
      loading="lazy"
      style={{ height: `${sizeEm}em`, width: `${(sizeEm * 4) / 3}em` }}
      className={`inline-block shrink-0 rounded-[2px] object-cover align-[-0.15em] ring-1 ring-black/10 ${className}`}
    />
  );
}
