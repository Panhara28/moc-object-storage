"use client";

import { useState } from "react";
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

  const createFolder = async () => {
    if (!folderName.trim()) return;

    let parentId: number | undefined = undefined;

    if (parentSlug) {
      const res = await fetch(`/api/spaces/folders/${parentSlug}`);
      const json = await res.json();
      parentId = json?.data?.id;
    }

    await fetch(`/api/buckets/${bucketSlug}/create-folder/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: folderName.trim(), parentId }),
    });

    setFolderName("");
    onOpenChange(false);
    onCreated();
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
          <Button onClick={createFolder}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
