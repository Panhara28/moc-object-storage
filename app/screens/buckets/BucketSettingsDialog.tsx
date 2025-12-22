"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { EllipsisVertical, Key } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import type { BucketDetail } from "./BucketListsScreen"; // ✅ Import type

/* -------------------------------
   PROPS TYPE (fully typed)
-------------------------------- */
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bucket: BucketDetail | null; // <-- FIXED: no more any
  onUpdate?: (type: "permission" | "regen") => void;
}

export default function BucketSettingsDialog({
  open,
  onOpenChange,
  bucket,
  onUpdate,
}: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [editing, setEditing] = useState(false);
  const [permission, setPermission] = useState("");
  const [regeneratedKeys, setRegeneratedKeys] = useState<{
    accessKeyId: string;
    secretAccessKey: string;
  } | null>(null);
  const lastBucketSlug = useRef<string | null>(null);

  // Reset state when switching buckets
  useLayoutEffect(() => {
    if (!bucket) return;
    const slugChanged = lastBucketSlug.current !== bucket.slug;
    setPermission(bucket.permission);
    if (slugChanged) {
      setEditing(false);
      setRegeneratedKeys(null);
    }
    lastBucketSlug.current = bucket.slug;
  }, [bucket]);

  useEffect(() => {
    if (!open) {
      setEditing(false);
      setRegeneratedKeys(null);
    }
  }, [open]);

  if (!bucket) return null;

  /* -----------------------------------
      UPDATE PERMISSION
  ----------------------------------- */
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
          description: data.message || "Permission update failed.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Permission updated!",
        variant: "success",
      });

      setEditing(false);
      onUpdate?.("permission");
    } catch {
      toast({
        title: "Network Error",
        description: "Unable to update permission.",
        variant: "destructive",
      });
    }
  };

  /* -----------------------------------
      REGENERATE ACCESS KEY
  ----------------------------------- */
  const regenerateKey = async () => {
    try {
      const res = await fetch(
        `/api/buckets/${bucket.slug}/regenerate-access-key`,
        { method: "PATCH" }
      );

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Regeneration failed.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "New access key generated!",
        variant: "success",
      });

      setRegeneratedKeys({
        accessKeyId: data.bucket.accessKeyId,
        secretAccessKey: data.bucket.secretAccessKey,
      });

      onUpdate?.("regen");
    } catch {
      toast({
        title: "Network Error",
        description: "Unable to regenerate key.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>Access Keys for "{bucket.name}"</DialogTitle>
          <DialogDescription>
            Manage access keys and permissions for this bucket.
          </DialogDescription>
        </DialogHeader>

        {/* TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-56">Access Key Name</TableHead>
              <TableHead>Access Key ID</TableHead>
              <TableHead>Buckets</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-medium flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" />
                {bucket.name}
              </TableCell>

              <TableCell className="font-mono">
                {regeneratedKeys?.accessKeyId || bucket.accessKeyId}
              </TableCell>

              <TableCell className="text-blue-600 underline cursor-pointer">
                {bucket.name}
              </TableCell>

              {/* PERMISSION CELL */}
              <TableCell className="uppercase text-sm">
                {!editing ? (
                  bucket.permission
                ) : (
                  <Select value={permission} onValueChange={setPermission}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select permission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="READ">READ</SelectItem>
                      <SelectItem value="READ_WRITE">READ / WRITE</SelectItem>
                      <SelectItem value="FULL_ACCESS">FULL ACCESS</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>

              <TableCell>
                {new Date(bucket.createdAt).toLocaleString()}
              </TableCell>

              <TableCell>
                {!editing ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditing(true)}>
                        Edit Permission
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={regenerateKey}>
                        Regenerate Key
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={updatePermission}>
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>

            {/* SECRET KEY (ONE TIME DISPLAY) */}
            {regeneratedKeys?.secretAccessKey && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="p-3 border border-border rounded bg-muted/40">
                    <p className="font-medium text-foreground">
                      New Secret Key (copy & save — shown once):
                    </p>

                    <div
                      className="relative"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(
                          regeneratedKeys.secretAccessKey
                        );

                        // show temporary copied UI
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1200);
                      }}
                    >
                      <div className="font-mono bg-background p-2 border border-border rounded text-sm mt-2 break-all cursor-pointer hover:bg-muted/60 transition">
                        {regeneratedKeys.secretAccessKey}
                      </div>

                      {copied && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded border border-border text-foreground font-semibold text-sm animate-fadeOut">
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
