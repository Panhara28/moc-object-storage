"use client";

import Image from "next/image";
import { Trash } from "lucide-react";
import { MediaViewDrawerProps } from "@/app/types/media";

export default function MediaViewDrawer({
  open,
  media,
  onClose,
  selectedBookCover,
  setSelectedBookCover,
  selectedBook,
  setSelectedBook,
}: MediaViewDrawerProps) {
  if (!open) return null;

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

  return (
    <div className="fixed inset-0 z-[9998]">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div
        className="
          absolute right-0 top-0 
          w-[420px] h-full 
          bg-white shadow-xl
          animate-in slide-in-from-right 
          z-[9999]
          flex flex-col
        "
      >
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Media Details</h2>
          <p className="text-sm text-gray-500">Information about this file</p>
        </div>

        {media && (
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="relative w-full h-56 rounded-md overflow-hidden border bg-gray-100 flex items-center justify-center">
              {media.type === "IMAGE" && (
                <Image
                  src={media.url || ""}
                  alt={media.name}
                  fill
                  className="object-contain"
                />
              )}

              {media.type === "PDF" && (
                <div className="text-red-600 font-bold text-2xl">PDF</div>
              )}

              {media.type === "VIDEO" && (
                <div className="text-black font-bold text-xl">VIDEO</div>
              )}

              {media.type === "DOCUMENT" && (
                <div className="text-blue-600 font-bold text-xl">DOC</div>
              )}

              {media.type === "OTHER" && (
                <div className="text-gray-700 font-bold text-xl">FILE</div>
              )}
            </div>

            <p className="font-medium text-sm">Filename: {media.name}</p>
            <p className="font-medium text-sm">Type: {media.type}</p>
            <p className="font-medium text-sm">Size: 1TB</p>
            <p className="font-medium text-sm">Demension: 1000px * 2000px</p>

            <span
              className="text-blue-600 underline text-sm cursor-pointer"
              onClick={() => navigator.clipboard.writeText(media.url || "")}
            >
              Copy URL
            </span>
          </div>
        )}

        <div className="p-4 border-t border-gray-300">
          {/* Select Image button */}
          {selectedBookCover && media && (
            <button
              onClick={handleSelectBookCover}
              className="
                w-full flex items-center justify-center gap-2 
                bg-blue-600 hover:bg-blue-700 
                text-white py-2 rounded-md font-medium 
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
                bg-blue-600 hover:bg-blue-700 
                text-white py-2 rounded-md font-medium 
                transition mb-4
              "
            >
              <span className="font-medium">Select Image</span>
            </button>
          )}

          {/* Delete button */}
          <button
            onClick={() => console.log("DELETE MEDIA:", media?.id)}
            className="
              w-full flex items-center justify-center gap-2 
              bg-red-600 hover:bg-red-700 
              text-white py-2 rounded-md font-medium 
              transition
            "
          >
            <Trash className="w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
