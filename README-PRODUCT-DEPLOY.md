# Production Deployment Guide

This project is a Next.js 16 + Prisma admin/UIs + API stack managing buckets, signed URLs, and media with VirusTotal scans. Deploy it to CapRover (or any Node server + MariaDB/Postgres) by following the sections below.

## 1. Architecture overview
- **Web app** (`npm run build` → `npm start`) serves `/api/*` routes, `/admin` UI, auth, uploads, and the external S3-like APIs.
- **Virus scan worker** (`npm run virus:worker`) is a separate Node process that polls `media_scan_jobs`, touches VirusTotal, and updates `Media` records.
- Both processes share the same database and environment variables.

## 2. Infrastructure requirements
- **Node.js ≥ 18** (CapRover Node 18 preset is safe).
- **MariaDB/MySQL** reachable by the app via `DATABASE_URL`.
- **Persistent storage** (`STORAGE_ROOT`) available for uploaded files and VirusTotal quarantine.
- **Domain/URL**: configure CapRover routes so the app is reachable at `https://{your-app}.caprover.mycompany.com`.

## 3. Environment variables
Set these in CapRover’s dashboard (or your deployment system):

- `DATABASE_URL`: Prisma database connection (include username/password/host).
- `JWT_SECRET`: Signing secret for session cookies.
- `SIGNING_SECRET`: HMAC key for signed URLs.
- `VIRUSTOTAL_API_KEY`: Required if you use VirusTotal. If missing, set `VIRUSTOTAL_REQUIRED=false`.
- `STORAGE_ROOT`: Absolute path to the storage folder on the server (default `storage` in repo). Make sure CapRover mounts a persistent volume there.
- `STORAGE_PUBLIC_BASE_URL`: Public base URL for storage assets (e.g., `https://cdn.yourdomain.com/storage`).
- `MAX_UPLOAD_BYTES`: Optional override for file-size limit.
- `VIRUSTOTAL_MAX_POLLS`, `VIRUSTOTAL_POLL_MS`, `VIRUSTOTAL_TIMEOUT_MS`: Tune polling window/timeouts.
- `VIRUSTOTAL_JOB_RETRY_DELAY_MS`: Delay before retrying timed-out scans (default 60s).
- `VIRUSTOTAL_REQUIRED`: `true` if scans must always run; otherwise `false`.
- `NODE_ENV`: `production`.
- `API_KEY_TIMESTAMP_DRIFT_MS`: Optional skew allowance for the HMAC flow.
- `STORAGE_PUBLIC_BASE_URL`: ensures URLs use your domain (fallback is `http://localhost:3000/storage`).

If you need encrypted secrets for API keys, CapRover lets you set them per-app.

## 4. Storage and uploads
- The app writes uploads to `STORAGE_ROOT/{bucket}`; ensure that folder is writable by both the Next.js process and the VirusTotal worker.
- For production, map CapRover volumes to the `storage/` folder inside the container (or set `STORAGE_ROOT` to a mounted path).
- `STORAGE_PUBLIC_BASE_URL` should point to the CDN/origin used by your clients (`https://assets.yourdomain.com/storage`). Uploaded media URLs use that base plus the bucket/path.

## 5. VirusTotal worker
- Run `npm run virus:worker` as a separate CapRover app/job so scans run continuously. It connects to the same database and shares secrets.
- Make sure outbound HTTPS can reach `www.virustotal.com`. If scans time out, the job now re-queues automatically (backoff via `VIRUSTOTAL_JOB_RETRY_DELAY_MS`).
- You may wish to scale the worker horizontally—jobs use `lockedAt`/`attempts` to avoid duplicates.

## 6. External API/key management
- `/admin/apis/lists` lets admins create bucket-specific keys (`accessKeyId` + `secretAccessKey`).
- External clients hit `/api/external/upload`, `/api/external/create-folder`, or `/api/external/download`.
- These endpoints accept either:
  - HMAC headers (`x-api-key`, `x-api-signature`, `x-api-timestamp`, `x-api-body-hash`), or
  - Simple headers (`x-access-key`, `x-secret-key`, `x-bucket-slug`).
- Provide the external app with the access key/secret, bucket slug, and the public endpoint (your CapRover domain). They do not need a session cookie.

## 7. Deployment steps
1. Push the repo to your GitHub and connect CapRover (or build manually).
2. In CapRover:
   - Create a **web app** for the Next.js server. Set build command `npm run build`, start command `npm run start`.
   - Set the env vars listed above.
   - Add a persistent storage volume for `STORAGE_ROOT` and ensure backups if needed.
3. Create a second CapRover app/service (or background process) for the virus worker: command `npm run virus:worker`.
4. Run Prisma migrations: use `npx prisma migrate deploy` or `npm run db:migrate` before starting the apps.
5. Seed the database (`npm run db:seed`) to create default roles, permissions, and admin users.

## 8. Security & monitoring
- CapRover exposes logs per app; monitor the worker and web app logs for VirusTotal errors or auth failures.
- Audit logs are stored in the `audit_log` table; you can watch `/api/dashboard/activity`.
- Rate limiting: login attempts stored in `login_attempts` table; the external API also rate-limits via `enforceRateLimit`.
- Ensure HTTPS to prevent leaking auth cookies or secret headers.

## 9. Optional enhancements
- Front your `storage` folder with a CDN or dedicated static file server and set `STORAGE_PUBLIC_BASE_URL` accordingly.
- If you expect high throughput, run multiple virus worker replicas and tune `VIRUSTOTAL_JOB_RETRY_DELAY_MS`.
- For large uploads, consider using signed URLs or chunked uploads on the client side.

## 10. CapRover tips
- Use CapRover’s “one-click app” for Node.js or Dockerfile deployment.
- Add a custom domain and SSL certificate via CapRover’s dashboard.
- Set the worker app `HTTP_PORT` to a non-HTTP port if it’s background-only (doesn’t need to expose HTTP).

With this configuration the stack should operate reliably in production. Let me know if you want a Helm/chart or a CapRover template. 
