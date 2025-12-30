"use client";

import Image from "next/image";
import { FolderOpen, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MediaFolderGridProps } from "@/app/types/media";

export default function MediaGrid({
  items,
  onOpenFolder,
  onRenameFolder,
  onDeleteFolder,
  onFolderProps,
  onOpenMedia,
  onMoveFolder,
  canReadFolder,
  canUpdateFolder,
  canDeleteFolder,
}: MediaFolderGridProps) {
  const allowRead = canReadFolder !== false;
  const allowUpdate = canUpdateFolder !== false;
  const allowDelete = canDeleteFolder !== false;
  const showMenu = allowRead || allowUpdate || allowDelete;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-6 mb-8">
        {items.map((item) => {
          /* ------------------------------------------------------------------ */
          /* FOLDER CARD */
          /* ------------------------------------------------------------------ */
          return (
            <div key={item.id} className="flex flex-col">
              <div
                onClick={() => {
                  if (!allowRead) return;
                  onOpenFolder?.(item);
                }}
                className="
                    group relative aspect-square rounded-lg overflow-hidden 
                    bg-muted border border-gray-200 dark:border-gray-700 
                    shadow-sm hover:shadow-md transition-all duration-200 
                    cursor-pointer p-2
                  "
              >
                <div className="flex flex-col items-center justify-center h-full w-full bg-muted rounded-md">
                  <FolderOpen className="w-9 h-9 text-yellow-500" />
                </div>

                {/* ----------------------- MENU ----------------------- */}
                {showMenu && (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="
                        absolute top-2 right-2 bg-background/70 rounded-full p-1 
                        hover:bg-accent transition
                      "
                    >
                      <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="start"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      {allowRead && (
                        <DropdownMenuItem
                          onClick={() => onOpenFolder?.(item)}
                          className="cursor-pointer"
                        >
                          Open
                        </DropdownMenuItem>
                      )}

                      {allowUpdate && (
                        <DropdownMenuItem
                          onClick={() => onRenameFolder?.(item)}
                          className="cursor-pointer"
                        >
                          Rename
                        </DropdownMenuItem>
                      )}

                      {/* <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveFolder?.(item);
                        }}
                        className="cursor-pointer"
                      >
                        Move
                      </DropdownMenuItem> */}

                      {allowDelete && (
                        <DropdownMenuItem
                          className="text-red-500 cursor-pointer"
                          onClick={() => onDeleteFolder?.(item)}
                        >
                          Delete
                        </DropdownMenuItem>
                      )}

                      {allowRead && (
                        <DropdownMenuItem
                          onClick={() => onFolderProps?.(item)}
                          className="cursor-pointer"
                        >
                          Properties
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <p className="mt-2 text-sm font-medium text-center truncate">
                {item.name}
              </p>
            </div>
          );

          /* ------------------------------------------------------------------ */
          /* MEDIA CARD */
          /* ------------------------------------------------------------------ */

          return (
            <div key={item.id} className="flex flex-col">
              <div
                onClick={() => onOpenMedia?.(item)}
                className="
                  group relative aspect-square rounded-lg overflow-hidden 
                  bg-muted border border-gray-200 dark:border-gray-700 
                  shadow-sm hover:shadow-md transition-all duration-200 
                  cursor-pointer p-2
                "
              >
                <div className="relative w-full h-full rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {/* IMAGE */}
                  {item.type === "IMAGE" && typeof item.url === "string" && (
                    <Image
                      src={item.url as string}
                      alt={item.name}
                      fill
                      className="
                        object-cover rounded-md 
                        group-hover:scale-105 transition-transform duration-200
                      "
                    />
                  )}

                  {/* FILE ICONS */}
                  {item.type === "PDF" && (
                    <div className="flex items-center justify-center w-full h-full bg-red-100 text-red-600 font-bold text-lg">
                      PDF
                    </div>
                  )}

                  {item.type === "VIDEO" && (
                    <div className="flex items-center justify-center w-full h-full bg-black/30 text-white font-bold text-lg">
                      VIDEO
                    </div>
                  )}

                  {item.type === "DOCUMENT" && (
                    <div className="flex items-center justify-center w-full h-full bg-blue-100 text-blue-700 font-bold text-lg">
                      DOC
                    </div>
                  )}

                  {item.type === "AUDIO" && (
                    <div className="flex items-center justify-center w-full h-full bg-purple-100 text-purple-700 font-bold text-lg">
                      AUDIO
                    </div>
                  )}

                  {item.type === "OTHER" && (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-700 font-bold text-lg">
                      FILE
                    </div>
                  )}
                </div>

                {/* TYPE LABEL */}
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold uppercase">
                  {item.type}
                </div>
              </div>

              <p className="mt-2 text-sm font-medium text-center truncate">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
