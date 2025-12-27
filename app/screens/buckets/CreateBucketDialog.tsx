"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* ---------------------------
   TYPE SAFE PROPS INTERFACE
----------------------------- */

interface CreateBucketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (bucket: {
    id: number;
    name: string;
    slug: string;
    permission: string;
  }) => void;
}

export default function CreateBucketDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateBucketDialogProps) {
  const [bucketName, setBucketName] = useState("");
  const [permission, setPermission] = useState("FULL_ACCESS");
  const [loading, setLoading] = useState(false);

  const createBucket = async () => {
    if (!bucketName.trim()) {
      alert("Bucket name required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/buckets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: bucketName,
        permission,
      }),
      });

      const data = await res.json();

      if (res.ok) {
        onOpenChange(false);
        onSuccess?.(data.bucket);
        setBucketName("");
      } else {
        alert(data.message || "Failed to create bucket");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating bucket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Bucket</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bucket Name */}
          <div className="space-y-2">
            <Label>Bucket Name</Label>
            <Input
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              placeholder="ex: panhara-drive"
            />
          </div>

          {/* Permission */}
          <div className="space-y-2">
            <Label>Permission</Label>
            <Select value={permission} onValueChange={setPermission}>
              <SelectTrigger>
                <SelectValue placeholder="Select Permission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="READ">Read Only</SelectItem>
                <SelectItem value="READ_WRITE">Read / Write</SelectItem>
                <SelectItem value="FULL_ACCESS">
                  Full Access (Read/Write/Delete)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={createBucket} disabled={loading}>
            {loading ? "Creating..." : "Create Bucket"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
