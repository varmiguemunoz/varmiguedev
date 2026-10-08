export type HslColor = { h: number; s: number; l: number };

function parseCssHslVariable(raw: string): HslColor | null {
  // Expecting values like: "270 100% 65%"
  if (!raw) return null;
  const cleaned = raw.trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length < 3) return null;
  const [hStr, sStr, lStr] = parts;
  const h = Number(hStr);
  const s = Number((sStr || '').replace('%', ''));
  const l = Number((lStr || '').replace('%', ''));
  if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(l)) return null;
  return { h, s, l };
}

export function hslToHex(hsl: HslColor): string {
  // Convert HSL (degrees, %, %) to HEX string
  const h = (hsl.h % 360) / 360;
  const s = Math.max(0, Math.min(1, hsl.s / 100));
  const l = Math.max(0, Math.min(1, hsl.l / 100));

  if (s === 0) {
    const gray = Math.round(l * 255);
    const hex = gray.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const toRgb = (t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const r = Math.round(toRgb(h + 1 / 3) * 255);
  const g = Math.round(toRgb(h) * 255);
  const b = Math.round(toRgb(h - 1 / 3) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function useThemeHsl(
  variableName: '--primary' | '--accent' | '--primary-glow' | '--accent-glow'
): HslColor | null {
  if (typeof window === 'undefined') return null;
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue(variableName);
  return parseCssHslVariable(raw);
}

export function useThemeHex(
  variableName: '--primary' | '--accent' | '--primary-glow' | '--accent-glow'
): string | null {
  const hsl = useThemeHsl(variableName);
  return hsl ? hslToHex(hsl) : null;
}
