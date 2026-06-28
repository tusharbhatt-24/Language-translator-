# Lingo — Design Decisions

This document explains why the app looks the way it does. It's written for a human to read and push back on — not marketing copy.

---

## Typography

**Headings: Space Grotesk**
A geometric grotesque with mixed apertures (look at the lowercase `a` and `e`). It's slightly condensed which makes it feel efficient, not sprawling. At large sizes it has real personality. At small sizes it's still crisp.

Why not Inter? It's everywhere. Why not Neue Haas Grotesk? Too expensive to license. Space Grotesk is freely available and genuinely distinctive.

**Body: Sora**
Humanist sans with slightly rounded terminals. Reads comfortably at 14–16px without getting clinical. It's warm where Space Grotesk is structured — they complement without competing.

Why not Manrope? Fine, but a bit bland. Why not DM Sans? Too similar to Inter in feel.

---

## Colour

**Accent: `#C1440E` (burnt terracotta)**

Every translator app uses blue (because "trust") or teal (because "global"). We chose warm earth instead. The colour of fired clay, old books, and Indian architecture. It reads as confident and distinct without being aggressive or playful.

It works at full saturation on buttons. It works as a light tint (`#FDF1EC`) for hover states. It darkens gracefully to `#A3380B` on interaction.

**Background: `#F5F0EB` (warm linen)**

Not pure white. Pure white is clinical. This has warmth that matches the accent temperature — you can put terracotta on it and it feels intentional, not accidental.

**Text: `#1A1614` (near-black, warm)**

Slightly warmer than `#111111`. If you use a neutral near-black on a warm background, it floats slightly. This doesn't.

---

## Layout

**Asymmetric, content-led.**

Nothing is centred just because it can be. The header is left-aligned. Actions are right-justified or inline with their content. The translation canvas is as close to full-width as possible — the UI is furniture, the text is the product.

No hero sections. No gradient blobs. No decorative shapes.

---

## Icons

`lucide-react` (web) and `lucide-react-native` (mobile). Stroke-based, consistent weight, sensible defaults. Never emoji as functional UI icons.

---

## Motion

- **150ms** for interactions: buttons, toggles, focus rings.
- **200ms** for panel transitions: modals, drawers, route changes.
- Easing: `ease-out` for entrances (fast start, gradual stop feels responsive), `ease-in` for exits.
- No bounce. No scale-on-click. No spring physics. Animation should feel like it's getting out of the way.

---

## Copy voice

Short. Plain. Like a person wrote it.

| ❌ Don't say | ✓ Say instead |
|---|---|
| "Effortlessly translate your text in real-time with AI!" | "Type to translate" |
| "Choose your target language to get started" | "Translate to" |
| "Your translation history is stored securely on-device" | "Saved locally" |
| "No results found at this time" | "Nothing here yet" |

Labels are lowercase where possible (`translate`, `history`, `settings`). Sentence case for longer copy. Never title case for UI strings.
