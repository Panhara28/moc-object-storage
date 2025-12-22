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
import MediaPagination from "@/components/media-library/media-pagination";
import MediaCreateFolderDialog from "./MediaCreateFolderDialog";
import MediaViewDrawer from "./MediaViewDrawer";
import MediaFileGrid from "./MediaFileGrid";
import MediaFolderGrid from "./MediaFolderGrid";
import MediaUploadButton from "./MediaUploadButton";
import MediaBreadcrumb from "./MediaBreadcrumb";
import MediaRenameFolderDialog from "./MediaRenameFolderDialog";
import MediaDeleteFolderDialog from "./MediaDeleteFolderDialog";
import MediaFolderPropertiesDrawer from "./MediaFolderPropertiesDrawer";
import { useToast } from "@/hooks/use-toast";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileText, FolderOpen } from "lucide-react";
import { MediaItem } from "@/app/types/media";

const ITEMS_PER_PAGE = 30;

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
  const { toast } = useToast();
  const [state, dispatch] = useReducer(reducer, {
    selectedFilter: "all",
    currentPage: 1,
  });
  const currentParentSlug = searchParams.get("parentSlug");

  /* STATES */
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [folderPage, setFolderPage] = useState(1);
  const [mediaPage, setMediaPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [createdAtSort, setCreatedAtSort] = useState("newest");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [canCreateMedia, setCanCreateMedia] = useState(false);
  const [canCreateFolder, setCanCreateFolder] = useState(false);
  const [canReadFolder, setCanReadFolder] = useState(false);
  const [canUpdateFolder, setCanUpdateFolder] = useState(false);
  const [canDeleteFolder, setCanDeleteFolder] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState<MediaItem | null>(null);
  const [moveOpen, setMoveOpen] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState({
    visible: false,
    percent: 0,
    uploadedBytes: 0,
    totalBytes: 0,
    totalFiles: 0,
    status: "idle" as "idle" | "uploading" | "processing" | "error",
    message: "",
  });

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
    await Promise.all([
      loadSpaces(currentParentSlug),
      loadMedia(currentParentSlug),
    ]);
  }, [currentParentSlug, loadMedia, loadSpaces]);

  const pollScanStatus = useCallback(
    async (slug: string, filename?: string) => {
      const maxAttempts = 12;
      const delayMs = 2000;

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const res = await fetch(`/api/media/properties?slug=${slug}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const body = await res.json();
        const status = body.media?.scanStatus as
          | "PENDING"
          | "CLEAN"
          | "MALICIOUS"
          | "FAILED"
          | undefined;
        const name = filename || body.media?.filename || "File";

        if (status === "MALICIOUS") {
          toast({
            title: "Upload blocked",
            description: `${name} was flagged as malicious.`,
            variant: "destructive",
            duration: 5000,
          });
          await refreshData();
          return;
        }

        if (status === "FAILED") {
          const description =
            body.media?.scanMessage ||
            `Scan failed for ${name}. The file will stay hidden.`;
          toast({
            title: "Virus scan failed",
            description,
            variant: "destructive",
            duration: 5000,
          });
          await refreshData();
          return;
        }

        if (status === "CLEAN") {
          await refreshData();
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    },
    [refreshData, toast]
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchAll = async () => {
      await refreshData();
    };

    fetchAll().catch(() => {});

    return () => controller.abort();
  }, [currentParentSlug, refreshData]);

  useEffect(() => {
    let active = true;
    const loadPermissions = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (active) {
            setCanCreateMedia(false);
            setCanCreateFolder(false);
          }
          return;
        }
        const data = await res.json();
        const perms = data?.user?.permissions || {};
        const mediaCreate = Boolean(perms?.["media-library"]?.create);
        const folderPerms = perms?.spaces || {};
        const folderCreate = Boolean(folderPerms.create);
        const folderRead = Boolean(folderPerms.read);
        const folderUpdate = Boolean(folderPerms.update);
        const folderDelete = Boolean(folderPerms.delete);
        if (active) {
          setCanCreateMedia(mediaCreate);
          setCanCreateFolder(folderCreate);
          setCanReadFolder(folderRead);
          setCanUpdateFolder(folderUpdate);
          setCanDeleteFolder(folderDelete);
        }
      } catch (error) {
        console.error("Failed to load media permissions:", error);
        if (active) {
          setCanCreateMedia(false);
          setCanCreateFolder(false);
          setCanReadFolder(false);
          setCanUpdateFolder(false);
          setCanDeleteFolder(false);
        }
      }
    };

    loadPermissions();
    return () => {
      active = false;
    };
  }, []);

  /* FILTER */
  const filteredItems = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const next = query
      ? items.filter((item) => item.name.toLowerCase().includes(query))
      : items.slice();
    const getCreatedAt = (item: MediaItem) => {
      const raw = item.createdAtRaw || item.createdAt;
      const time = raw ? new Date(raw).getTime() : 0;
      return Number.isNaN(time) ? 0 : time;
    };
    return next.sort((a, b) => {
      const diff = getCreatedAt(a) - getCreatedAt(b);
      return createdAtSort === "oldest" ? diff : -diff;
    });
  }, [createdAtSort, items, searchValue]);
  const filteredMedias = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const matchesSearch = (media: MediaItem) => {
      if (!query) return true;
      const name = (media.filename || media.name || "").toLowerCase();
      return name.includes(query);
    };
    if (selectedFilter === "all") return medias.filter(matchesSearch);
    if (selectedFilter === "image") {
      return medias.filter((m) => m.type === "IMAGE").filter(matchesSearch);
    }
    if (selectedFilter === "video") {
      return medias.filter((m) => m.type === "VIDEO").filter(matchesSearch);
    }
    if (selectedFilter === "document") {
      return medias
        .filter((m) => m.type === "DOCUMENT" || m.type === "PDF")
        .filter(matchesSearch);
    }
    return medias.filter(matchesSearch);
  }, [medias, searchValue, selectedFilter]);
  const sortedMedias = useMemo(() => {
    const getCreatedAt = (media: MediaItem) => {
      const raw = media.createdAtRaw || media.createdAt;
      const time = raw ? new Date(raw).getTime() : 0;
      return Number.isNaN(time) ? 0 : time;
    };
    const next = filteredMedias.slice();
    next.sort((a, b) => {
      const diff = getCreatedAt(a) - getCreatedAt(b);
      return createdAtSort === "oldest" ? diff : -diff;
    });
    return next;
  }, [createdAtSort, filteredMedias]);
  const showEmptyState = items.length === 0 && medias.length === 0;

  /* PAGINATION */
  const folderTotalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  );
  const currentItems = filteredItems.slice(
    (folderPage - 1) * ITEMS_PER_PAGE,
    folderPage * ITEMS_PER_PAGE
  );
  const mediaTotalPages = Math.max(
    1,
    Math.ceil(sortedMedias.length / ITEMS_PER_PAGE)
  );
  const pagedMedias = sortedMedias.slice(
    (mediaPage - 1) * ITEMS_PER_PAGE,
    mediaPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setFolderPage(1);
    setMediaPage(1);
  }, [createdAtSort, currentParentSlug, searchValue, selectedFilter]);

  useEffect(() => {
    if (folderPage > folderTotalPages) {
      setFolderPage(folderTotalPages);
    }
  }, [folderPage, folderTotalPages]);

  useEffect(() => {
    if (mediaPage > mediaTotalPages) {
      setMediaPage(mediaTotalPages);
    }
  }, [mediaPage, mediaTotalPages]);

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

    const totalBytes = fileArray.reduce((sum, file) => sum + file.size, 0);
    setUploadProgress({
      visible: true,
      percent: 0,
      uploadedBytes: 0,
      totalBytes,
      totalFiles: fileArray.length,
      status: "uploading",
      message: "",
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/buckets/${bucketSlug}/upload`, true);
    xhr.upload.onprogress = (evt) => {
      if (!evt.lengthComputable && totalBytes === 0) return;
      const loaded = evt.lengthComputable ? evt.loaded : evt.loaded;
      const percent = totalBytes
        ? Math.min(100, Math.round((loaded / totalBytes) * 100))
        : 0;
      setUploadProgress((prev) => ({
        ...prev,
        percent,
        uploadedBytes: loaded,
      }));
    };

    xhr.onload = async () => {
      let jsonResponse: {
        uploads?: { slug?: string; filename?: string }[];
        failures?: { filename?: string; reason?: string }[];
      } = {};
      try {
        jsonResponse = xhr.responseText ? JSON.parse(xhr.responseText) : {};
      } catch {}

      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress((prev) => ({
          ...prev,
          percent: 100,
          status: "processing",
          message: "Upload complete. Processing scans...",
        }));

        await Promise.all([
          loadSpaces(currentParentSlug),
          loadMedia(currentParentSlug),
        ]);

        const uploads = Array.isArray(jsonResponse.uploads)
          ? jsonResponse.uploads
          : [];
        uploads.forEach((upload) => {
          if (upload.slug) {
            void pollScanStatus(upload.slug, upload.filename);
          }
        });

        const failures = Array.isArray(jsonResponse.failures)
          ? jsonResponse.failures
          : [];
        if (failures.length) {
          const malicious = failures.filter((failure) =>
            (failure.reason || "").toLowerCase().includes("malicious")
          );
          const allNames = failures
            .map((failure) => failure.filename)
            .filter(Boolean)
            .join(", ");
          const maliciousNames = malicious
            .map((failure) => failure.filename)
            .filter(Boolean)
            .join(", ");
          if (malicious.length) {
            toast({
              title: "Malicious file rejected",
              description:
                maliciousNames ||
                "One or more files were rejected as malicious.",
              variant: "destructive",
              duration: 6000,
            });
          } else {
            toast({
              title: "Some files were rejected",
              description:
                allNames || "Some files could not be uploaded successfully.",
              variant: "destructive",
              duration: 6000,
            });
          }
        }

        setTimeout(() => {
          setUploadProgress((prev) => ({
            ...prev,
            visible: false,
            status: "idle",
            message: "",
          }));
        }, 5000);
      } else {
        setUploadProgress((prev) => ({
          ...prev,
          status: "error",
          message: "Upload failed. Please try again.",
        }));
        setTimeout(() => {
          setUploadProgress((prev) => ({
            ...prev,
            visible: false,
            status: "idle",
            message: "",
          }));
        }, 2000);
      }

      event.target.value = "";
    };

    xhr.onerror = () => {
      setUploadProgress((prev) => ({
        ...prev,
        status: "error",
        message: "Upload failed. Please try again.",
      }));
      setTimeout(() => {
        setUploadProgress((prev) => ({
          ...prev,
          visible: false,
          status: "idle",
          message: "",
        }));
      }, 2000);
      event.target.value = "";
    };

    xhr.send(formData);
  };

  /* OPEN MEDIA DRAWER */
  const openMedia = (media: MediaItem) => {
    setSelectedMedia(media);
    setDrawerOpen(true);
  };

  return (
    <>
      {uploadProgress.visible && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw] rounded-lg border border-border bg-background shadow-lg">
          <div className="px-4 pt-3 text-sm font-medium">
            Uploading {uploadProgress.totalFiles} file
            {uploadProgress.totalFiles === 1 ? "" : "s"}
          </div>
          <div className="px-4 pb-3 pt-2">
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className={`h-2 rounded-full transition-all ${
                  uploadProgress.status === "error"
                    ? "bg-red-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${uploadProgress.percent}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {uploadProgress.message || `${uploadProgress.percent}%`}
            </div>
          </div>
        </div>
      )}
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Media Library</h1>

          <MediaBreadcrumb
            parentSlug={currentParentSlug}
            bucketSlug={bucketSlug}
          />
        </div>

        {(canCreateMedia || canCreateFolder) && (
          <div className="flex gap-2">
            {canCreateMedia && (
              <MediaUploadButton
                inputRef={uploadInputRef}
                onUpload={handleUpload}
              />
            )}

            {canCreateFolder && (
              <Button
                variant="outline"
                onClick={() => setCreateFolderDialogOpen(true)}
              >
                Create Folder
              </Button>
            )}
          </div>
        )}
      </div>

      {/* MAIN CARD */}
      <Card>
        <div className="px-6 pt-10">
          <MediaFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            createdAtSort={createdAtSort}
            onCreatedAtSortChange={setCreatedAtSort}
          />

          {loading ? (
            <div className="py-16 text-center">Loading...</div>
          ) : showEmptyState ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderOpen className="size-5" />
                </EmptyMedia>
                <EmptyTitle>
                  {currentParentSlug
                    ? "This folder is empty"
                    : "This bucket is empty"}
                </EmptyTitle>
                <EmptyDescription>
                  {currentParentSlug
                    ? "Upload files or create a folder here."
                    : "Upload files or create a folder to get started."}
                </EmptyDescription>
              </EmptyHeader>
              {(canCreateMedia || canCreateFolder) && (
                <EmptyContent>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {canCreateMedia && (
                      <Button onClick={() => uploadInputRef.current?.click()}>
                        Upload Media
                      </Button>
                    )}
                    {canCreateFolder && (
                      <Button
                        variant="outline"
                        onClick={() => setCreateFolderDialogOpen(true)}
                      >
                        Create Folder
                      </Button>
                    )}
                  </div>
                </EmptyContent>
              )}
            </Empty>
          ) : (
            <>
              {/* FOLDERS */}
              {/* <h1 className="text-xl font-bold mt-4">Folders</h1>
              <hr className="border-border mb-3" /> */}

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
                canReadFolder={canReadFolder}
                canUpdateFolder={canUpdateFolder}
                canDeleteFolder={canDeleteFolder}
                // onMoveFolder={(folder) => {
                //   setActiveFolder(folder);
                //   setMoveOpen(true);
                // }}
              />
              {folderTotalPages > 1 && (
                <MediaPagination
                  currentPage={folderPage}
                  totalPages={folderTotalPages}
                  onPageChange={setFolderPage}
                />
              )}

              {/* FILES inside folder */}
              {currentParentSlug && (
                <>
                  {/* <h1 className="text-xl font-bold mt-8">Files</h1>
                  <hr className="border-border mb-3" /> */}

                  <MediaFileGrid
                    items={pagedMedias}
                    bucketSlug={bucketSlug}
                    onOpenMedia={openMedia}
                  />
                  {mediaTotalPages > 1 && (
                    <MediaPagination
                      currentPage={mediaPage}
                      totalPages={mediaTotalPages}
                      onPageChange={setMediaPage}
                    />
                  )}
                </>
              )}

              {/* ROOT MEDIA FILES */}
              {!currentParentSlug && (
                <>
                  {/* <h1 className="text-xl font-bold mt-8">Medias</h1>
                  <hr className="border-border mb-3" /> */}

                  <MediaFileGrid
                    selectedBook={selectedBook}
                    setSelectedBook={setSelectedBook}
                    selectedBookCover={selectedBookCover}
                    setSelectedBookCover={setSelectedBookCover}
                    bucketSlug={bucketSlug}
                    items={pagedMedias}
                    onOpenMedia={openMedia}
                    isRoot
                  />
                  {mediaTotalPages > 1 && (
                    <MediaPagination
                      currentPage={mediaPage}
                      totalPages={mediaTotalPages}
                      onPageChange={setMediaPage}
                    />
                  )}
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
        onClose={() => {
          setDrawerOpen(false);
          setSelectedMedia(null);
        }}
        onDeleted={async () => {
          await refreshData();
          setSelectedMedia(null);
        }}
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
        bucketSlug={bucketSlug}
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
