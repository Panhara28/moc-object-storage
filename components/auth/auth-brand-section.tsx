import { Space_Grotesk } from "next/font/google"

const brandFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export function AuthBrandSection() {
  const backgroundPattern =
    "data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.04'%3E%3Cpath d='M36 0v72M0 36h72'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"

  return (
    <div
      className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${brandFont.className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.3),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(14,116,144,0.25),transparent_45%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-12 py-16 text-white">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center">
              <span className="text-lg font-semibold tracking-wide">MOC</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200/80">
                MOC
              </p>
              <h1 className="text-3xl font-semibold">Object Storage</h1>
            </div>
          </div>

          <h2 className="mt-10 text-3xl font-semibold leading-tight">
            Secure storage, centralized.
          </h2>
          <p className="mt-4 text-lg text-slate-200/80 leading-relaxed">
            Manage buckets, uploads, and access keys with a single, trusted
            workspace.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200/70">
                Buckets
              </p>
              <p className="mt-2 text-2xl font-semibold">24+</p>
              <p className="text-xs text-slate-300/70">audited access</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-200/70">
                Media
              </p>
              <p className="mt-2 text-2xl font-semibold">10k+</p>
              <p className="text-xs text-slate-300/70">safe uploads</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm text-slate-200/80">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">
              Buckets
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Centralized controls
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">
              Analytics
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Usage visibility
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">
              Access
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Role-based policies
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">
              Security
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Signed URLs
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-blue-500/12 blur-3xl" />
      <div className="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-sky-500/12 blur-3xl" />
    </div>
  )
}
