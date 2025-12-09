# Mobile Offline Sync Plan

## Goals
- Ensure `mobile-tech` (field) and `mobile-client` (customer) apps can operate fully offline for assigned scope.
- Provide deterministic sync queues with conflict policies per entity (jobs, checklists, planograms, media, invoices, requests).
- Encapsulate storage + sync logic inside a shared package to avoid duplication across apps.

## Tooling Decisions
- **WatermelonDB + SQLite**: battle-tested React Native database with sync primitives, lazy loading, and plugin ecosystem.
- **@nozbe/watermelondb/adapters/sqlite** plus **react-native-quick-sqlite** for high-performance native driver.
- **Shared Offline Package**: `packages/mobile-offline` exporting schema definitions, migrations, hydration helpers, and queue utilities reused across apps.
- **Sync Queue**: append-only table storing serialized operations with metadata (operationId, entity, payload, status, retryCount, lastError). Flush handled by background worker triggered on connectivity + manual action.

## Data Domains to Cache
1. **Jobs & Templates**: assigned jobs, stops, checklist instances, planogram assignments, job template metadata.
2. **Inventory**: inventory items, barcode map, favorites, planogram cell definitions.
3. **Clients/Locations**: minimal info for service locations tied to the user/client.
4. **Artifacts**: local references for photos/signatures (stored via RNFS, metadata in DB).
5. **Planograms**: grid + cell data for DSD job instructions.
6. **Price Lists & Templates**: relevant invoice/service report templates for offline PDF generation.

## Conflict & Merge Rules
- **Jobs**: last-write wins for scalar fields conditioned on `offlineSyncVersion`; additive merge for arrays (photos, planogram results).
- **Checklists**: block completion unless required fields satisfied locally; server validates versions before mark complete.
- **Planograms**: merge by `(jobId, cellKey)`; server accepts newest timestamp.
- **Inventory Usage**: sum quantities per job + inventory item; duplicates collapsed on server.
- **Client Portal**: offline payments stored as queued operations; server ensures idempotency with `operationId`.

## Background Workers
- **Sync Worker**: monitors connectivity, drains queue with exponential backoff; uses shared retry policy.
- **Hydration Worker**: after login or job assignment change, pulls latest payload via `/mobile-sync` endpoint, writes to DB in batches.
- **Media Upload Worker**: separate queue referencing RNFS file path, handles S3 uploads when online.

## Connectivity & Observability
- Expose a global status bar component showing queue depth + last sync time.
- Provide manual "Sync now" and "Reset cache" actions in settings.
- Instrument logging (Sentry/console) for failed operations.

## Next Steps
1. Scaffold `packages/mobile-offline` with Watermelon schema, queue utilities, and TypeScript models.
2. Wire adapters and providers inside `mobile-tech` + `mobile-client` entry points.
3. Build sync hooks (React Context) to expose query + mutation APIs to screens.
