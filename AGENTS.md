# Portfolio — Zhentao Huang

## Tech Stack
- React 18 + Vite 4 + GSAP 3 + react-router-dom v7
- Plain CSS (no Tailwind, no CSS modules)
- No TypeScript, no linting, no tests

## Commands
```
npm run dev      # dev server on port 5173
npm run build    # production build
npm run preview  # preview build
```
One-click macOS launch: double-click `start.command`

## Architecture
Single-page scroll-driven portfolio with 4 sections:
- **Hero** — "HUANG" title + profile photo (GSAP blur on scroll)
- **Who?** — horizontal scroll panels with GSAP ScrollTrigger + color transitions
- **Portfolio** — 3D card stack (9 projects), PIN_FACTOR=1.6 controls scroll length
- **Footer** — progressive reveal via `clip-path`, contact info with copy buttons

## Key Gotchas
- **Large assets**: `liberty.svg` is 1.7MB, `profile.png` is 1.3MB — causes slow builds. Resize if adding more large images.
- **Chinese text**: line-height must be ≥1.1 for headings (original 0.9 squeezes CJK characters)
- **GSAP ScrollTrigger**: uses `matchMedia` for mobile/desktop variants; always call `ScrollTrigger.refresh()` after DOM changes
- **Vite 4**: uses `@vitejs/plugin-react` (not `@vitejs/plugin-react-swc`)
- **No GA**: `GA_ID` is empty in `lib/ga.js` — analytics disabled

## Asset Sources
- Stickers (Who section): copied from `itsmarcofranco-main/src/assets/`
- Project icons: from `portfolio_new/public/project-icons/`
- Profile photo: from `portfolio_new/public/profile.png`
- Claude logo: from `portfolio_new/public/Claude logo.svg`

## Reference
Original design: `itsmarcofranco-main/` (Marco Franco portfolio)
