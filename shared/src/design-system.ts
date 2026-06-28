/**
 * Lingo Design System
 * ─────────────────────────────────────────────────────────────────────
 *
 * TYPOGRAPHY RATIONALE
 * ──────────────────────────────
 * Display font: "Space Grotesk" (weights 400–700)
 *   Slightly condensed geometric grotesque. Has real personality at large
 *   sizes — the mixed-aperture letterforms make headings feel considered,
 *   not off-the-shelf. Technical enough for a utility app, warm enough
 *   to feel human.
 *
 * Body font: "Sora" (weights 400–600)
 *   Humanist sans with rounded terminals. Reads comfortably at 14–16px.
 *   Complements Space Grotesk without competing — where SG is structured,
 *   Sora is approachable. Banned: Inter (overused), Roboto (too neutral).
 *
 * COLOUR RATIONALE
 * ──────────────────────────────
 * Accent: #C1440E — burnt terracotta/sienna.
 *   Translator apps default to blue (trust) or teal (global). We chose
 *   warm earth instead: the colour of fired clay and printed ink. Reads
 *   as confident without being aggressive. Works on both light and dark.
 *
 * Background: #F5F0EB — warm linen off-white.
 *   Pure white feels clinical. This has warmth without being yellow.
 *
 * Text: #1A1614 — near-black with warm undertone.
 *   Slightly warmer than #111111 — consistent with the overall palette temperature.
 */

// ─── Color Tokens ─────────────────────────────────────────────────────────────

export const lightColors = {
  accent: {
    DEFAULT: '#C1440E',
    hover: '#A3380B',
    muted: '#E8B49A',
    subtle: '#FDF1EC',
  },
  background: {
    DEFAULT: '#F5F0EB',
    surface: '#EDEAE5',
    elevated: '#E6E1DB',
    inverse: '#1A1614',
  },
  text: {
    primary: '#1A1614',
    secondary: '#6B5E58',
    tertiary: '#9E9189',
    inverse: '#F5F0EB',
    accent: '#C1440E',
  },
  border: {
    DEFAULT: '#D9D3CC',
    strong: '#B5ADA5',
    subtle: '#E9E5DF',
  },
  semantic: {
    error: '#D93025',
    errorSubtle: '#FDF1F0',
    success: '#1E7E4A',
    successSubtle: '#EDF7F1',
    warning: '#C47C0A',
    warningSubtle: '#FEF8EC',
  },
  always: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;

export const darkColors = {
  accent: {
    DEFAULT: '#C1440E', // Keep terracotta accent
    hover: '#D65A20',
    muted: '#632A11',
    subtle: '#2E150B',
  },
  background: {
    DEFAULT: '#1A1614',
    surface: '#2D2825',
    elevated: '#3B3430',
    inverse: '#F5F0EB',
  },
  text: {
    primary: '#F5F0EB',
    secondary: '#B5ADA5',
    tertiary: '#857870',
    inverse: '#1A1614',
    accent: '#D65A20',
  },
  border: {
    DEFAULT: '#4A413C',
    strong: '#6B5E58',
    subtle: '#332D29',
  },
  semantic: {
    error: '#EF4444', // Brighter red for dark mode
    errorSubtle: '#3B1818',
    success: '#22C55E', // Brighter green for dark mode
    successSubtle: '#12301D',
    warning: '#F59E0B',
    warningSubtle: '#3B2A10',
  },
  always: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;

export const THEME_COLORS = {
  light: lightColors,
  dark: darkColors,
} as const;

// For backwards compatibility where `colors` is directly imported in mobile
export const colors = lightColors;

// ─── Typography Scale ─────────────────────────────────────────────────────────

export const typography = {
  fonts: {
    display: '"Space Grotesk", system-ui, sans-serif',
    body: '"Sora", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Font weights
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Type scale (rem) — fluid but not CSS clamp: just named sizes
  size: {
    '2xs': '0.625rem',   // 10px
    xs:   '0.75rem',     // 12px
    sm:   '0.875rem',    // 14px
    base: '1rem',        // 16px
    lg:   '1.125rem',    // 18px
    xl:   '1.25rem',     // 20px
    '2xl':'1.5rem',      // 24px
    '3xl':'1.875rem',    // 30px
    '4xl':'2.25rem',     // 36px
    '5xl':'3rem',        // 48px
    '6xl':'3.75rem',     // 60px
  },

  // Line heights
  leading: {
    none:    '1',
    tight:   '1.2',
    snug:    '1.35',
    normal:  '1.5',
    relaxed: '1.65',
    loose:   '2',
  },

  // Letter spacing
  tracking: {
    tighter: '-0.04em',
    tight:   '-0.02em',
    normal:  '0em',
    wide:    '0.02em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
} as const;

// ─── Spacing Scale ────────────────────────────────────────────────────────────

export const spacing = {
  px:  '1px',
  0:   '0px',
  0.5: '0.125rem',  // 2px
  1:   '0.25rem',   // 4px
  1.5: '0.375rem',  // 6px
  2:   '0.5rem',    // 8px
  2.5: '0.625rem',  // 10px
  3:   '0.75rem',   // 12px
  3.5: '0.875rem',  // 14px
  4:   '1rem',      // 16px
  5:   '1.25rem',   // 20px
  6:   '1.5rem',    // 24px
  7:   '1.75rem',   // 28px
  8:   '2rem',      // 32px
  10:  '2.5rem',    // 40px
  12:  '3rem',      // 48px
  14:  '3.5rem',    // 56px
  16:  '4rem',      // 64px
  20:  '5rem',      // 80px
  24:  '6rem',      // 96px
  32:  '8rem',      // 128px
  40:  '10rem',     // 160px
  48:  '12rem',     // 192px
  56:  '14rem',     // 224px
  64:  '16rem',     // 256px
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const radius = {
  none: '0px',
  sm:   '4px',
  DEFAULT: '8px',
  md:   '10px',
  lg:   '14px',
  xl:   '20px',
  '2xl':'28px',
  full: '9999px',
} as const;

// ─── Motion ───────────────────────────────────────────────────────────────────
//
// Philosophy: fast, purposeful, no decoration.
// 150ms for micro-interactions (buttons, toggles).
// 200ms for layout transitions (panels, sheets, routes).
// No bouncy easings. No spring physics. No scale-on-click.

export const motion = {
  duration: {
    instant: '100ms',
    fast:    '150ms',      // buttons, focus rings, toggles
    base:    '200ms',      // panels, modals, route transitions
    slow:    '300ms',      // only for full-screen transitions
  },
  easing: {
    out:    'cubic-bezier(0, 0, 0.2, 1)',   // entrances
    in:     'cubic-bezier(0.4, 0, 1, 1)',   // exits
    inOut:  'cubic-bezier(0.4, 0, 0.2, 1)', // positional changes
    linear: 'linear',
  },
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const shadows = {
  sm:  '0 1px 2px 0 rgba(26, 22, 20, 0.06)',
  DEFAULT: '0 2px 6px 0 rgba(26, 22, 20, 0.08)',
  md:  '0 4px 12px 0 rgba(26, 22, 20, 0.10)',
  lg:  '0 8px 24px 0 rgba(26, 22, 20, 0.12)',
  xl:  '0 16px 48px 0 rgba(26, 22, 20, 0.14)',
} as const;

// ─── Z-Index ──────────────────────────────────────────────────────────────────

export const zIndex = {
  below:   '-1',
  base:    '0',
  raised:  '10',
  overlay: '20',
  modal:   '30',
  toast:   '40',
  tooltip: '50',
} as const;
