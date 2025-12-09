# Helios FSM Monorepo

MERN + React Native workspace for the offline-first Field Service Management platform. The UI direction mirrors the [Prism](https://prism.created.app/) aesthetic while anchoring on the mandated color system (`#FFFFFF`, `#000000`, `#444444`, `#ed1d24`, `#38a69a`, `#3d9bb5`).

## Tech Stack at a Glance

- **Workspace**: Nx 22 (integrated) with pnpm workspaces and Node 20 LTS (`.nvmrc` included)
- **Web Admin (`apps/admin`)**: React 19 + Vite, Vitest + Playwright, CSS modules with shared design tokens
- **API (`apps/api`)**: Express + Helmet + Morgan, esbuild/webpack build target, health/status routes ready for ECS
- **Shared package (`packages/shared`)**: TypeScript utilities for design tokens, module blueprints, and hero metrics (consumed by web + future RN apps)
- **Testing/Linting**: Vitest for UI + shared libs, Jest for generated e2e projects, ESLint wired via Nx targets

## Project Structure

```
apps/
  admin/         # React web admin shell (Prism-inspired landing)
  admin-e2e/     # Playwright scaffold
  api/           # Express API baseline with health + status routes
  api-e2e/       # Jest/Supertest scaffold
packages/
  shared/        # Design tokens & blueprint metadata shared across apps
```

`pnpm-workspace.yaml` already scopes `apps/**` and `packages/**`, so any new RN apps (e.g., `apps/mobile-tech`) will be picked up automatically.

## Useful Commands

```bash
pnpm install           # Install dependencies (pnpm v10+ recommended)
pnpm dev:admin         # Run the Prism-inspired web shell with Vite
pnpm dev:api           # Start Express API (PORT defaults to 3333)
pnpm nx test admin     # Run Vitest suite for the admin shell
pnpm nx test shared    # Run Vitest suite for shared utilities
pnpm lint              # Nx lint target across projects
pnpm build             # Build every project with a build target
```

> Tip: `pnpm nx graph` visualizes the dependency graph once additional apps/libs are added.

## Next Steps

1. **Mobile Apps** – Generate React Native projects (`apps/mobile-tech`, `apps/mobile-client`) and point them to `packages/shared` for tokens/validation.
2. **API Modules** – Flesh out the Express API to include org-aware routing, MongoDB connectors, and background job queues for exports & integrations.
3. **CI/CD** – Wire GitHub Actions (or preferred CI) to run `pnpm install && pnpm lint && pnpm test && pnpm build`, then deploy to AWS (ECS for API, S3+CloudFront for web, S3 for media).
4. **Design System** – Promote the shared tokens into a component library (Storybook-ready) to keep web + RN parity.

Everything in this repo is ready to push to GitHub and later deploy to AWS ECS/S3 as described in the technical brief. Let me know when you're ready for the next feature (mobile scaffolding, backend endpoints, QuickBooks connectors, etc.). 
