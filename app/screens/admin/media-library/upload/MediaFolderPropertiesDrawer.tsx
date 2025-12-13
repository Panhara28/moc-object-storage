"use client";

import type { MediaItem } from "@/app/types/media";

type Props = {
  open: boolean;
  folder: MediaItem | null;
  onClose: () => void;
};

export default function MediaFolderPropertiesDrawer({
  open,
  folder,
  onClose,
}: Props) {
  if (!open || !folder) return null;

  return (
    <div className="fixed inset-0 z-[9998]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 w-[420px] h-full bg-white shadow-xl p-4 flex flex-col">
        <h2 className="text-lg font-bold">Folder Properties</h2>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {folder.name}
          </p>
          <p>
            <strong>Slug:</strong> {folder.slug}
          </p>
          <p>
            <strong>Created:</strong> {folder.createdAt}
          </p>
          <p>
            <strong>Updated:</strong> {folder.updatedAt}
          </p>

          <p>
            <strong>Type:</strong> Folder
          </p>

          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="text-blue-600 underline"
          >
            Copy Folder URL
          </button>
        </div>
      </div>
    </div>
  );
}
