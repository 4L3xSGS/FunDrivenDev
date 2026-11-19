# 💣 Bomb Maze

**Bomb Maze** is an original, browser-based, retro arcade maze game developed for the [FunDrivenDev](https://github.com/4L3xSGS/FunDrivenDev) portfolio.

## 🎮 Play

Play online at **https://4l3xsgs.github.io/FunDrivenDev/games/bomb-maze/**.

## Features

- 17 × 13 tile-based arena with classic pixel-art-inspired graphics
- Solo mode with three autonomous enemies
- Timed bombs, cross-shaped blasts, and chain reactions
- Solid walls and destructible crates
- Collectible upgrades for blast range, bomb capacity, and movement speed
- Three lives, score tracking, victory and defeat screens
- Keyboard and touch controls
- v1.2: dedicated pixel-art tile renderer, layered stone masonry, textured floor, detailed wooden crates and distinct enemy palettes
- v1.2: redesigned hero with readable face, equipment and alternating walk pose; animated enemy sprites
- Animated bombs, pickups and particle effects
- Optional synthesized arcade sound effects (Web Audio API); muted by default

## Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Move | Arrow keys / WASD | Direction buttons |
| Place bomb | Space | Bomb button |
| Restart | R | Restart button |
| Toggle sound | Sound button | Sound button |

## Run locally

Open `index.html` in any modern browser. No build step, dependency installation, backend, account, or API key is required.

## Technology

Vanilla JavaScript, HTML5 Canvas, and CSS. No external assets or runtime dependencies.

## Roadmap

- [x] First playable solo prototype
- [x] Sound effects and refined animations
- [ ] Smarter enemy pathfinding and bomb placement
- [ ] Multiple arenas and progression
- [x] Automated logic and audio smoke tests (Node.js simulation)
- [ ] Accessibility and touch usability improvements

## Status

**v1.2 visual redesign candidate** — isolated PR; no release until CI approval and manual visual checks on desktop/mobile. Existing gameplay and audio rules remain unchanged.

## License

No license has been assigned. All rights reserved unless the repository owner chooses a license.
