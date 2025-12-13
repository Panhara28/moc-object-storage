"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HardDrive, Calendar, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Bucket } from "@/lib/generated/prisma";
import RenameBucketDialog from "./RenameBucketDialog";
import DeleteBucketDialog from "./DeleteBucketDialog";

/* Props Types */
interface BucketListItem {
  id: number;
  name: string;
  slug: string;
  permission: string;
  createdAt: string;
  updatedAt: string;
  mediaCount: number;
  folderCount: number;
  size?: number | null;
}

interface NewBucketCredentials {
  slug: string;
  accessKeyId: string;
  secretAccessKey: string;
}

interface BucketsListProps {
  buckets: BucketListItem[];
  newCredentials: NewBucketCredentials | null;
  onOpenSettings: (bucket: string) => void;
}

export default function BucketsList({
  buckets,
  newCredentials,
  onOpenSettings,
}: BucketsListProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameBucket, setRenameBucket] = useState<BucketListItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBucket, setDeleteBucket] = useState<BucketListItem | null>(null);

  return (
    <div className="space-y-6">
      {buckets.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <HardDrive className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No buckets yet</h3>
            <p className="text-muted-foreground">
              Create your first bucket to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {buckets.map((bucket) => (
            <Card
              key={bucket.slug}
              className="h-full hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Link href={`/admin/buckets/${bucket.slug}`}>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {bucket.name}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Region: Cambodia
                      </CardDescription>
                    </div>
                  </Link>

                  {/* ⋯ menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10 opacity-70 hover:opacity-100 cursor-pointer"
                        onClick={(e) => e.preventDefault()}
                      >
                        <EllipsisVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-black/50" />

                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenSettings(bucket.slug); // notify parent which bucket to load
                        }}
                      >
                        Settings
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          setRenameBucket(bucket);
                          setRenameOpen(true);
                        }}
                      >
                        Rename
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteBucket(bucket);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete Bucket
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* SECRET KEY BLOCK */}
                {newCredentials?.slug === bucket.slug && (
                  <div className="p-3 bg-green-50 border border-green-300 rounded-lg space-y-2">
                    <p className="text-sm font-semibold text-green-800">
                      Secret Key (click to copy):
                    </p>

                    <div
                      className="relative"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(
                          newCredentials.secretAccessKey
                        );
                        setCopiedSlug(bucket.slug);
                        setTimeout(() => setCopiedSlug(null), 1200);
                      }}
                    >
                      <div className="font-mono bg-white text-black p-2 rounded border text-sm break-all cursor-pointer hover:bg-green-100 transition">
                        {newCredentials.secretAccessKey.length > 8
                          ? `${newCredentials.secretAccessKey.slice(
                              0,
                              4
                            )}•••••••••••••••••••••••••••••••••••••${newCredentials.secretAccessKey.slice(
                              -4
                            )}`
                          : newCredentials.secretAccessKey}
                      </div>

                      {copiedSlug === bucket.slug && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded border text-green-700 font-semibold text-sm animate-fadeOut">
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* METADATA */}
                <Link href={`/admin/buckets/${bucket.slug}`}>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {bucket.size ?? 0} GB
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Created {bucket.createdAt}</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <RenameBucketDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        bucket={renameBucket}
        onSuccess={() => {
          // reload bucket list from parent
          window.dispatchEvent(new CustomEvent("refresh-buckets"));
        }}
      />

      <DeleteBucketDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        bucket={deleteBucket}
        onSuccess={() => {
          window.dispatchEvent(new CustomEvent("refresh-buckets"));
        }}
      />
    </div>
  );
}
