"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

export interface BucketOption {
  slug: string;
  name: string;
}

interface GenerateKeyDialogProps {
  buckets: BucketOption[];
  loading: boolean;
  onKeyCreated?: () => void;
}

export function GenerateKeyDialog({
  buckets,
  loading,
  onKeyCreated,
}: GenerateKeyDialogProps) {
  const [open, setOpen] = useState(false);
  const [bucketSlug, setBucketSlug] = useState("");
  const [keyName, setKeyName] = useState("");
  const [creatingKey, setCreatingKey] = useState(false);
  const [secretPreview, setSecretPreview] = useState<{
    accessKeyId: string;
    secretAccessKey: string;
  } | null>(null);

  useEffect(() => {
    if (!bucketSlug && buckets.length > 0) {
      setBucketSlug(buckets[0].slug);
    }
  }, [bucketSlug, buckets]);

  useEffect(() => {
    if (!open) {
      setSecretPreview(null);
    }
  }, [open]);

  const canGenerate = Boolean(bucketSlug && buckets.length > 0 && !loading);

  const secretRows = secretPreview ? (
    <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
      <p className="text-sm font-semibold text-foreground">
        Secret for {secretPreview.accessKeyId} (copy now, shown once):
      </p>
      <div
        className="relative font-mono text-sm border border-border rounded bg-background p-2 overflow-auto cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(secretPreview.secretAccessKey);
          toast({ title: "Copied" });
        }}
      >
        {secretPreview.secretAccessKey}
      </div>
    </div>
  ) : null;

  const handleGenerate = async () => {
    if (!bucketSlug) {
      toast({
        title: "Error",
        description: "Please select a bucket to generate credentials for.",
        variant: "destructive",
      });
      return;
    }

    setCreatingKey(true);
    try {
      const payload: Record<string, unknown> = {};
      const trimmedName = keyName.trim();
      if (trimmedName) {
        payload.name = trimmedName;
      }

      const res = await fetch(
        `/api/buckets/${encodeURIComponent(bucketSlug)}/keys`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Unable to create key.",
          variant: "destructive",
        });
        return;
      }
      if (!data?.credentials?.secretAccessKey) {
        toast({
          title: "Error",
          description: "Server did not return the secret.",
          variant: "destructive",
        });
        return;
      }

      setSecretPreview({
        accessKeyId: data.key.accessKeyId,
        secretAccessKey: data.credentials.secretAccessKey,
      });
      toast({
        title: "API Key Created",
        description: "Copy and store the secret before closing this dialog.",
        variant: "success",
      });
      setKeyName("");
      onKeyCreated?.();
    } catch (error) {
      console.error("Create API key error:", error);
      toast({
        title: "Network Error",
        description: "Unable to create key.",
        variant: "destructive",
      });
    } finally {
      setCreatingKey(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Generate New Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Generate API Key</DialogTitle>
          <DialogDescription>
            Create a new API key that third-party applications can use to upload
            and download files. Secrets are returned only once.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="bucket-select-trigger">Bucket</Label>
            <Select
              value={bucketSlug}
              onValueChange={(value) => setBucketSlug(value)}
            >
              <SelectTrigger id="bucket-select-trigger">
                <SelectValue placeholder="Select bucket" />
              </SelectTrigger>
              <SelectContent>
                {buckets.map((bucket) => (
                  <SelectItem key={bucket.slug} value={bucket.slug}>
                    <div className="flex flex-col">
                      <span>{bucket.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {bucket.slug}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading && (
              <p className="text-xs text-muted-foreground">Loading buckets…</p>
            )}
            {!loading && !buckets.length && (
              <p className="text-xs text-muted-foreground">
                Create a bucket in the Buckets screen before generating keys.
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="key-name">Key Name (optional)</Label>
            <Input
              id="key-name"
              placeholder="integration-service"
              value={keyName}
              onChange={(event) => setKeyName(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Use a descriptive name so you can differentiate keys later.
            </p>
          </div>
        </div>
        {secretRows}
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={creatingKey || !canGenerate}
          >
            {creatingKey ? "Generating…" : "Generate Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
