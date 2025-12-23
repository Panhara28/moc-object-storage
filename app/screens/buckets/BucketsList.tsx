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
  sizeBytes?: number;
  sizeLabel?: string;
  keyCount?: number;
}

interface BucketsListProps {
  buckets: BucketListItem[];
  onOpenSettings: (bucket: string) => void;
  canUpdate: boolean;
  canDelete: boolean;
}

export default function BucketsList({
  buckets,
  onOpenSettings,
  canUpdate,
  canDelete,
}: BucketsListProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameBucket, setRenameBucket] = useState<BucketListItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBucket, setDeleteBucket] = useState<BucketListItem | null>(null);

  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const val = bytes / Math.pow(1024, i);
    return `${val.toFixed(val >= 10 ? 0 : 1)} ${units[i]}`;
  };

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
                        {bucket.keyCount ? `${bucket.keyCount} API keys` : "No API keys"}
                      </CardDescription>
                    </div>
                  </Link>

                  {/* ⋯ menu */}
                  {(canUpdate || canDelete) && (
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

                        {canUpdate && (
                          <>
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
                          </>
                        )}

                        {canUpdate && canDelete && <DropdownMenuSeparator />}

                        {canDelete && (
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
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <Link href={`/admin/buckets/${bucket.slug}`}>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {bucket.sizeLabel || formatBytes(bucket.sizeBytes)}
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
