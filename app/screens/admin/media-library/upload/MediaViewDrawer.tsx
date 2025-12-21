"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";
import { MediaViewDrawerProps } from "@/app/types/media";
import { format as formatDateFns } from "date-fns";

type MediaDetails = {
  id: number;
  slug: string;
  filename: string;
  storedFilename: string;
  url: string;
  fileType: string;
  mimetype: string;
  extension: string;
  size: number;
  width?: number | null;
  height?: number | null;
  uploadedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  bucketSlug?: string;
  bucketName?: string;
};

function formatBytes(bytes?: number) {
  if (bytes == null) return "N/A";
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 10 ? 0 : 1)} ${sizes[i]}`;
}

function formatDate(input?: string | null) {
  if (!input) return "N/A";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "N/A";
  return formatDateFns(d, "dd/LLL/yyyy HH:mm");
}

export default function MediaViewDrawer({
  open,
  media,
  onClose,
  onDeleted,
  selectedBookCover,
  setSelectedBookCover,
  selectedBook,
  setSelectedBook,
}: MediaViewDrawerProps) {
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [canDeleteMedia, setCanDeleteMedia] = useState(false);

  useEffect(() => {
    if (!open || (!media?.slug && !media?.id)) return;

    let cancelled = false;
    setLoading(true);
    setDetails(null);

    const query = media?.slug ? `slug=${media.slug}` : `id=${media?.id}`;

    fetch(`/api/media/properties?${query}`, {
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load media");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setDetails(data.media);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, media?.slug]);

  useEffect(() => {
    let active = true;
    const loadPermissions = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (active) setCanDeleteMedia(false);
          return;
        }
        const data = await res.json();
        const perms = data?.user?.permissions || {};
        if (active) {
          setCanDeleteMedia(Boolean(perms?.["media-library"]?.delete));
        }
      } catch (error) {
        console.error("Failed to load media permissions:", error);
        if (active) setCanDeleteMedia(false);
      }
    };

    loadPermissions();
    return () => {
      active = false;
    };
  }, []);

  if (!open) return null;

  const name = details?.filename || media?.name || "Unknown";
  const url = details?.url || media?.url || "";
  const type = details?.fileType || media?.type;
  const sizeLabel = loading ? "..." : formatBytes(details?.size ?? (media as any)?.size);
  const dims =
    details?.width && details?.height
      ? `${details.width}px × ${details.height}px`
      : media && (media as any).width && (media as any).height
      ? `${(media as any).width}px × ${(media as any).height}px`
      : "N/A";
  const created = details?.createdAt
    ? formatDate(details.createdAt)
    : (media as any)?.createdAt
    ? formatDate((media as any).createdAt)
    : "N/A";
  const updated = details?.updatedAt
    ? formatDate(details.updatedAt)
    : (media as any)?.updatedAt
    ? formatDate((media as any).updatedAt)
    : "N/A";

  const handleSelectBookCover = () => {
    if (selectedBookCover && media) {
      setSelectedBookCover?.(media);
      onClose();
    }
  };

  const handleSelectBook = () => {
    if (selectedBook && media) {
      setSelectedBook?.(media);
      onClose();
    }
  };

  const copyUrl = () => {
    if (url) navigator.clipboard.writeText(url);
  };

  const handleDelete = async () => {
    if (!media?.slug && !media?.id) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/media/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: media?.slug,
          id: media?.id,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete media");
      if (onDeleted) {
        await onDeleted();
      }
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9998]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div
        className="
          absolute right-0 top-0
          h-full w-[420px]
          bg-background shadow-xl
          animate-in slide-in-from-right
          z-[9999]
          flex flex-col
          border-l border-border
        "
      >
        <div className="border-b border-border p-4">
          <h2 className="text-lg font-semibold">Media Details</h2>
          <p className="text-sm text-muted-foreground">
            Information about this file
          </p>
        </div>

        {media && (
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
              {type === "IMAGE" && url ? (
                <Image
                  src={url}
                  alt={name}
                  fill
                  className="object-contain"
                />
              ) : type === "PDF" ? (
                <div className="text-2xl font-bold text-red-600">PDF</div>
              ) : type === "VIDEO" ? (
                <div className="text-xl font-bold text-foreground">VIDEO</div>
              ) : type === "DOCUMENT" ? (
                <div className="text-blue-600 font-bold text-xl">DOC</div>
              ) : (
                <div className="text-xl font-bold text-muted-foreground">
                  FILE
                </div>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <p className="font-medium">Filename: {name}</p>
              <p className="font-medium">Type: {type}</p>
              <p className="font-medium">
                Size: <span className="font-normal">{sizeLabel}</span>
              </p>
              <p className="font-medium">
                Dimensions: <span className="font-normal">{dims}</span>
              </p>
              <p className="font-medium">
                MIME: <span className="font-normal">{details?.mimetype || "N/A"}</span>
              </p>
              <p className="font-medium">
                Extension: <span className="font-normal">{details?.extension || "N/A"}</span>
              </p>
              <p className="font-medium">
                Created: <span className="font-normal">{created}</span>
              </p>
              <p className="font-medium">
                Updated: <span className="font-normal">{updated}</span>
              </p>
            </div>

            <span
              className="cursor-pointer text-sm text-primary underline"
              onClick={copyUrl}
            >
              Copy URL
            </span>
          </div>
        )}

        <div className="border-t border-border p-4">
          {/* Select Image button */}
          {selectedBookCover && media && (
            <button
              onClick={handleSelectBookCover}
              className="
                w-full flex items-center justify-center gap-2
                bg-primary hover:bg-primary/90
                text-primary-foreground py-2 rounded-md font-medium
                transition mb-4
              "
            >
              <span className="font-medium">Select Image</span>
            </button>
          )}

          {/* Select Image button */}
          {selectedBook && media && (
            <button
              onClick={handleSelectBook}
              className="
                w-full flex items-center justify-center gap-2
                bg-primary hover:bg-primary/90
                text-primary-foreground py-2 rounded-md font-medium
                transition mb-4
              "
            >
              <span className="font-medium">Select Image</span>
            </button>
          )}

          {canDeleteMedia && (
            <button
              onClick={handleDelete}
              className="
                w-full flex items-center justify-center gap-2
                bg-destructive hover:bg-destructive/90
                text-destructive-foreground py-2 rounded-md font-medium
                transition
              "
              disabled={deleting}
            >
              <Trash className="w-4" />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
