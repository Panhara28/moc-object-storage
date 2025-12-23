# MOC Object Storage (Next.js + Prisma)

Admin UI and API for bucket/media management with signed URLs, virus scanning,
and audit logging.

## Requirements

- Node.js >= 18
- MySQL/MariaDB configured via `DATABASE_URL`

## Setup

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Seeding now also creates the `api` permission module and an `API Manager` role (full CRUD) so you can immediately work with the API key manager UI.

## Database Scripts

- `npm run db:migrate` - apply Prisma migrations
- `npm run db:reset` - drop and recreate the database (data loss)
- `npm run db:seed` - seed sample data

## Security and Audit Logging

Security guardrails, rate limiting, upload validation, and audit logging
details live in `README-SECURITY.md`.

## API Key Management

- `/admin/apis/lists` exposes the Spaces API key manager (Generate Key → view bucket API keys) and is visible only when the signed-in role has the `api` module `read` permission.
- The page loads `/api/buckets/keys` and renders the current user’s keys with pagination; only UI requests from within the admin shell are accepted.
- Client-side access checks protect `/admin/apis/lists` (see `components/cmsfullform/auth-guard.tsx`), and `authorize(req, "buckets", "read")` gates the backend API.

## Client-Side Access Guard

Admin pages are wrapped with a client-side guard that:
- Fetches `/api/auth/me` to validate session and load permissions.
- Redirects to `/auth/login` if unauthorized.
- Blocks pages without the required module/action permission.

Note: this is UX-only. All real enforcement must still happen in API routes.

## Auth Profile Endpoints

- `GET /api/auth/me` returns a minimal session payload (user + role + permissions).
- `GET /api/auth/profile` returns the full profile (used by the Profile page).

## Dashboard Data Endpoints

- `GET /api/dashboard/stats` summary counts for the overview cards.
- `GET /api/dashboard/charts` time series + distribution charts.
- `GET /api/dashboard/activity` audit log stream (system/user activity).
- `GET /api/dashboard/recent-uploads` recent uploads + folder creation.

## Tests

Run `npm test`. API test coverage details are in `README-TEST.md`.
