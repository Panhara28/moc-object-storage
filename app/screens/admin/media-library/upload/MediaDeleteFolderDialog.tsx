"use client";

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
  onDeleted: () => void;
  bucketSlug: string;
};

export default function MediaDeleteFolderDialog({
  open,
  folder,
  onClose,
  onDeleted,
  bucketSlug,
}: Props) {
  // Handle folder deletion
  const remove = async () => {
    if (!folder?.id) return;

    try {
      const res = await fetch(`/api/spaces/folders/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderId: folder.id }),
      });

      if (!res.ok) {
        // Handle error if needed (you can show a notification here)
        console.error("Error deleting folder");
        return;
      }

      // Call the callback to refresh UI and close the dialog
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting folder:", error);
      // Handle error
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Delete Folder</DialogTitle>
        </DialogHeader>

        <p>
          Are you sure you want to delete <strong>{folder?.name}</strong>?
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-red-600 text-white" onClick={remove}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
