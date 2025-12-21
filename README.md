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

## Database Scripts

- `npm run db:migrate` - apply Prisma migrations
- `npm run db:reset` - drop and recreate the database (data loss)
- `npm run db:seed` - seed sample data

## Security and Audit Logging

Security guardrails, rate limiting, upload validation, and audit logging
details live in `README-SECURITY.md`.

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
