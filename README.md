# 📌 GitHub Sticky Header

A lightweight Tampermonkey userscript that pins GitHub's header to the top of your viewport as you scroll — plus a handy floating button to jump back to the top instantly.

## ✨ Features

- **Sticky header** — GitHub's top navigation bar stays fixed in place no matter how far you scroll.
- **Auto padding** — Adds just enough top padding to the page content so nothing hides behind the fixed header.
- **Scroll-to-top button** — A minimal circular button appears in the bottom-right corner once you scroll down, letting you jump straight back to the top — no smooth-scroll animation, just an instant snap.
- **Zero dependencies** — Pure JavaScript and CSS, no external libraries.

## 🎬 How it works

The script injects a small CSS snippet that forces GitHub's `.header-wrapper` to `position: fixed`, then adds top padding to `.application-main` to compensate. A floating `↑` button is added to the page and fades in/out based on scroll position.

## 📦 Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension (available for Chrome, Firefox, Edge, Safari, and more).
2. Click below to install the script:
   - [Install via raw script link](#) *(replace with your raw GitHub URL, e.g. `https://raw.githubusercontent.com/<you>/<repo>/main/github-sticky-header.user.js`)*
3. Tampermonkey will open an installation tab — click **Install**.
4. Visit any page on `github.com` and enjoy your sticky header!

Alternatively, install manually:

1. Open the Tampermonkey dashboard.
2. Click **Create a new script**.
3. Delete the boilerplate and paste in the contents of [`github-sticky-header.user.js`](./github-sticky-header.user.js).
4. Save with `Ctrl+S` / `Cmd+S`.

## ⚙️ Configuration

Everything is tweakable at the top of the script:

| What | Where | Default |
|---|---|---|
| Header top padding | `.application-main { padding-top: ... }` | `100px` |
| Scroll-to-top button position | `#gh-scroll-top-btn { bottom / right: ... }` | `24px / 24px` |
| Scroll threshold before button appears | `toggleVisibility()` | `200px` |
| Button size / colors | `#gh-scroll-top-btn { ... }` | `44px`, dark theme |

## 🖥️ Compatibility

Tested on the latest version of GitHub's UI as of 2026. Since GitHub occasionally updates its class names (e.g. `.header-wrapper`, `.application-main`), if the sticky header stops working after a GitHub redesign, inspect the page and update the selectors in the script accordingly.

## 🤝 Contributing

Issues and pull requests are welcome! If GitHub changes its markup and breaks the script, feel free to open a PR with updated selectors.

## 📄 License

[MIT](./LICENSE) — do whatever you'd like with it.

---

Made with ☕ and a mild allergic reaction to scrolling past a hidden nav bar.
