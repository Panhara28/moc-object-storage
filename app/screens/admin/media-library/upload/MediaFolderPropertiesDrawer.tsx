"use client";

import { useEffect, useMemo, useState } from "react";
import type { MediaItem } from "@/app/types/media";

type Props = {
  open: boolean;
  folder: MediaItem | null;
  onClose: () => void;
  bucketSlug: string;
};

type FolderDetails = {
  id: number;
  slug: string;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  bucketSlug: string;
  bucketName: string;
  totalSize: number;
  mediaCount: number;
  folderCount: number;
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 10 ? 0 : 1)} ${sizes[i]}`;
}

export default function MediaFolderPropertiesDrawer({
  open,
  folder,
  onClose,
  bucketSlug,
}: Props) {
  const [details, setDetails] = useState<FolderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !folder?.slug) return;

    let cancelled = false;
    setLoading(true);
    setDetails(null);

    fetch(`/api/spaces/folders/properties?slug=${folder.slug}`, {
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to load folder properties");
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const f = data.folder;
        const s = data.stats;
        setDetails({
          id: f.id,
          slug: f.slug,
          name: f.name,
          createdAt: f.createdAt ?? null,
          updatedAt: f.updatedAt ?? null,
          bucketSlug: f.bucketSlug ?? bucketSlug,
          bucketName: f.bucketName ?? "",
          totalSize: s?.totalSize ?? 0,
          mediaCount: s?.mediaCount ?? 0,
          folderCount: s?.folderCount ?? 0,
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, folder?.id, bucketSlug]);

  const folderUrl = useMemo(() => {
    const slug = details?.slug || folder?.slug;
    const bSlug = details?.bucketSlug || bucketSlug;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (!slug) return origin ? window.location.href : "";
    return `${origin}/admin/buckets/${bSlug}/media-library?parentSlug=${slug}`;
  }, [details, folder?.slug, bucketSlug]);

  const created = details?.createdAt || folder?.createdAt || "N/A";
  const updated = details?.updatedAt || folder?.updatedAt || "N/A";

  const sizeLabel = details ? formatBytes(details.totalSize) : loading ? "..." : "N/A";

  if (!open || !folder) return null;

  return (
    <div className="fixed inset-0 z-[9998]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 w-[420px] h-full bg-white shadow-xl p-4 flex flex-col">
        <h2 className="text-lg font-bold">Folder Properties</h2>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {details?.name || folder.name}
          </p>
          <p>
            <strong>ID:</strong> {details?.slug || folder.slug || folder.id}
          </p>
          <p>
            <strong>Created:</strong> {created}
          </p>
          <p>
            <strong>Updated:</strong> {updated}
          </p>
          <p>
            <strong>Type:</strong> Folder
          </p>
          <p>
            <strong>Size:</strong> {sizeLabel}
          </p>
          <p>
            <strong>Items:</strong>{" "}
            {details
              ? `${details.mediaCount} file(s), ${details.folderCount} folder(s)`
              : loading
              ? "..."
              : "N/A"}
          </p>

          <button
            onClick={() => navigator.clipboard.writeText(folderUrl)}
            className="text-blue-600 underline"
          >
            Copy Folder URL
          </button>
        </div>
      </div>
    </div>
  );
}
