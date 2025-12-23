"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Copy, RotateCw, ShieldOff } from "lucide-react";

export interface BucketApiKeyRow {
  id: number;
  name: string;
  accessKeyId: string;
  status: "ACTIVE" | "INACTIVE";
  bucketName: string;
  bucketSlug: string;
  createdAt: string;
  lastUsedAt: string | null;
  lastRotatedAt: string | null;
}

interface ApiKeysTableProps {
  keys: BucketApiKeyRow[];
  loading: boolean;
  error?: string | null;
  onRefresh: () => Promise<void>;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

function formatDateTime(value: string | null) {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString();
}

export function ApiKeysTable({
  keys,
  loading,
  error,
  onRefresh,
  page,
  limit,
  total,
  onPageChange,
}: ApiKeysTableProps) {
  const [busyKeyId, setBusyKeyId] = useState<string | null>(null);
  const [secretCache, setSecretCache] = useState<Record<string, string>>({});

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const rotateKey = async (key: BucketApiKeyRow) => {
    setBusyKeyId(key.accessKeyId);
    try {
      const res = await fetch(
        `/api/buckets/${encodeURIComponent(
          key.bucketSlug
        )}/keys/${encodeURIComponent(key.accessKeyId)}/rotate`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Unable to rotate key.",
          variant: "destructive",
        });
        return;
      }
      if (data?.key?.secretAccessKey) {
        setSecretCache((prev) => ({
          ...prev,
          [key.accessKeyId]: data.key.secretAccessKey,
        }));
      }
      toast({
        title: "Secret rotated",
        description: "Copy the new secret before it disappears.",
      });
      await onRefresh();
    } catch (error) {
      console.error("Rotate key error:", error);
      toast({
        title: "Network Error",
        description: "Unable to rotate key.",
        variant: "destructive",
      });
    } finally {
      setBusyKeyId(null);
    }
  };

  const deactivateKey = async (key: BucketApiKeyRow) => {
    setBusyKeyId(key.accessKeyId);
    try {
      const res = await fetch(
        `/api/buckets/${encodeURIComponent(
          key.bucketSlug
        )}/keys/${encodeURIComponent(key.accessKeyId)}/deactivate`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Unable to deactivate key.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "API key deactivated",
        description: "The access key can no longer be used.",
      });
      await onRefresh();
    } catch (error) {
      console.error("Deactivate key error:", error);
      toast({
        title: "Network Error",
        description: "Unable to deactivate key.",
        variant: "destructive",
      });
    } finally {
      setBusyKeyId(null);
    }
  };

  const latestSecretEntry = Object.entries(secretCache)[0];
  const secretPreviewBlock = latestSecretEntry ? (
    <div className="border-b px-4 py-4">
      <p className="text-sm font-semibold text-foreground">
        Secret for {latestSecretEntry[0]} (copy now, shown once)
      </p>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <code className="font-mono text-xs text-muted-foreground">
          {latestSecretEntry[1]}
        </code>
        <Button
          size="sm"
          variant="outline"
          onClick={() => copyToClipboard(latestSecretEntry[1], "Secret")}
        >
          <Copy className="size-3" />
          Copy secret
        </Button>
      </div>
    </div>
  ) : null;

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const pagingControls = (
    <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
      <div>
        Showing page {page} of {totalPages} ({total} keys total)
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          disabled={page <= 1 || loading}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={page >= totalPages || loading}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <TooltipProvider>
        {pagingControls}
        {secretPreviewBlock}
        {error && (
          <div className="px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {loading ? (
          <div className="px-4 py-6 text-sm text-muted-foreground">
            Loading API keys…
          </div>
        ) : keys.length === 0 ? (
          <div className="px-4 py-6 text-sm text-muted-foreground text-center">
            No active API keys yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Access Key</TableHead>
                <TableHead>Bucket</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground">
                        {apiKey.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {apiKey.accessKeyId.slice(0, 6)}…{apiKey.accessKeyId.slice(-4)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs text-muted-foreground">
                        {apiKey.accessKeyId}
                      </code>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => copyToClipboard(apiKey.accessKeyId, "Access key")}
                          >
                            <Copy className="size-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy key</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {apiKey.bucketName}
                      </span>
                      <span className="text-xs">{apiKey.bucketSlug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={apiKey.status === "ACTIVE" ? "default" : "outline"}>
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(apiKey.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(apiKey.lastUsedAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => rotateKey(apiKey)}
                          disabled={busyKeyId === apiKey.accessKeyId}
                        >
                          <RotateCw className="mr-2 size-3" />
                          Regenerate secret
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deactivateKey(apiKey)}
                          disabled={
                            busyKeyId === apiKey.accessKeyId ||
                            apiKey.status !== "ACTIVE"
                          }
                        >
                          <ShieldOff className="mr-2 size-3" />
                          {apiKey.status === "ACTIVE" ? "Revoke key" : "Revoke key (inactive)"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TooltipProvider>
    </div>
  );
}
