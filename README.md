# dsh-blackhole

A geodesic-traced Schwarzschild **black hole floating inside DeepSeek Harness (DSH)** —
a persistent client plugin for the DSH web surface, ported from
[s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole) (Ghostty
custom shader, MIT). The black hole lives on a click-through WebGL2 overlay
above the page: every near-field pixel integrates its own null geodesic through
the Schwarzschild metric (Binet form `a = -(3/2) h² x / r⁵`), so the shadow, the
accretion disk, the photon ring, and the gravitational lensing are all emergent
from the ray tracing — nothing is painted on.

## What it renders

- **The shadow** — rays under `b_crit = (3√3/2) r_s` spiral in and come back black.
- **Accretion disk** — thin Keplerian disk with a Shakura–Sunyaev temperature
  profile, relativistic Doppler shift and beaming (`g = √(1 − 1.5 r_s/r)/(1 − β·k̂)`);
  the far side arcs over and under the shadow (the Interstellar look).
- **Photon ring** — rays winding near the `1.5 r_s` photon sphere.
- **Gravitational lensing** — two modes, both optional:
  - **Lens page** (default): the *real* DOM elements around the hole are warped
    by per-element CSS transforms (magnified + pulled toward the hole, driven by
    the same hole math the shader uses, so the warp stays locked to the hole).
    Transform-only means layout is untouched: no page-wide filter, nothing ever
    clips or goes black, and scrolling stays fast.
  - **Sky background** (off by default): a procedural starfield "sky" plane is
    lensed instead (browsers cannot sample page pixels into WebGL, so this is
    the original Ghostty-style look; far field uses the analytic weak-field
    deflection with mild chromatic aberration).
- **Gravitational time dilation** — the disk pattern winds down as the hole
  grows heavier.

## Modes

| Mode | Behavior |
| --- | --- |
| **Demo tour** | 42 s self-running showcase: grows from the top-right corner seed to full size while crossfading through 8 tuner presets (Inferno → Gargantua → M87* → Ember → Quasar → Blazar → Pure Lens). |
| **Pomodoro** | 55/5 wall-clock cycle + a 90 s keyboard/pointer idle detector (browser `Date.now()` replaces Ghostty's broken `iDate`). |
| **Context** | DSH-native analog of upstream token mode: no/blank session → no hole; the hole grows with the conversation (`1 − e^(−nodes/70)`), faster and wider-ranging as it fills. |
| **Manual** | Fixed level 0–100 %. |

15 disk presets from the upstream tuner + `ghostty-blackhole-main`, follow-pointer
mode with inertia, and a full settings page (设置 → **Blackhole**) with live
status (mode / level / FPS / shader errors). Background & lensing options:
**Sky background** (starfield disc) and **Lens page** (SVG displacement of the
real content) are independent toggles, plus a lens-strength slider. The bottom
work area is never covered; all state is in-memory only.

## Install (persistent, auto-loads on every `dsh web` start)

DSH composes its `web` profile from bundle patch layers plus your own layer at
`$DSH_HOME/profiles/web/cordis.patch.yml`. Installing a client plugin means
adding a package and one row:

```powershell
# 1. Clone into the profile tree
New-Item -ItemType Directory -Force "$env:USERPROFILE\.dsh\profiles\web\packages"
git clone https://github.com/<you>/dsh-blackhole "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 2. Link it into the profile (records the dependency in package.json)
dsh plugin --profile web add "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 3. Host-side resolution anchor (bare package name is resolved from the
#    hoisted node_modules; pnpm links local dirs into web/node_modules only)
New-Item -ItemType Junction `
  -Path "$env:USERPROFILE\.dsh\profiles\node_modules\dsh-blackhole" `
  -Target "$env:USERPROFILE\.dsh\profiles\web\packages\dsh-blackhole"

# 4. Add the row: append install/cordis.patch.example.yml to
#    $DSH_HOME/profiles/web/cordis.patch.yml
```

Restart `dsh web`. On every start, `dsh-client-modules` scans the row's
`dsh.client` declaration into `window.__DSH_BOOT__` and serves the bundle from
`/plugins/dsh-blackhole/client.js` — no session action needed.

> The junction in step 3 is the one hand-maintained piece: re-create it after a
> `dsh plugin add/remove` of another package prunes the hoisted node_modules.

### Uninstall

Delete the `blackhole` row from `cordis.patch.yml`, then
`dsh plugin --profile web remove dsh-blackhole`.

## How it works

- `package.json` — the `dsh.client` declaration (`platform: web`,
  `immediately: true`) and the `./client` export the module system scans.
- `lib/index.js` — host half: a no-op `apply` so the host Loader row mounts.
- `lib/client.js` — the browser bundle: a classic script registering a
  `window.__ModuleLoader__.load({ id, factory })` factory whose exports are the
  Cordis plugin. It requires only the seeded `react` module and — like every
  shipped client plugin — declares `inject: ["slots"]`, because the client
  kernel exposes a service only when the plugin's `inject` lists it
  (`ctx.get("slots")` is `undefined` otherwise).
- The plugin registers three slots: `shell.overlay` (fullscreen click-through
  WebGL2 canvas, order −100), `settings.section` (the control panel), and
  `conversation.session.header.utilities` (a null-rendering probe that reads the
  conversation snapshot's `blank` / `nodes.length` leaves for Context mode).
- GLSL ES 3.00 port of `blackhole.glsl` with two deliberate changes:
  `gl_FragCoord.y` is converted to Ghostty's **top-down** convention, and the
  struct-returning ternary is written as if/else because ANGLE (D3D11) rejects
  `?:` on structures even in ESSL 3.00.

## Credits & license

- Shader physics and demo tour: [s0xDk/ghostty-blackhole](https://github.com/s0xDk/ghostty-blackhole) (MIT, © 2026 s13k), after Eric Bruneton's [black hole shader](https://ebruneton.github.io/black_hole_shader/).
- Preset values and follow-pointer idea: [XboxNahida/ghostty-blackhole-main](https://github.com/XboxNahida/ghostty-blackhole-main) (MIT).
- Mode-semantics cross-check: [962412311/win-ghostty-blackhole](https://github.com/962412311/win-ghostty-blackhole).

MIT — see [LICENSE](LICENSE).
