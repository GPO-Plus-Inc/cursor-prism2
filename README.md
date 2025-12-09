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
pnpm nx start mobile-tech     # Metro bundler for the field app
pnpm nx run mobile-tech:run-android   # Launch Android build
pnpm nx start mobile-client   # Metro bundler for the client portal app
pnpm nx test admin     # Run Vitest suite for the admin shell
pnpm nx test shared    # Run Vitest suite for shared utilities
pnpm nx test mobile-offline   # Validate shared offline package
pnpm lint              # Nx lint target across projects
pnpm build             # Build every project with a build target
```

> Tip: `pnpm nx graph` visualizes the dependency graph once additional apps/libs are added.

## Next Steps

1. **Mobile Offline Data** – WatermelonDB/SQLite storage, sync queues, and planogram/checklist caching now live in the `@fsm/mobile-offline` package (see `docs/offline-sync.md`). Wrap any React Native screen tree with `OfflineProvider` and use `useSyncQueue` for status/enqueue helpers.
2. **Domain API Modules** – Express API now exposes Mongo-backed repositories/services for organizations, jobs, inventory, and integration connections (`apps/api/src/modules`). Background jobs run through BullMQ (`queues/sync.queue.ts`) with a worker entrypoint.
3. **CI/CD** – GitHub Actions workflow (`.github/workflows/ci.yml`) builds/lints/tests the monorepo. Deployment guidance + ECS task stub lives under `infra/aws`.
4. **Integrations UI** – Admin shell includes a QuickBooks/Zoho credential panel wired to `/api/v1/integrations`. This feeds the integration connectors under `apps/api/src/integrations`.
5. **Design System** – Promote the shared tokens into a component library (Storybook-ready) to keep web + RN parity.

## Mobile App Notes

- Both `mobile-tech` and `mobile-client` ship with Metro, Android, and iOS targets (see `nx show project <name>`).
- The React Native screens already consume the shared design tokens/blueprints so UI parity stays in sync with the admin shell.
- Run `pnpm nx sync-deps <app>` after adding native modules, and `pnpm nx run <app>:pod-install` before building for iOS.

## API Notes

- `apps/api/src/app.ts` wires helmet, cors, logging, multi-tenant context parsing, and `/health` + `/api/v1/status` routes.
- Configure environment via `.env` or deployment-time env vars (PORT, MONGO_URI, LOG_LEVEL, SERVICE_NAME). Defaults live in `apps/api/src/config/env.ts`.
- Every request gains `req.orgContext` (derived from the `x-org-id` header or `orgId` query string) plus a generated `requestId` for logging/traceability.
- Domain modules for organizations, jobs, inventory, and integrations live under `apps/api/src/modules/*`, and the BullMQ-powered worker listens via `apps/api/src/workers/export.worker.ts`.

Let me know when you're ready for the next feature (mobile offline storage, database connectors, QuickBooks integrations, etc.). 

Everything in this repo is ready to push to GitHub and later deploy to AWS ECS/S3 as described in the technical brief. Let me know when you're ready for the next feature (mobile scaffolding, backend endpoints, QuickBooks connectors, etc.). 
