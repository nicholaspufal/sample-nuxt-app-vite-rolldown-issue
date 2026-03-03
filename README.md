# Nuxt + Vite Rolldown CSS volume repro

This repository gives you a **minimal, focused repro** for a bug where the **Nuxt server build hangs and never completes when using Vite Rolldown** and a very large amount of CSS from many Vue SFCs.

What this app is set up to show you:
- Nuxt 4, Vue 3.5, and **Vite 8.0.0-beta.16** wired to **Rolldown** via `resolutions`, using Yarn 4 and Node 22.
- **Hundreds of dummy components** (~680) with large, hard-coded `<style>` blocks, checked in under `components/generated/`.
- An SSR build path that forces Vite/Rolldown to process all of that CSS during the server build.

With this setup:
- **Vite Rolldown** can get overwhelmed by the CSS volume and the server build appears to hang indefinitely, often requiring you to manually kill the build process (for example with `kill -9 <pid>`).
- The **same app built with standard Vite/Rollup (no Rolldown override)** completes successfully, which suggests this is a bug specific to Vite Rolldown's CSS handling under heavy load.

## Prerequisites

- Node **22**
- Yarn **4.9.2** (or compatible Yarn 4)

All CSS-heavy components live in `components/generated/`.

## Install dependencies

From the root of this repo:

```bash
yarn install
```

This will install Nuxt 4, Vue 3.5, Vite 8.0.0-beta.16 (via `resolutions`), Sass, and related tooling.

## How the app is structured

- The app has a home page and several section pages (`/section-1` … `/section-10`). Each section page imports a shared layout component that renders a slice of the generated components.
- Components are organized in a normal way: pages use `GeneratedSection`, which uses `FeatureWrapper` and the generated components from `components/generated/`. No single route renders every component at once.
- The production build still includes all ~680 SFCs and their CSS, so Vite/Rolldown must process the full set during `yarn build`, which can hang or run very slowly.

## How to reproduce the Vite Rolldown CSS hang

1. **Install deps** (once):
   ```bash
   yarn install
   ```
2. **Run a production build** to stress Vite/Rolldown with the large CSS volume:
   ```bash
   yarn build
   ```

On a typical machine you should see:
- Nuxt using **Vite 8.0.0-beta.16 (Rolldown)** for the build.
- The process eventually **appearing to hang and never completing** while CPU usage drops to ~0% and memory usage plateaus at a stable level (for example ~50% of system memory), indicating that the stall is **not** caused by lack of CPU or RAM but by Vite Rolldown itself when processing the hundreds of generated SFCs and their CSS.

In this state the build does not recover; `Ctrl+C` does not stop the process and you need to terminate it forcefully (for example, with `kill -9 <pid>` from another shell).

You can also run the dev server to sanity-check rendering; this path works as expected and is not the focus of the repro. The issue being demonstrated here is specifically the **production server build** (`yarn build`) when using Vite Rolldown:

```bash
yarn dev
```

## Notes / caveats

- The goal is **not** visual correctness but **CSS size and number of SFCs**. Styles in this repo are mainly placeholders to demonstrate CSS volume across components; many are intentionally broken or unused and only contribute to bundle size and processing cost.
- To increase stress on Vite/Rolldown, add more dummy components or duplicate style blocks in `components/generated/`.
