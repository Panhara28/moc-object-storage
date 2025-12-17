"use client";

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import MediaFilters from "@/components/media-library/media-filters";
import MediaCreateFolderDialog from "./MediaCreateFolderDialog";
import MediaViewDrawer from "./MediaViewDrawer";
import MediaFileGrid from "./MediaFileGrid";
import MediaFolderGrid from "./MediaFolderGrid";
import MediaUploadButton from "./MediaUploadButton";
import MediaBreadcrumb from "./MediaBreadcrumb";
import { ApiResponse, MediaItem } from "@/app/types/media";
import MediaRenameFolderDialog from "./MediaRenameFolderDialog";
import MediaDeleteFolderDialog from "./MediaDeleteFolderDialog";
import MediaFolderPropertiesDrawer from "./MediaFolderPropertiesDrawer";
import MediaMoveFolderDialog from "./MediaMoveFolderDialog";

const ITEMS_PER_PAGE = 12;

type State = {
  selectedFilter: string;
  currentPage: number;
};

type Action =
  | { type: "SET_FILTER"; filter: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "RESET_PAGE" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, selectedFilter: action.filter, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "RESET_PAGE":
      return { ...state, currentPage: 1 };
    default:
      return state;
  }
}

type AdminMediaLibraryUploadScreenProps = {
  selectedBookCover?: boolean;
  setSelectedBookCover?: (media: MediaItem) => void;

  selectedBook?: boolean;
  setSelectedBook?: (media: MediaItem) => void;
  bucketSlug: string;
};

