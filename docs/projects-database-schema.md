# Projects database schema

## Scope

This schema covers the portfolio's `projects` collection/card model. It is intentionally limited to the data needed to list and render a project card. Long-form case-study content should be modeled separately when that feature is defined.

## Current object audit

The current `projects` object contains these fields:

| Field | Current role | Decision |
| --- | --- | --- |
| `id` | Stable UUID | Keep as the record identifier in the frontend; use it as the Firestore document ID when stored as a collection. |
| `order` | Array order / drag-and-drop order | Rename to `position`; keep as an integer starting at `0`. |
| `schemaVersion` | Payload compatibility marker | Remove from the project record. Version the database migration/schema instead. |
| `idx` | Zero-padded display number and legacy lookup key | Remove from storage. Derive it from `position + 1`. |
| `year` | Project year | Keep, but store as an integer rather than a string. |
| `title` | Project title | Keep. |
| `blurb` | Short project description | Rename to `summary` to describe its purpose clearly. |
| `cover` | Placeholder/image value in the original schema | Replace with `coverUrl`; do not keep both names. |
| `coverUrl` | Uploaded image URL used by the admin UI and card renderer | Make this the canonical image field. Allow `null` when no image exists. |
| `tags` | Small list of labels | Keep as a string array for this portfolio-sized collection. |

## Canonical project record

### Frontend/content shape

```js
{
  id: "uuid",
  position: 0,
  year: 2025,
  title: "Project Alpha",
  summary: "A brief description of Project Alpha.",
  coverUrl: "https://...",
  tags: ["0→1", "Growth"]
}
```

### Firestore storage shape

Use a top-level `projects` collection. The document ID is the project `id`; it does not need to be duplicated inside the document.

```text
projects/{projectId}
  position: number       // required, >= 0; controls display order
  year: number           // required, four-digit year
  title: string          // required
  summary: string        // required; short card description
  coverUrl: string|null  // optional image URL
  tags: string[]         // optional; defaults to []
  createdAt: timestamp   // server-managed
  updatedAt: timestamp   // server-managed
```

`createdAt` and `updatedAt` are database metadata rather than user-authored project content. They are useful for admin sorting and auditability, but they should not be required by the public card component.

## Constraints

- `position` must be unique within the published project list and is the only source for display order.
- The display index is derived at render time: `String(position + 1).padStart(2, '0')`.
- `year` must be a number between `1900` and `2100`.
- `title` and `summary` must be non-empty after trimming.
- `coverUrl` may be `null`; an absent image should render the existing placeholder.
- `tags` should contain trimmed, non-empty strings. Duplicate tags should be removed before saving.
- `id`, `position`, timestamps, and image URLs are not editorial copy and should not be edited as free-form text in the project body.

## Migration from the current object

```text
id           -> document ID / id
order        -> position
year         -> Number(year)
title        -> title
blurb        -> summary
coverUrl||cover -> coverUrl
tags         -> tags
idx          -> derived only; do not persist
schemaVersion -> removed
```

If both `cover` and `coverUrl` exist during migration, prefer the non-empty `coverUrl` value. Existing Firestore data should be migrated before switching the validator and admin writes to this shape.

## Why this is the first schema

This keeps the project card small and stable: identity, ordering, time, copy, media, and labels. A project detail page can later add a separate `projectDetails` document or related tables without forcing card-only fields and long-form case-study fields into the same record.

