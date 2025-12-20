"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { MediaItem } from "@/app/types/media";

type Props = {
  open: boolean;
  folder: MediaItem | null;
  onClose: () => void;
  onMoved: () => void;
};

type FolderNode = MediaItem & {
  children?: FolderNode[];
};

export default function MediaMoveFolderDialog({
  open,
  folder,
  onClose,
  onMoved,
}: Props) {
  const [tree, setTree] = useState<FolderNode[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);

  /* --------------------------------------------------------
   * 1. Load ALL FOLDERS ONLY (no media files)
   * -------------------------------------------------------- */
  const loadFolders = async () => {
    const res = await fetch("/api/spaces/folders/lists");
    const json = await res.json();

    const foldersOnly: FolderNode[] = json.data.filter(
      (f: MediaItem) => f.type === "folder"
    );

    const tree = buildTree(foldersOnly);
    setTree(tree);
  };

  /* --------------------------------------------------------
   * 2. Build nested folder tree
   * -------------------------------------------------------- */
  const buildTree = (list: FolderNode[]) => {
    const map = new Map<number, FolderNode>();

    list.forEach((f) => map.set(f.id, { ...f, children: [] }));

    const roots: FolderNode[] = [];

    list.forEach((folder) => {
      if (folder.parentId && map.has(folder.parentId)) {
        map.get(folder.parentId)!.children!.push(map.get(folder.id)!);
      } else {
        roots.push(map.get(folder.id)!);
      }
    });

    return roots;
  };

  useEffect(() => {
    if (open) loadFolders();
  }, [open]);

  /* --------------------------------------------------------
   * 3. Submit Move
   * -------------------------------------------------------- */
  const submit = async () => {
    if (!folder?.id || !selectedTarget) return;

    await fetch(`/api/spaces/folders/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folderId: folder.id,
        newParentId: selectedTarget,
      }),
    });

    onMoved();
    onClose();
  };

  /* --------------------------------------------------------
   * 4. Render folder tree recursively
   * -------------------------------------------------------- */
  const renderTree = (nodes: FolderNode[], depth = 0) => {
    return nodes.map((node) => {
      // Prevent moving into itself
      const disabled = node.id === folder?.id;

      return (
        <div key={node.id}>
          <div
            onClick={() => !disabled && setSelectedTarget(node.id)}
            className={`p-2 border border-border rounded my-1 cursor-pointer flex items-center text-sm ${
              disabled
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "hover:bg-muted/50"
            } ${
              selectedTarget === node.id
                ? "bg-accent text-accent-foreground border-primary"
                : ""
            }`}
            style={{ marginLeft: depth * 20 }}
          >
            📁 {node.name}
          </div>

          {/* Render children */}
          {node.children && renderTree(node.children, depth + 1)}
        </div>
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Move Folder</DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-sm text-muted-foreground mb-3">
            Select destination folder:
          </p>

          <div className="border border-border rounded p-3 max-h-60 overflow-y-auto">
            {tree.length > 0 ? (
              renderTree(tree)
            ) : (
              <p className="text-sm text-muted-foreground">
                No folders available
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!selectedTarget} onClick={submit}>
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
