# Security Notes

This document summarizes the current security posture and the guardrails implemented in this project. It is intended as a quick reference for developers adding new endpoints or modifying existing behavior.

## Summary

- Auth uses JWT session cookies with server-side verification.
- Authorization uses role/module permissions via `authorize()`.
- Signed URLs are HMAC-protected and TTL-capped.
- Upload validation verifies file signatures, not just client-provided MIME or extensions.
- Error responses avoid leaking internal stack/config details.
- List/detail APIs are owner-scoped for buckets, media, spaces, roles, users, and assign-role.
- Login rate limiting is shared across instances via DB state.

## Authentication

- Session cookies: `session` cookie is `httpOnly`, `sameSite=strict`, and `secure` in production.
- JWT verification: `lib/auth.ts` verifies tokens and loads user with role + permissions.
- Disabled users: deactivated accounts are blocked at auth lookup.

## Authorization

- `authorize(req, module, action)` enforces role/module permissions.
- Most list/detail endpoints now require both permissions and ownership checks.

## Owner-Scoped APIs (Current)

These endpoints require permission and restrict data to the owner:

- Buckets: `GET /api/buckets/lists`, `GET /api/buckets/[slug]`, `GET /api/buckets/[slug]/media`, `GET /api/buckets/[slug]/folder`, `GET /api/buckets/[slug]/stats`
- Media: `GET /api/media/lists`, `GET /api/media/properties`
- Spaces: `GET /api/spaces/folders/lists`, `GET /api/spaces/folders/[slug]`, `GET /api/spaces/folders/properties`
- Roles & permissions: `GET /api/roles/lists`, `GET /api/roles/[slug]`, `GET /api/roles/permissions/[slug]`, `GET /api/permissions/lists`
- Users: `GET /api/users/lists`, `GET /api/users/[slug]`
- Assign-role: `GET /api/assign-role/lists/[slug]`

If you want admin overrides (view all), add explicit checks based on role/permission.

## Signed URLs

- Tokens include action, bucket, file identifiers, and `exp`.
- TTL is capped by `MAX_SIGNED_URL_TTL_SECONDS` (default 3600).
- Verification avoids `timingSafeEqual` length exceptions.

## Upload Validation

- Server reads file buffer and validates magic headers/signatures.
- Client-provided MIME/extension are not trusted alone.
- Supported: png, jpg/jpeg, gif, webp, pdf, mp3, mp4, wav, ogg, flac, doc/docx, xls/xlsx, ppt/pptx, txt.
- Unknown signatures are rejected with 400.

## VirusTotal Scanning (Async Quarantine)

- Uploads are stored in a quarantined state first:
  - `Media.isVisibility = DRAFTED`
  - `Media.isAccessible = RESTRICTED`
  - `Media.scanStatus = PENDING`
- A background scan runs after upload:
  - CLEAN → `AVAILABLE/PRIVATE`
  - MALICIOUS → `REMOVE/RESTRICTED` and the file is deleted from storage
  - FAILED → remains quarantined; `scanStatus = FAILED`
- API responses include `scanStatus` on upload and in media properties.

## VirusTotal Scan Caching

- The SHA‑256 hash is stored as `scanHash`.
- If a previous media record with the same hash is CLEAN or MALICIOUS, the result is reused and VirusTotal is not called again.

## Scan Status Fields

`Media` includes:
- `scanStatus` (PENDING | CLEAN | MALICIOUS | FAILED)
- `scanMessage` (optional reason)
- `scanHash` (SHA‑256)
- `scannedAt` (timestamp)

## UI Notification Pattern

Recommended flow:
- Upload returns `scanStatus: PENDING`
- UI polls `GET /api/media/properties?slug=...` every ~2s
- If `scanStatus === MALICIOUS`, show a destructive toast and hide the item
- If `scanStatus === CLEAN`, refresh the list

## Rate Limiting (Login)

- Login attempts are tracked in DB (`login_attempts`) and shared across instances.
- Default: 5 attempts per 5 minutes per IP+email.
- Auto-creates the table on first use if missing.

## Error Handling

- 500 responses return generic errors; internal details are logged only.
- Avoid sending `err.message` or stack traces to clients.

## Secrets & Environment

Required:
- `JWT_SECRET`
- `SIGNING_SECRET` (for signed URLs)
- `VIRUSTOTAL_API_KEY` (VirusTotal scans)

Optional:
- `MAX_SIGNED_URL_TTL_SECONDS`
- `MAX_UPLOAD_BYTES`
- `STORAGE_ROOT`
- `STORAGE_PUBLIC_BASE_URL`
- `VIRUSTOTAL_REQUIRED` (set to `true` to treat missing API key as failure)
- `VIRUSTOTAL_TIMEOUT_MS`
- `VIRUSTOTAL_POLL_MS`
- `VIRUSTOTAL_MAX_POLLS`

## Operational Notes (Cloudflare)

- IP-based rate limiting assumes traffic passes through Cloudflare.
- Best practice: restrict origin to Cloudflare IP ranges so spoofed `x-forwarded-for` headers are not trusted.

## Checklist for New Endpoints

- Require `authorize()` and check owner scope when returning user-owned data.
- Validate input and return 400 for bad payloads.
- Avoid returning raw error messages in 500 responses.
- For uploads: validate file signatures and enforce size/type allowlists.
- For signed URLs: cap TTL and verify payload fields.

## Testing

Security-sensitive behavior is covered by the API test suite, including:
- Auth/authorization enforcement
- Validation errors
- Signed URL behavior
- Upload validation
- Idempotency and read-only checks
