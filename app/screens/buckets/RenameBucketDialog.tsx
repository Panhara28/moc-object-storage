"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bucket: { slug: string; name: string } | null;
  onSuccess?: () => void;
}

export default function RenameBucketDialog({
  open,
  onOpenChange,
  bucket,
  onSuccess,
}: Props) {
  const { toast } = useToast();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (bucket) setNewName(bucket.name);
  }, [bucket]);

  const renameBucket = async () => {
    if (!bucket) return;

    const res = await fetch(`/api/buckets/${bucket.slug}/rename`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: "Error",
        description: data.message || "Failed to rename bucket",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Bucket renamed successfully!",
      variant: "success",
    });

    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Rename Bucket</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new bucket name"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={renameBucket}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
