"use client";

import { MediaItem } from "@/app/types/media";
import Image from "next/image";
import { useEffect, useState } from "react";

type MediaFileGridProps = {
  selectedBook?: boolean;
  setSelectedBook?: (media: MediaItem) => void; // ✔ FIXED

  selectedBookCover?: boolean;
  setSelectedBookCover?: (media: MediaItem) => void; // ✔ FIXED

  items: MediaItem[];
  onOpenMedia: (media: MediaItem) => void;
  isRoot?: boolean;
  bucketSlug: string;
};

export default function MediaFileGrid({
  items = [],
  onOpenMedia,
  selectedBookCover,
  setSelectedBookCover,
  bucketSlug,
}: MediaFileGridProps) {
  const [coverSelected, setCoverSelected] = useState<boolean | null>(null);
  const [selectedCoverId, setSelectedCoverId] = useState<MediaItem | unknown>(
    null
  );
  const [previewUrls, setPreviewUrls] = useState<Record<number, string>>({});
  const [loadedPreviews, setLoadedPreviews] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchSignedPreviewUrls = async () => {
      const imageItems = items.filter(
        (item) =>
          item.type === "IMAGE" &&
          item.slug &&
          (item.scanStatus === "CLEAN" || !item.scanStatus)
      );
      const missing = imageItems.filter((item) => !previewUrls[item.id]);
      if (!missing.length) return;

      const updates: Record<number, string> = {};

      for (const item of missing) {
        try {
          const res = await fetch(`/api/buckets/${bucketSlug}/signed-url`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-ui-request": "true",
            },
            body: JSON.stringify({
              action: "download",
              mediaSlug: item.slug,
              expiresInSeconds: 300,
            }),
            signal: controller.signal,
          });

          if (!res.ok) continue;
          const data = await res.json();
          if (!data?.url || typeof data.url !== "string") continue;

          const previewUrl = data.url.includes("?")
            ? `${data.url}&inline=true`
            : `${data.url}?inline=true`;

          updates[item.id] = previewUrl;
        } catch (err) {
          if (controller.signal.aborted) return;
          // Ignore failures for individual items; we can still render with fallback URL.
        }
      }

      if (Object.keys(updates).length) {
        setPreviewUrls((prev) => ({ ...prev, ...updates }));
      }
    };

    fetchSignedPreviewUrls();

    return () => controller.abort();
  }, [items, bucketSlug, previewUrls]);
  // Function to handle image selection
  const handleImageClick = (item: MediaItem) => {
    if (selectedBookCover) {
      setCoverSelected(true); // Set the selected image when clicked
      setSelectedCoverId(item.id);
    }
  };
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-6 mb-8">
      {items.map((item) => {
        const canPreview = item.scanStatus === "CLEAN" || !item.scanStatus;
        const imageSrc =
          previewUrls[item.id] || (canPreview ? item.url : undefined);

        return (
        <div key={item.id} className="flex flex-col">
          <div
            onClick={() => {
              // If in selection mode, select the image
              handleImageClick(item);
              // Optionally, open media (if needed)
              onOpenMedia(item);
            }}
            className={`
              group relative aspect-square rounded-lg overflow-hidden 
              bg-muted border border-gray-200 shadow-sm hover:shadow-md 
               cursor-pointer p-2
              ${
                coverSelected && item.id === selectedCoverId
                  ? "border-3 !border-blue-500"
                  : ""
              }
            `}
          >
            <div className="relative w-full h-full flex items-center justify-center rounded-md overflow-hidden">
              {item.scanStatus === "PENDING" && (
                <div className="absolute left-2 top-2 z-10 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Scanning
                </div>
              )}
              {item.scanStatus === "FAILED" && (
                <div className="absolute left-2 top-2 z-10 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Scan failed
                </div>
              )}
              {item.type === "IMAGE" && imageSrc && (
                <>
                  <Image
                    src={imageSrc}
                    alt={item.filename || item.name}
                    fill
                    className={`object-cover transition-opacity ${
                      loadedPreviews[item.id] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoadingComplete={() =>
                      setLoadedPreviews((prev) => ({
                        ...prev,
                        [item.id]: true,
                      }))
                    }
                  />
                  {!loadedPreviews[item.id] && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted/70 to-muted/40" />
                  )}
                </>
              )}

              {item.type === "IMAGE" && !imageSrc && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted/70 to-muted/40" />
              )}

              {item.type === "PDF" && (
                <div className="text-red-600 font-bold">PDF</div>
              )}

              {item.type === "VIDEO" && (
                <div className="text-black font-bold">VIDEO</div>
              )}

              {item.type === "DOCUMENT" && (
                <div className="text-blue-600 font-bold">DOC</div>
              )}

              {item.type === "OTHER" && (
                <div className="text-gray-800 font-bold">FILE</div>
              )}
            </div>
          </div>

          <p className="mt-2 text-sm font-medium text-center truncate">
            {item.filename || item.name}
          </p>
        </div>
        );
      })}
    </section>
  );
}
