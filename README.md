## API Reference

All endpoints live under `/api`. Authentication uses the `session` cookie from `/api/auth/login`. Authorization is module-based (`media-library`, `roles`, `users`, `permissions`, etc.).

### Auth
- `POST /api/auth/login` — email/password login.
- `POST /api/auth/logout` — clear session.
- `GET /api/auth/me` — current user + permissions.

### Buckets (storage)
- `POST /api/buckets/add` — create bucket (generates access keys).
- `GET /api/buckets/lists` — list buckets with counts.
- `GET /api/buckets/[slug]` — bucket detail + media listing with filters.
- `GET /api/buckets/[slug]/media` — paginated media list (filters: `search`, `type`, `path`, `dateFrom`, `dateTo`).
- `GET /api/buckets/[slug]/folder` — list folders (optional `parentSlug`).
- `POST /api/buckets/[slug]/create-folder` — create folder in bucket.
- `PATCH /api/buckets/[slug]/rename` — rename bucket.
- `PATCH /api/buckets/[slug]/delete` — soft-delete bucket (`isAvailable = REMOVE`).
- `PATCH /api/buckets/[slug]/update-permission` — change bucket permission enum.
- `PATCH /api/buckets/[slug]/regenerate-access-key` — rotate access keys.
- `POST /api/buckets/[slug]/upload` — form-data upload.
- `POST /api/buckets/[slug]/signed-url` — generate signed download/upload URLs.
- `GET /api/buckets/[slug]/download?token=...` — signed download.
- `POST /api/buckets/[slug]/upload-signed?token=...` — signed upload (form-data `file`).
- `PATCH /api/buckets/[slug]/archive` — mark unavailable (block uploads).
- `PATCH /api/buckets/[slug]/restore` — make available again.
- `POST /api/buckets/[slug]/cleanup` — delete all media/spaces in bucket (body `{confirm:true,bucketSlug:"..."}`).
- `GET /api/buckets/[slug]/stats` — media count, total bytes, last upload.

### Media
- `GET /api/media/lists` — paginated media (filters: `search`, `type`, `path`, `dateFrom`, `dateTo`).
- `POST /api/media/move` — move media to another bucket/path. Body: `{mediaSlug,targetBucketSlug?,targetPath?}`.
- `POST /api/media/copy` — copy media to another bucket/path. Body: `{mediaSlug,targetBucketSlug?,targetPath?}`.
- `POST /api/multiple-upload/upload` — multi-file upload (form-data `files[]`, `bucket`, `folderSlug` optional).

### Spaces / Folders
- `GET /api/spaces/folders/lists` — list folders/files under parent (`parentSlug` optional).
- `POST /api/spaces/folders/add` — create folder (`name`, `bucketId`, optional `parentId`).
- `POST /api/spaces/folders/delete` — soft-delete folder (`folderId`).
- `POST /api/spaces/folders/rename` — rename folder (`folderId`, `name`).
- `POST /api/spaces/folders/move` — move folder (`folderId`, `newParentId`).

### Roles & Permissions
- `GET /api/roles/lists` — list roles with permissions/users.
- `POST /api/roles/add` — create role (adds default permissions).
- `PATCH /api/roles/update/[slug]` — update role name/description.
- `GET /api/roles/[slug]` — role detail.
- `GET /api/roles/permissions/[slug]` — permissions for role.
- `PATCH /api/roles/permissions/update/[slug]` — update permissions for role.
- `POST /api/roles/permissions/clone/[id]/permissions` — clone permissions from another role.
- `GET /api/assign-role/lists/[slug]` — users assigned to a role.
- `PATCH /api/assign-role/update/[slug]` — assign users to a role (array of user IDs).

### Users
- `GET /api/users/lists` — paginated users (filters: `search`, `role`, `status`).
- `POST /api/users/add` — create user.
- `GET /api/users/[slug]` — user detail.
- `PATCH /api/users/update/[slug]` — update user profile fields.
- `PATCH /api/users/status/[slug]` — enable/disable user.
- `PATCH /api/users/reset-password/[slug]/reset` — reset password.
- `PATCH /api/users/assign-role/[slug]/role` — set a user’s role.

### Permissions Modules
- `GET /api/permissions/lists` — list permission modules.
- `POST /api/permissions/add` — add permission module (auto-creates role_permission entries).

### Dev/Seed
- `POST /api/dev/seed` — full reset + seed (blocked in production; requires `SEED_SECRET` header).

## Environment
- `JWT_SECRET`, `SIGNING_SECRET` required for auth/signed URLs.
- `STORAGE_ROOT` (optional) storage base dir. Defaults to `./storage` on mac/win, `/mnt/storage` on linux.
- Production login cookie is `secure` when `NODE_ENV=production`.

## Testing
Run `npm run build` for type checks. Use `curl`/Postman against endpoints above; most routes require the session cookie set by `/api/auth/login` and correct module permissions.
