"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MediaCreateFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentSlug: string | null;
  onCreated: () => void;
  bucketSlug: string;
};

export default function MediaCreateFolderDialog({
  open,
  onOpenChange,
  parentSlug,
  onCreated,
  bucketSlug,
}: MediaCreateFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const isCreatingRef = useRef(false);

  const createFolder = async () => {
    if (!folderName.trim() || isCreatingRef.current) return;
    isCreatingRef.current = true;
    setIsCreating(true);

    try {
      let parentId: number | undefined = undefined;

      if (parentSlug) {
        const res = await fetch(`/api/spaces/folders/${parentSlug}`);
        const json = await res.json();
        parentId = json?.data?.id;
      }

      const res = await fetch(`/api/buckets/${bucketSlug}/create-folder/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName.trim(), parentId }),
      });

      if (!res.ok) {
        return;
      }

      setFolderName("");
      onOpenChange(false);
      onCreated();
    } finally {
      isCreatingRef.current = false;
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>

        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder Name"
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={createFolder}
            disabled={isCreating || !folderName.trim()}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
