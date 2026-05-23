---
version: beta
name: Nishant-terminal-portfolio
description: |
  A terminal-native portfolio system rendered entirely in monospaced type. The first viewport behaves like a real shell session: `figlet "Nishant Bhargava"` prints the ASCII name, `cat role.txt` prints the research role, and interactive commands such as `ls papers`, `cd work && ls`, and `open resume.pdf` update the terminal output. Dark mode is the default. The palette is intentionally black, white, and neutral gray only; hierarchy comes from inversion, underline, border weight, spacing, and type weight rather than blue, green, orange, or red accents.

colors:
  primary: "#201d1d"
  on-primary: "#fdfcfc"
  ink: "#201d1d"
  ink-deep: "#0f0000"
  charcoal: "#302c2c"
  body: "#424245"
  mute: "#646262"
  stone: "#6e6e73"
  ash: "#9a9898"
  canvas: "#fdfcfc"
  surface-soft: "#f8f7f7"
  surface-card: "#f1eeee"
  surface-dark: "#000000"
  surface-dark-elevated: "#080808"
  hairline: "rgba(15,0,0,0.12)"
  hairline-strong: "#646262"
  on-dark: "#ffffff"
  on-dark-mute: "#9f9f9f"
  accent: "#201d1d"
  success: "#201d1d"
  warning: "#646262"
  danger: "#201d1d"

typography:
  display-xl:
    fontFamily: Berkeley Mono
    fontSize: 38px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  heading-md:
    fontFamily: Berkeley Mono
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0
  body-md:
    fontFamily: Berkeley Mono
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: Berkeley Mono
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0
  caption-md:
    fontFamily: Berkeley Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 2
    letterSpacing: 0

rounded:
  none: 0px
  sm: 4px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  section: 96px

components:
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    height: 52px
  nav-command:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    commandChipBackground: "{colors.ink}"
    commandChipText: "{colors.canvas}"
    rounded: "{rounded.sm}"
    padding: 3px 8px
  nav-command-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    commandChipBackground: "{colors.canvas}"
    commandChipText: "{colors.ink}"
  terminal-hero:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    maxWidth: 1280px
    padding: 24px 40px 30px
  terminal-status-bar:
    backgroundColor: "{colors.surface-dark-elevated}"
    textColor: "{colors.on-dark-mute}"
    typography: "{typography.caption-md}"
    rounded: "{rounded.none}"
    padding: 10px 32px
  terminal-prompt-row:
    backgroundColor: "{colors.surface-dark-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  terminal-command-button:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    borderColor: "{colors.hairline-strong}"
    rounded: "{rounded.sm}"
    padding: 4px 10px
  terminal-command-button-active:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.surface-dark}"
    borderColor: "{colors.on-dark}"
  publication-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderTop: "1px solid {colors.hairline}"
    padding: 24px 0px
  publication-row-featured:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderTop: "2px solid {colors.ink}"
    padding: 24px 0px
---

## Visual Thesis

Nishant's portfolio should feel like a precise black-and-white terminal session: dense, technical, research-forward, and interactive without looking gimmicky.

## Content Plan

1. Hero terminal: identity, role, live command prompt, quick commands, and tabbed output.
2. Publications: placed immediately after the hero because papers are the highest-signal proof.
3. About: personal research motivation and education details.
4. Beyond: books, movies, and shows for personality.
5. Work: experience timeline.
6. Skills and contact: stack, links, and open channel.

## Interaction Thesis

- The ASCII name appears as one fast command-output block, as if `figlet "Nishant Bhargava"` returned immediately.
- Terminal tabs update the command prompt, stdout line, mode label, and panel output.
- Quick terminal commands update the prompt before navigating to papers, work, resume, or email.

## Monochrome Hierarchy

No UI state depends on hue. The site uses:

- Bright text for primary identity and active terminal output.
- Soft gray for secondary copy, metadata, and inactive states.
- Underline plus arrows for links.
- Inverted fills for selected nav items, active tabs, badges, and primary actions.
- Hairline borders for grouping.
- Thicker borders for featured research and terminal focus.
- Spacing rhythm to separate sections instead of colored bands.

## Terminal Rules

- Use real command language where possible: `figlet`, `cat`, `ls`, `cd`, `open`, `mail`.
- Do not decorate command output with unrelated symbols such as `=>`.
- Keep exactly one blinking block cursor in the active command row.
- The cursor must use the current theme's foreground color: white in dark mode, black in light mode.
- Cursor timing should be a hard terminal-style on/off blink, not a fade.
- Motion should run once or on interaction; avoid constant animation except the cursor.

## Theme Rules

- Dark mode is the default because the terminal is the brand anchor.
- Light mode remains available and must preserve the same monochrome hierarchy.
- Switching themes should update the nav label, terminal status label, background, foreground, and cursor color.
- Theme and resume controls should match the same command-chip button treatment as the rest of the nav.
- Do not introduce blue, green, orange, red, purple, gradients, glows, or halos.

## Link Rules

- Links are not blue.
- A link should be recognizable through underline, arrow suffix, command framing, or inverted hover state.
- Social links should show the real visible identity or username, not vague labels.

## Responsive Rules

- The terminal must remain readable on mobile; command buttons collapse from four columns to two, then one.
- The ASCII name can scale down, but it must not overlap or force horizontal page scroll.
- The mobile header should show the full `nishant@portfolio` brand; the menu label can compact before the brand truncates.
- The active terminal command and block cursor must stay on the same mobile prompt line.
- Very narrow phones can reduce terminal ASCII and prompt text before allowing internal clipping.
- Header commands collapse into the mobile menu before they crowd the status bar.
- The mobile dropdown menu is opaque, never translucent or blurred.
- Publications stay directly after the hero on every viewport.

## Do

- Keep every visible UI element black, white, or neutral gray.
- Use command chips to clarify that nav items are buttons.
- Put publications before personality sections.
- Use border weight, underline, spacing, and inversion for hierarchy.
- Verify both dark and light mode before shipping.

## Don't

- Do not use colored syntax accents.
- Do not use halos, glows, or decorative gradients.
- Do not use `=>` before the name.
- Do not make the hero a static mockup when it can behave like a command surface.
- Do not bury papers below less relevant sections.
