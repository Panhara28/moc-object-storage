"use client";

import { MediaFolderGridProps } from "@/app/types/media";
import MediaGrid from "@/components/media-library/media-grid";

export default function MediaFolderGrid({
  items = [],
  onOpenFolder,
  onDeleteFolder,
  onFolderProps,
  onRenameFolder,
  onMoveFolder,
}: MediaFolderGridProps) {
  return (
    <MediaGrid
      items={items}
      onOpenFolder={onOpenFolder}
      onDeleteFolder={onDeleteFolder}
      onFolderProps={onFolderProps}
      onRenameFolder={onRenameFolder}
      onMoveFolder={onMoveFolder}
    />
  );
}
