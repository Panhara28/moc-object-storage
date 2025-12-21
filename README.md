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

## Tests

Run `npm test`. API test coverage details are in `README-TEST.md`.
