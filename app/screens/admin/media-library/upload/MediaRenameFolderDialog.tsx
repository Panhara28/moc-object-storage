"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MediaItem } from "@/app/types/media";

type Props = {
  open: boolean;
  folder: MediaItem | null;
  onClose: () => void;
  onRenamed: () => void;
};

export default function MediaRenameFolderDialog({
  open,
  folder,
  onClose,
  onRenamed,
}: Props) {
  const [name, setName] = useState(() => folder?.name ?? "");

  // Sync the folder name when folder or dialog open state changes, deferring the update
  // to avoid calling setState synchronously inside the effect which can cause cascading renders.
  useEffect(() => {
    if (!folder) return;
    const t = setTimeout(() => {
      setName(folder.name);
    }, 0);
    return () => clearTimeout(t);
  }, [folder, open]);

  const submit = async () => {
    if (!folder?.id || !name) return;

    const res = await fetch(`/api/spaces/folders/rename`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderId: folder.id, name }),
    });

    if (!res.ok) {
      console.error("Failed to rename folder");
      return;
    }

    onRenamed();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
        </DialogHeader>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New folder name"
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Rename</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
