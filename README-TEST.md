# API Test Documentation

This document describes the current automated API coverage, what each endpoint
test validates, and how to run the suite.

## Quick Start

1) Ensure `.env.local` (or `.env.test`) has valid DB and JWT values.
2) Run: `npm test`

Notes:
- Tests run against the DB configured in `.env.local` because `tests/setup-env.ts`
  loads `.env.local` first.
- Tests write temp files to `tmp-test-storage/` and auto-clean it after tests.

## Test Harness Overview

- `tests/api/all-api.test.ts` executes implemented cases from `tests/api/api-cases.ts`.
- `tests/api/coverage.test.ts` ensures all `app/api/**/route.ts` endpoints are
  declared in the registry (either implemented or TODO).
- `tests/api/api-exports.test.ts` verifies each route file exports its HTTP handlers.
- `tests/api/api-cases.generated.ts` is auto-generated and marks all endpoints as TODO.
  Implemented cases live in `tests/api/api-cases.ts` and override TODOs.
- `tests/api/baseline.test.ts` covers cross-cutting baseline checks (auth, validation, 404s).
- `tests/api/idempotency.test.ts` asserts read-only GETs and safe repeatable mutations.
- `tests/api/validation.test.ts` exercises validation and 404 paths per endpoint.
- `tests/api/response-shape.test.ts` enforces stable response payload shapes.
- `tests/helpers/api-test-utils.ts` and `tests/helpers/api-fixtures.ts` provide shared builders.

## API Test Standards (Best Practices)

Use these as a checklist when adding a new endpoint test.

### For All Methods
- Assert status code and response shape (success + error).
- Verify auth/role checks: no auth -> 401, wrong role -> 403.
- Validate input errors: missing/invalid fields -> 400/422 with clear message.
- Verify 404 for missing resource IDs.
- Confirm no secrets in payload (password hashes, tokens, internal IDs as needed).
- Check DB state and any filesystem side effects.

### GET
- Should be read-only and idempotent (repeatable without changes).
- Validate list endpoints: filters, pagination, sorting, and default limits.
- Validate detail endpoints: required params, slug/id mismatch behavior.
- Confirm expected fields are present and types match contract.

### POST
- Creates a new resource or triggers a single side effect.
- Assert DB row created with defaults (timestamps, status flags).
- Validate uniqueness/duplicate handling (409 or 400).
- Confirm response includes new resource identifiers.

### PATCH
- Partial update only: unchanged fields remain intact.
- Validate field-level constraints and enums.
- Confirm updatedAt/modified fields change.
- Assert proper error on invalid patch or missing target.

### DELETE
- If soft-delete: verify flag change and visibility in lists.
- If hard-delete: verify DB row removal and cascading effects.
- Confirm behavior is idempotent (repeat delete is safe).

### Contract & Error Shape
- Keep a consistent response format: `{ status, message, data }` or `{ error }`.
- Assert error messages are stable enough for clients.

### Test Data Hygiene
- Use `tests/helpers/seed.ts` helpers and `resetDb()` to isolate tests.
- Avoid relying on existing data from `.env.local` outside the seed.

### Where to Add New Tests
- Add implemented cases to `tests/api/api-cases.ts`.
- Regenerate TODOs with `npm run api:cases:gen`.
- Use `npm run api:missing` to find routes without tests.

## Implemented Endpoint Tests

### Assign Role
- `GET /api/assign-role/lists/[slug]`
  - Requires auth + UI header; returns users assigned to a role.
- `PATCH /api/assign-role/update/[slug]`
  - Updates role assignments; verifies DB roleId changes.

### Auth
- `POST /api/auth/login`
  - Valid credentials return session cookie.
- `POST /api/auth/logout`
  - Clears session cookie.
- `GET /api/auth/me`
  - Returns authenticated user and permissions.

### Buckets
- `GET /api/buckets/[slug]`
  - Returns bucket info, top-level folders, and media items.
- `PATCH /api/buckets/[slug]/archive`
  - Marks bucket as removed.
- `POST /api/buckets/[slug]/cleanup`
  - Deletes bucket media/spaces and clears filesystem folder.
