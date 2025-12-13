export type MediaType =
  | "IMAGE"
  | "VIDEO"
  | "PDF"
  | "DOCUMENT"
  | "AUDIO"
  | "OTHER"
  | "folder";

export interface MediaItem {
  id: number;
  name: string;
  filename?: string;
  url?: string;
  slug?: string;
  type: MediaType;
  parentId?: number | null;
}

export type MediaViewDrawerProps = {
  open: boolean;
  media: MediaItem | null;
  onClose: () => void;

  selectedBookCover?: boolean;
  setSelectedBookCover?: (media: MediaItem) => void;

  selectedBook?: boolean;
  setSelectedBook?: (media: MediaItem) => void;
};

export type ApiResponse<T> = { data: T; message?: string };

export type MediaFolderGridProps = {
  items: MediaItem[];
  onOpenFolder: (folder: MediaItem) => void;
  onOpenMedia?: (media: MediaItem) => void;
  onRenameFolder: (folder: MediaItem) => void;
  onDeleteFolder: (folder: MediaItem) => void;
  onFolderProps: (folder: MediaItem) => void;
  onMoveFolder?: (folder: MediaItem) => void;
};

export interface MediaItem {
  id: number;
  slug?: string;
  name: string;
  url?: string;
  type: "IMAGE" | "VIDEO" | "PDF" | "DOCUMENT" | "AUDIO" | "OTHER" | "folder";
}
