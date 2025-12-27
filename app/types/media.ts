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
  createdAt?: string;
  createdAtRaw?: string;
  updatedAt?: string;
  size?: number;
  width?: number | null;
  height?: number | null;
  mimetype?: string;
  extension?: string;
  scanStatus?: "PENDING" | "CLEAN" | "MALICIOUS" | "FAILED";
  scanMessage?: string | null;
}

export type MediaViewDrawerProps = {
  open: boolean;
  media: MediaItem | null;
  onClose: () => void;
  onDeleted?: () => void | Promise<void>;

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
  canReadFolder?: boolean;
  canUpdateFolder?: boolean;
  canDeleteFolder?: boolean;
};
