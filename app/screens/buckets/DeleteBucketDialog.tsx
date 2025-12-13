"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bucket: { name: string; slug: string } | null;
  onSuccess: () => void;
}

export default function DeleteBucketDialog({
  open,
  onOpenChange,
  bucket,
  onSuccess,
}: Props) {
  const { toast } = useToast();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) setInput("");
  }, [open]);

  if (!bucket) return null;

  const confirmDelete = async () => {
    if (input !== bucket.name) {
      toast({
        title: "Bucket name incorrect",
        description: "Please type the exact bucket name to confirm.",
        variant: "destructive",
      });
      return;
    }

    const res = await fetch(`/api/buckets/${bucket.slug}/delete`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (!res.ok) {
      toast({
        title: "Failed to delete bucket",
        description: data.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bucket removed",
      description: `"${bucket.name}" is now marked as REMOVED.`,
      variant: "success",
    });

    onOpenChange(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Delete Bucket</DialogTitle>
          <DialogDescription>
            This action will mark the bucket as <strong>REMOVED</strong>.
            <br />
            To confirm, type the bucket name:
            <strong className="text-red-600"> {bucket.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Type bucket name to confirm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={confirmDelete}
            disabled={input !== bucket.name}
          >
            Delete Bucket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
