---
name: varmiguemunoz
description: Personal site of Miguel Angel Muñoz, AI Integration Engineer. Calm night craft over clean steel paper.
colors:
  night-ink: "#0D212B"
  deep-ink: "#172F3B"
  ink-rule: "#24404C"
  campfire-night: "#0E2028"
  steel-paper: "#F0F3F4"
  quiet-paper: "#E2E7E9"
  hairline-steel: "#D3DBDE"
  card-white: "#FFFFFF"
  slate-text: "#3A535F"
  mist: "#8CA6B1"
  ember-amber: "#F2A93B"
  banked-ember: "#E0951F"
  flare-amber: "#FFBD57"
  focus-teal: "#108CC6"
  live-green: "#1FB57A"
  warning-coral: "#FF8A7A"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title-lg:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  24: "96px"
  32: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ember-amber}"
    textColor: "{colors.night-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.banked-ember}"
  button-hero:
    backgroundColor: "{colors.ember-amber}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    height: "48px"
  button-hero-hover:
    backgroundColor: "{colors.flare-amber}"
  button-ink:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.steel-paper}"
    rounded: "{rounded.xl}"
    padding: "12px 20px"
  button-ink-hover:
    backgroundColor: "{colors.deep-ink}"
  chip:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.slate-text}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  input-on-ink:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.steel-paper}"
    rounded: "{rounded.xl}"
    padding: "14px 16px"
  nav-island:
    backgroundColor: "{colors.steel-paper}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.full}"
    height: "64px"
---

# Design System: varmiguemunoz

## Overview

**Creative North Star: "The Night Shift"**

The site is the calm hour when the systems keep running and one person is quietly tending them. It opens at night: a looping illustrated film of a small orange machine at a campfire, deep teal navy sky, warm string lights. Then the visitor steps into clean steel paper, where the work is laid out plainly to be read and checked. The night is where the systems run; the paper is where the proof is read.

Restraint is the whole method. One warm color, the ember amber, marks the action a visitor should take, the way a fire marks the camp. Everything else is ink on paper or paper on ink. Depth comes from soft ink tinted shadows, never from glow, glass or gradients. Motion is heavy and settled: it arrives, it rests, it does not loop for attention (the hero film is the single exception, and it can be paused).

The system is quiet so that the numbers and the real systems are what people remember. If a choice makes the page feel louder, more futuristic or more like a game, it is the wrong choice.

**Key Characteristics:**
- Two grounds only: steel paper for reading, night ink for where systems run (hero, contact, code).
- One warm action color, ember amber, used sparingly.
- One typeface, Geist, set tight and semibold for display; Geist Mono only for code and figures.
- Flat surfaces lifted by soft, downward, ink tinted shadows.
- Heavy, settled motion on a single fluid curve.

## Colors

A teal night palette taken from the hero film: ink and grays share the film's sky hue (about 200 degrees), with a single ember of warmth.

