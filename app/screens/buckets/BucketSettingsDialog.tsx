"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { BucketDetail } from "./BucketListsScreen";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bucket: BucketDetail | null;
  onUpdate?: (type: "permission") => void;
}

export default function BucketSettingsDialog({
  open,
  onOpenChange,
  bucket,
  onUpdate,
}: Props) {
  const { toast } = useToast();
  const [permission, setPermission] = useState<BucketDetail["permission"]>("FULL_ACCESS");
  const [editingPermission, setEditingPermission] = useState(false);

  useEffect(() => {
    if (!bucket) return;
    setPermission(bucket.permission);
    setEditingPermission(false);
  }, [bucket]);

  if (!bucket) return null;

  const updatePermission = async () => {
    try {
      const res = await fetch(`/api/buckets/${bucket.slug}/update-permission`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permission }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Permission update failed",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success",
        description: "Bucket permission updated",
        variant: "success",
      });
      setEditingPermission(false);
      onUpdate?.("permission");
    } catch (error) {
      console.error("Update permission error:", error);
      toast({
        title: "Network Error",
        description: "Unable to update permission",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl space-y-6">
        <DialogHeader>
          <DialogTitle>Bucket Settings for “{bucket.name}”</DialogTitle>
        </DialogHeader>

        <section className="rounded border border-border p-4 space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold">Bucket Permission</p>
              <p className="text-xs text-muted-foreground">
                Controls the default permissions granted to API clients.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={permission}
                onValueChange={setPermission}
                disabled={!editingPermission}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Permission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="READ">Read Only</SelectItem>
                  <SelectItem value="READ_WRITE">Read / Write</SelectItem>
                  <SelectItem value="FULL_ACCESS">
                    Full Access (Read / Write / Delete)
                  </SelectItem>
                </SelectContent>
              </Select>
              {!editingPermission ? (
                <Button variant="outline" size="sm" onClick={() => setEditingPermission(true)}>
                  Edit Permission
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" onClick={updatePermission}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingPermission(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