export default function AdminMediaLibraryUploadScreen({
  selectedBook,
  selectedBookCover,
  setSelectedBook,
  setSelectedBookCover,
  bucketSlug,
}: AdminMediaLibraryUploadScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, {
    selectedFilter: "all",
    currentPage: 1,
  });
  const currentParentSlug = searchParams.get("parentSlug");

  /* STATES */
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState<MediaItem | null>(null);
  const [moveOpen, setMoveOpen] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  /* FETCH FOLDERS */
  const loadSpaces = useCallback(
    async (parentSlug: string | null) => {
      setLoading(true);
      const url = parentSlug
        ? `/api/buckets/${bucketSlug}/folder?parentSlug=${parentSlug}`
        : `/api/buckets/${bucketSlug}`;

      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      setItems(json.folders);
      setLoading(false);
    },
    [bucketSlug]
  );

  /* FETCH ROOT MEDIA (Non-folder files) */
  const loadMedia = useCallback(
    async (parentSlug: string | null) => {
      const url = parentSlug
        ? `/api/buckets/${bucketSlug}/folder?parentSlug=${parentSlug}`
        : `/api/buckets/${bucketSlug}`;

      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      setMedias(json.media.items ?? []);
    },
    [bucketSlug]
  );

  const refreshData = useCallback(async () => {
    await Promise.all([loadSpaces(currentParentSlug), loadMedia(currentParentSlug)]);
  }, [currentParentSlug, loadMedia, loadSpaces]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAll = async () => {
      await refreshData();
    };

    fetchAll().catch(() => {});

    return () => controller.abort();
  }, [currentParentSlug, refreshData]);

  /* FILTER */
  const filteredItems = useMemo(() => {
    if (selectedFilter === "all") return items;
    return items.filter((i) => i.type === selectedFilter);
  }, [selectedFilter, items]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* UPLOAD HANDLER */
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const fileArray = Array.from(files) as File[];
    const formData = new FormData();
    if (currentParentSlug) {
      formData.append("parentSlug", currentParentSlug);
      formData.append("folderSlug", currentParentSlug);
    }

    fileArray.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch(`/api/buckets/${bucketSlug}/upload`, {
      method: "POST",
      body: formData, // browser sets multipart boundary; do not override Content-Type
    });

    const jsonResponse = await res.json();

    // Optionally, refresh the media and folder data after uploading
    await Promise.all([
      loadSpaces(currentParentSlug),
      loadMedia(currentParentSlug),
    ]);

    // Clear the file input
    event.target.value = "";
  };

  /* OPEN MEDIA DRAWER */
  const openMedia = (media: MediaItem) => {
    setSelectedMedia(media);
    setDrawerOpen(true);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Media Library</h1>

          <MediaBreadcrumb
            parentSlug={currentParentSlug}
            bucketSlug={bucketSlug}
          />
        </div>

        <div className="flex gap-2">
          <MediaUploadButton
            inputRef={uploadInputRef}
            onUpload={handleUpload}
          />

          <Button
            variant="outline"
            onClick={() => setCreateFolderDialogOpen(true)}
          >
            Create Folder
          </Button>
        </div>
      </div>

      {/* MAIN CARD */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <div className="py-2">
          <MediaFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            itemCount={filteredItems.length}
          />

          {loading ? (
            <div className="py-16 text-center">Loading...</div>
          ) : (
            <>
              {/* FOLDERS */}
              <h1 className="text-xl font-bold mt-4">Folders</h1>
              <hr className="border-gray-200 mb-3" />

              <MediaFolderGrid
                items={currentItems}
                onOpenFolder={(folder: MediaItem) =>
                  router.push(
                    `/admin/buckets/${bucketSlug}/media-library?parentSlug=${folder.slug}`
                  )
                }
                onRenameFolder={(folder: MediaItem) => {
                  setActiveFolder(folder);
                  setRenameOpen(true);
                }}
                onDeleteFolder={(folder: MediaItem) => {
                  setActiveFolder(folder);
                  setDeleteOpen(true);
                }}
                onFolderProps={(folder: MediaItem) => {
                  setActiveFolder(folder);
                  setPropsOpen(true);
                }}
                // onMoveFolder={(folder) => {
                //   setActiveFolder(folder);
                //   setMoveOpen(true);
                // }}
              />

              {/* FILES inside folder */}
              {currentParentSlug && (
                <>
                  <h1 className="text-xl font-bold mt-8">Files</h1>
                  <hr className="border-gray-200 mb-3" />

                  <MediaFileGrid items={medias} onOpenMedia={openMedia} />
                </>
              )}

              {/* ROOT MEDIA FILES */}
              {!currentParentSlug && (
                <>
                  <h1 className="text-xl font-bold mt-8">Medias</h1>
                  <hr className="border-gray-200 mb-3" />

                  <MediaFileGrid
                    selectedBook={selectedBook}
                    setSelectedBook={setSelectedBook}
                    selectedBookCover={selectedBookCover}
                    setSelectedBookCover={setSelectedBookCover}
                    items={medias}
                    onOpenMedia={openMedia}
                    isRoot
                  />
                </>
              )}
            </>
          )}
        </div>
      </Card>

      {/* CREATE FOLDER */}
      <MediaCreateFolderDialog
        open={createFolderDialogOpen}
        onOpenChange={setCreateFolderDialogOpen}
        parentSlug={currentParentSlug}
        onCreated={() => loadSpaces(currentParentSlug)}
        bucketSlug={bucketSlug}
      />

      {/* MEDIA PREVIEW DRAWER */}
      <MediaViewDrawer
        open={drawerOpen}
        media={selectedMedia}
        onClose={() => setDrawerOpen(false)}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        selectedBookCover={selectedBookCover}
        setSelectedBookCover={setSelectedBookCover}
      />

      <MediaRenameFolderDialog
        open={renameOpen}
        folder={activeFolder}
        onClose={() => setRenameOpen(false)}
        onRenamed={() => loadSpaces(currentParentSlug)}
      />

      <MediaDeleteFolderDialog
        open={deleteOpen}
        folder={activeFolder}
        onClose={() => setDeleteOpen(false)}
        onDeleted={refreshData}
        bucketSlug={bucketSlug}
      />

      <MediaFolderPropertiesDrawer
        open={propsOpen}
        folder={activeFolder}
        onClose={() => setPropsOpen(false)}
      />

      {/* <MediaMoveFolderDialog
        open={moveOpen}
        folder={activeFolder}
        onClose={() => setMoveOpen(false)}
        onMoved={() => loadSpaces(currentParentSlug)}
      /> */}
    </>
  );
}