### Primary
- **Ember Amber** (#F2A93B): the one action color. Primary buttons, the hero call to action, text selection, and small marks that guide the eye (list markers, the testimonial quote mark, the underline on hovered or current links). Never a background for a section.
- **Banked Ember** (#E0951F): hover state of the primary button on paper, ordered list markers in articles.
- **Flare Amber** (#FFBD57): hover state of the hero call to action on the night ground, where Banked Ember would go muddy.

### Secondary
- **Night Ink** (#0D212B): headings and primary text on paper, the ink panels (contact section, code blocks, ink buttons), every shadow tint.
- **Deep Ink** (#172F3B): hover state of ink buttons and dark surfaces, body text inside articles.
- **Ink Rule** (#24404C): borders and dividers on ink surfaces, input outlines on the contact panel.
- **Campfire Night** (#0E2028): the hero ground and the readability scrim over the film. Sampled from the film's sky so the copy sits inside the scene rather than on top of it.

### Tertiary
- **Focus Teal** (#108CC6): keyboard focus rings and focused input borders only. A brighter step of the night sky; it exists to be found, not to decorate.
- **Live Green** (#1FB57A): availability dot and success states.
- **Warning Coral** (#FF8A7A): form errors and invalid input borders on the ink contact panel.

### Neutral
- **Steel Paper** (#F0F3F4): the page ground everywhere outside the hero and ink panels.
- **Quiet Paper** (#E2E7E9): inline code, quiet fills, image wells.
- **Card White** (#FFFFFF): cards, chips and the testimonial and case surfaces that sit on Steel Paper.
- **Hairline Steel** (#D3DBDE): default border and divider color on paper.
- **Slate Text** (#3A535F): secondary text, leads, metadata, nav links at rest.
- **Mist** (#8CA6B1): placeholders and tertiary text on ink.

### Named Rules
**The One Ember Rule.** Ember Amber marks the next action and nothing else. If two amber elements compete in one viewport, one of them is wrong.

**The Two Grounds Rule.** A section sits on Steel Paper or on ink (Night Ink or Campfire Night). There is no third ground, no tinted section bands, no background gradients.

**The Film Hue Rule.** Every neutral (ink, slate, mist, paper, lines) sits on the hero film's teal navy hue, around 200 degrees. A neutral that leans blue, purple or warm gray breaks the link between the hero and the page.

**The Token Only Rule.** Every color comes from the `--ops-*` custom properties in `src/styles/global.css`, through the `ops-*` Tailwind classes or `rgb(var(--ops-*) / alpha)`. A hex value inside a component is a bug. The only exceptions are browser meta tags and email templates, which cannot read CSS variables.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo), for code and tabular figures only

**Character:** One engineered grotesk carries everything, so hierarchy comes from size, weight and tracking rather than from a second voice. Tight, semibold display type reads confident and quiet at the same time.

### Hierarchy
- **Display** (600, 72px desktop down to 36px on phones, line height 1, -0.03em): the hero headline only, set in three meaningful lines on wide screens.
- **Headline** (600, clamp(2.25rem, 4.4vw, 3.5rem), 1.02, -0.03em): section headings (`ops-h2`), balanced.
- **Title large** (600, 30px, 1.2, -0.02em): case titles and the case selector statement from 768px up.
- **Title** (600, 24px, 1.25, -0.02em): card titles, article subheads, case titles on phones.
- **Lead** (400, 20px, 1.4): the hero description and section leads on wide screens.
- **Body** (400, 18px, 1.625): article text and leads, capped near 60 to 70 characters per line.
- **Body small** (400, 16px, 1.5): dense UI copy, metrics, button text.
- **Label** (500, 14px): nav links, metadata, compact buttons (600).
- **Caption** (500, 12px): chips, attributions, stack lists.

Every size snaps to the Tailwind type scale (12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96px). No arbitrary sizes like 15px or 1.75rem; if a size falls between steps, take the step below.

### Named Rules
**The Single Face Rule.** Geist is the only typeface. No italics anywhere, no weight above 700, display never above 96px, tracking never tighter than -0.03em.

## Layout

A single centered column with a 1200px max width and 24px side padding, 40px from 768px up (`ops-container`). Sections breathe on a 96px rhythm, 128px from 768px up (`ops-section`). Grids split asymmetrically (roughly 1.3 to 0.7) rather than into equal halves. Spacing follows the Tailwind 4px scale; more space above a heading than below it.

The hero is the exception: full bleed, at least one viewport tall on desktop, with the copy in the left 680px and the film's subject kept clear on the right. On phones the hero stacks: copy on Campfire Night, then a square crop of the film, then the metrics strip.

Breakpoints are Tailwind's defaults (640, 768, 1024, 1280px).

## Elevation & Depth

Surfaces are flat and separated by ground (paper vs ink) and by hairline borders. Where a surface needs to lift, it uses a soft shadow that falls downward with a strong negative spread, always tinted with Night Ink so it reads as shade rather than as a glow.

### Shadow Vocabulary
- **Rest lift** (`box-shadow: 0 20px 48px -32px rgb(13 33 43 / 0.45)`): cards and case figures resting on paper.
- **Raised panel** (`box-shadow: 0 24px 48px -24px rgb(13 33 43 / 0.6)`): expanded rows, code blocks, the portrait.
- **Button lift** (`box-shadow: 0 12px 28px -14px rgb(13 33 43 / 0.45)`): primary buttons on paper; deepens to 0.55 on hover.
- **Ember lift** (`box-shadow: 0 16px 32px -16px rgb(242 169 59 / 0.55)`): the hero call to action on the night ground, the only warm shadow.

### Named Rules
**The Ink Shadow Rule.** Shadows are always Night Ink tinted, always offset downward, never black, never zero offset halos.

**The No Glass Rule.** No backdrop blur slabs, no translucent panels. The nav island is opaque paper.

## Shapes

Gently rounded, never soft. Inline code and focus rings use 8px; buttons, inputs and figures 12px; cards, code blocks, article images and large panels 16px; chips, the nav island, the hero call to action, icon buttons and scrollbar thumbs are full pills. Nothing else. Borders are 1px hairlines, all the way around or not at all.

## Components

### Buttons
- **Shape:** gently rounded (12px); the hero call to action and nav button are pills (9999px).
- **Primary:** Ember Amber with Night Ink text, 16px by 24px padding, 16px semibold, Button lift shadow. Hover moves to Banked Ember and deepens the shadow.
- **Hero call to action:** Ember Amber pill, 48px tall, Ember lift; hover moves to Flare Amber; press scales to 0.98; the arrow nudges 3px.
- **Ink:** Night Ink with Steel Paper text, 12px by 20px, 14px semibold; hover Deep Ink.
- **Link:** semibold Night Ink with a 1px underline at 30% ink, turning Ember Amber on hover.

### Chips
- **Style:** Card White pill with a Hairline Steel border, 12px medium Slate Text, 4px by 12px.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Card White on Steel Paper.
- **Shadow Strategy:** Rest lift.
- **Border:** none.
- **Internal Padding:** 32px.

### Inputs / Fields
- **Style:** on the ink contact panel: Night Ink fill, 1px Ink Rule border, 12px corners, 14px by 16px padding, Steel Paper text, Mist placeholder.
- **Focus:** border turns Focus Teal.
- **Error / Disabled:** border and message turn Warning Coral; messages are specific and sit under the field.

### Navigation
- **At rest over the hero:** transparent, white Geist 14px medium links, white pill button.
- **After scroll:** an opaque Steel Paper island (920px max, 64px tall, pill, hairline ring plus soft shadow) floats 24px from the top; links turn Slate Text, the button turns Night Ink.
- **Hover / current:** Ember Amber underline slides in under the link.
- **Mobile:** a two line toggle that turns into an X; the menu is a full screen opaque Steel Paper sheet with large semibold links that rise in one after another.

### The Campfire Film (signature)
A 3 second, silent, looping illustrated film behind the hero. A poster image paints first, the film fades in when it plays, it pauses off screen and on demand (a visible pause button), and reduced motion or data saver visitors get only the poster.

## Do's and Don'ts

### Do:
- **Do** take every color from the `--ops-*` tokens via `ops-*` classes or `rgb(var(--ops-*) / alpha)`.
- **Do** keep Ember Amber for the single next action per viewport.
- **Do** use Campfire Night scrims only where text sits over the film, and keep the subject of the film clear.
- **Do** animate on the fluid curve (`var(--ops-ease-fluid)`, cubic-bezier(0.32, 0.72, 0, 1)) for nav, hero and menus, and the expo out curve (`ease-out-expo`) for section reveals.
- **Do** respect reduced motion everywhere: content visible, no film, no transitions that hide content.

### Don't:
- **Don't** introduce a second typeface, italics, or monospace as decoration.
- **Don't** use gradients as backgrounds or on text; the only gradients are readability scrims over the film.
- **Don't** use glassmorphism, glows, neon, or black shadows.
- **Don't** add a third section ground or tinted bands between Steel Paper and ink.
- **Don't** hardcode hex colors in components.