- `POST /api/buckets/[slug]/create-folder`
  - Creates a space folder record (DB).
- `PATCH /api/buckets/[slug]/delete`
  - Marks bucket, spaces, and media as removed.
- `GET /api/buckets/[slug]/download`
  - Serves file content via signed download token.
- `GET /api/buckets/[slug]/folder`
  - Returns child folders and media under a parent folder.
- `GET /api/buckets/[slug]/media`
  - Returns filtered media list for a bucket.
- `PATCH /api/buckets/[slug]/regenerate-access-key`
  - Regenerates access keys and updates DB.
- `PATCH /api/buckets/[slug]/rename`
  - Renames bucket and updates filesystem directory.
- `PATCH /api/buckets/[slug]/restore`
  - Restores bucket availability.
- `POST /api/buckets/[slug]/signed-url`
  - Generates signed download URL for media.
- `GET /api/buckets/[slug]/stats`
  - Aggregates media count/size for bucket.
- `PATCH /api/buckets/[slug]/update-permission`
  - Updates bucket permission field.
- `POST /api/buckets/[slug]/upload`
  - Multipart upload creates media record and file on disk.
- `POST /api/buckets/[slug]/upload-signed`
  - Signed upload token + multipart upload creates media.
- `POST /api/buckets/add`
  - Creates bucket + credentials, writes folder on disk.
- `GET /api/buckets/lists`
  - Returns list including created bucket.

### Media
- `POST /api/media/copy`
  - Copies file across buckets/paths and creates new media record.
- `POST /api/media/delete`
  - Marks media as removed.
- `GET /api/media/lists`
  - Lists media records (UI header required).
- `POST /api/media/move`
  - Moves file and updates media record path/bucket.
- `GET /api/media/properties`
  - Returns media details by slug.

### Roles & Permissions
- `GET /api/roles/[slug]`
  - Returns role details by slug.
- `POST /api/roles/add`
  - Creates role and default role permissions for all modules.
- `GET /api/roles/lists`
  - Lists roles including permissions and users.
- `GET /api/roles/permissions/[slug]`
  - Lists permissions for the role.
- `PATCH /api/roles/permissions/update/[slug]`
  - Updates permission flags for modules.
- `POST /api/roles/permissions/clone/[id]/permissions`
  - Clones permissions from another role.
- `PATCH /api/roles/update/[slug]`
  - Updates role name/description.
- `POST /api/permissions/add`
  - Creates permission module + default role permissions.
- `GET /api/permissions/lists`
  - Lists permission modules (UI header required).

### Spaces (Folders)
- `GET /api/spaces/folders/[slug]`
  - Returns folder by slug.
- `POST /api/spaces/folders/add`
  - Creates a folder (space) record.
- `POST /api/spaces/folders/delete`
  - Marks folder tree as removed (DB + filesystem).
- `GET /api/spaces/folders/lists`
  - Lists folders/files under a parent (UI header required).
- `POST /api/spaces/folders/move`
  - Updates parentId for folder move.
- `GET /api/spaces/folders/properties`
  - Returns folder stats (size, counts).
- `POST /api/spaces/folders/rename`
  - Renames folder and updates filesystem path.

### Users
- `GET /api/users/[slug]`
  - Returns user detail with signed profile URL when possible.
- `POST /api/users/add`
  - Creates user with hashed password.
- `PATCH /api/users/assign-role/[slug]/role`
  - Assigns roleId to user.
- `GET /api/users/lists`
  - Lists users (UI header required).
- `PATCH /api/users/reset-password/[slug]/reset`
  - Updates password hash.
- `PATCH /api/users/status/[slug]`
  - Toggles `isActive`.
- `PATCH /api/users/update/[slug]`
  - Updates profile fields with validation.

### Docs & Multiple Upload
- `GET /api/docs/json`
  - Requires auth; returns OpenAPI spec.
- `POST /api/multiple-upload/upload`
  - Multipart upload creates bucket (if missing) and media.

## Generated Registry Scripts

- `npm run api:routes` prints all API routes and methods.
- `npm run api:cases:gen` regenerates `tests/api/api-cases.generated.ts`.
- `npm run api:missing` lists routes missing an implemented test case.
