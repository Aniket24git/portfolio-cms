# Architecture Improvement Guide

## Objective

Keep the public portfolio fast and dependable while making content administration secure, testable, and independently maintainable.

The main architectural change is to separate three concerns that are currently bundled together:

1. Public portfolio rendering.
2. Content persistence and validation.
3. Authenticated content administration.

## Target Architecture

```text
Browser
  |
  +-- Public application
  |     +-- portfolio pages
  |     +-- read-only content repository
  |     +-- static assets
  |
  +-- Lazy-loaded admin application
        +-- authentication
        +-- content editor
        +-- image uploader
        +-- write repository

Content repositories
  +-- Firebase repository (production)
  +-- Local repository (development/demo)
  +-- Default static content (fallback)
```

Suggested source structure:

```text
src/
  app/
    App.jsx
    routes.js
  features/
    portfolio/
      pages/
      components/
    admin/
      AdminPage.jsx
      EntryForm.jsx
      adminService.js
  content/
    contentSchema.js
    defaultContent.js
    contentRepository.js
    firebaseContentRepository.js
    localContentRepository.js
  infrastructure/
    firebase.js
  shared/
    components/
    hooks/
```

## Implementation Instructions

### 1. Establish explicit content contracts

- Define the portfolio content schema in one module. Use TypeScript interfaces or a runtime schema library such as Zod.
- Validate default data, Firestore responses, local-storage data, and admin form submissions before use.
- Give every content item a stable UUID. Do not use the display index as identity.
- Store ordering in an explicit `order` field or array. Derive `01`, `02`, and similar labels only while rendering.
- Version persisted content with a `schemaVersion` field and add migration functions before changing its shape.

Acceptance checks:

- Corrupt or outdated persisted data falls back safely instead of blocking the application.
- Reordering or deleting entries does not change their identity.
- Invalid admin submissions display actionable field errors.

### 2. Introduce a repository boundary

- Stop importing Firebase directly into the React store.
- Define a small repository interface with `loadContent`, `saveContent`, and `uploadImage` operations.
- Select the Firebase or local implementation during application startup.
- Make repository methods return explicit success/error results. Do not swallow persistence failures.
- Preserve the last known valid content when a read fails and expose a recoverable error state.

This keeps React state independent of the storage provider and makes persistence testable without Firebase.

### 3. Split public and admin bundles

- Move the admin page, Firebase Auth, Firebase Storage, and drag-and-drop library behind a dynamic import.
- Initialize Firebase only when the configured repository or admin route requires it.
- Keep default public content and public components free from Firebase imports.
- Replace embedded base64 logos in `src/data.js` with optimized files under `public/assets` or imported build assets.
- Convert large PNG photographs to appropriately sized WebP or AVIF variants.

Acceptance checks:

- The initial public bundle does not contain Firebase, Firebase Auth, or drag-and-drop code.
- Vite no longer emits the 500 kB chunk warning for the public entry point.
- Images are served near their rendered dimensions.

### 4. Make routing intentional

- Replace manual hash parsing with a small router, or define a tested route adapter if hash routing is retained.
- Give public sections stable URLs and support browser back/forward navigation.
- Put administration on an explicit `/admin` route and lazy-load it.
- Add a not-found state for unknown routes.
- Preserve scroll position per route rather than querying global DOM nodes.

For a portfolio that needs search visibility for individual case studies, prefer real path-based routes and pre-rendered pages.

### 5. Secure the write path

- Treat Firebase configuration as environment-specific configuration using `VITE_FIREBASE_*` variables. Firebase client configuration is public, but it should not be hard-coded per environment.
- Add and version Firestore and Storage security rules in the repository.
- Permit public reads only for published portfolio content.
- Permit writes and uploads only for explicitly authorized administrator user IDs or custom claims.
- Restrict uploads by MIME type and size in both the client and Storage rules.
- Generate storage object names independently of the original filename.
- Test rules with the Firebase Emulator Suite before deployment.

Do not rely on hiding the admin navigation or showing a login form as an authorization mechanism.

### 6. Improve consistency and concurrency

- Avoid rewriting one large Firestore document for every edit if content will grow. Use separate collections for projects, case studies, and teardowns.
- If the single-document model is retained, include `updatedAt` and a revision number and use a transaction to reject stale writes.
- Show saving, saved, and failed states in the admin UI.
- Roll back optimistic state or offer retry when persistence fails.
- Confirm navigation when an editor contains unsaved changes.

### 7. Separate shared and item-specific content

- Move teardown detail data onto each teardown instead of applying one shared template to all entries.
- Model project and case-study details explicitly so the UI promise to open cards has a corresponding detail route.
- Store contact links and résumé metadata in the content model; render real links rather than placeholder click handlers.
- Keep presentation-only strings out of persistence when they can be derived from content.

### 8. Simplify React state ownership

- Split content state from admin actions so public components do not rerender when admin-only state changes.
- Memoize context values or use separate read and write contexts.
- Keep route transition state derived from the active route rather than synchronously resetting it in an effect.
- Move DOM measurement and scroll behavior into focused hooks with cleanup and reduced-motion support.
- Break `AdminPage` into authentication, list, editor, and upload components.

### 9. Add architectural quality gates

Add these scripts and run them in CI:

```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "build": "vite build"
  }
}
```

Minimum coverage should include:

- Content validation and schema migrations.
- Repository fallback and persistence failures.
- Add, edit, delete, and reorder operations using stable IDs.
- Authentication and authorization-rule tests.
- Public navigation, contact links, and project-detail flows.
- A production build budget for JavaScript and critical images.

Make lint, tests, and build required checks before deployment.

### 10. Document operations

Replace the generated Vite README with project-specific documentation covering:

- Local development and environment variables.
- Content architecture and schema versioning.
- Firebase project setup and emulator usage.
- Security-rule deployment.
- Build and deployment commands.
- Backup, restore, and rollback procedures for portfolio content.

## Recommended Migration Order

1. Fix the current lint failures and add a small test harness.
2. Extract and validate the content schema.
3. Introduce repository implementations without changing behavior.
4. Add safe loading, error, and save states.
5. Add stable IDs and migrate existing content.
6. Lazy-load the admin and Firebase dependencies.
7. Add Firebase rules, emulator tests, and environment configuration.
8. Introduce real detail routes and working contact links.
9. Split Firestore documents only if content size or concurrent editing requires it.
10. Enforce CI checks and bundle budgets.

Each phase should leave the application deployable. Avoid combining the data migration, router replacement, and visual redesign into one release.

## Definition of Done

The architecture improvement is complete when:

- Public pages render from validated content even when remote storage is unavailable.
- Admin dependencies are absent from the initial public bundle.
- All writes require server-enforced authorization.
- Content changes have stable identity, validation, visible save status, and conflict handling.
- Public links and promised detail interactions work.
- Lint, unit tests, browser tests, and production build pass in CI.
- Setup, deployment, security, and recovery procedures are documented.
