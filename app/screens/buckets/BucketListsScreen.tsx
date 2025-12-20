"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BucketsList from "./BucketsList";
import CreateBucketDialog from "./CreateBucketDialog";
import BucketSettingsDialog from "./BucketSettingsDialog";

/* -------------------------------
   FULL BUCKET DETAIL TYPE
-------------------------------- */
export interface BucketDetail {
  id: number;
  name: string;
  slug: string;
  permission: string;
  createdAt: string;
  updatedAt: string;
  sizeBytes?: number;
  sizeLabel?: string;

  accessKeyId: string;
  accessKeyName: string;

  mediaCount: number; // FIXED
  folderCount: number; // FIXED

  accessKeys?: Array<{
    id: number;
    name: string;
    accessKeyId: string;
    permission: string;
    createdAt: string;
  }>;
}

export default function BucketListsScreen() {
  const [buckets, setBuckets] = useState<BucketDetail[]>([]);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // ❌ Was any | null  →  ✅ Now strongly typed
  const [selectedBucket, setSelectedBucket] = useState<BucketDetail | null>(
    null
  );

  const [newBucketCredentials, setNewBucketCredentials] = useState<{
    slug: string;
    accessKeyId: string;
    secretAccessKey: string;
  } | null>(null);

  const refreshBuckets = async () => {
    const res = await fetch("/api/buckets/lists", {
      cache: "no-store",
      headers: { "x-ui-request": "true" },
    });
    if (!res.ok) {
      console.error("Failed to load buckets", res.status);
      setBuckets([]);
      return;
    }
    const data = await res.json();
    setBuckets(data.buckets || []);
  };

  const loadBucketDetails = async (slug: string) => {
    const res = await fetch(`/api/buckets/${slug}`);
    const data = await res.json();
    if (res.ok) {
      setSelectedBucket(data.bucket as BucketDetail);
      setSettingsOpen(true);
    }
  };

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/buckets/lists", {
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("Failed to load buckets", res.status);
        setBuckets([]);
        return;
      }
      const data = await res.json();
      setBuckets(data.buckets || []);
    };

    load();
  }, []);

  useEffect(() => {
    const handler = () => refreshBuckets();
    window.addEventListener("refresh-buckets", handler);
    return () => window.removeEventListener("refresh-buckets", handler);
  }, []);

  useEffect(() => {
    const handler = () => refreshBuckets();
    window.addEventListener("refresh-buckets", handler);
    return () => window.removeEventListener("refresh-buckets", handler);
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <header className="sticky top-0 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/news/lists">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">
              Ministry Of Commerce Object Storage
            </h1>
          </div>

          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Bucket
          </Button>
        </header>

        <main className="px-6 py-8">
          <BucketsList
            buckets={buckets}
            newCredentials={newBucketCredentials}
            onOpenSettings={(slug) => loadBucketDetails(slug)}
          />
        </main>
      </div>

      <CreateBucketDialog
        open={open}
        onOpenChange={setOpen}
        onSuccess={(data) => {
          refreshBuckets();
          setNewBucketCredentials({
            slug: data.bucket.slug!,
            accessKeyId: data.bucket.accessKeyId!,
            secretAccessKey: data.bucket.secretAccessKey!,
          });
        }}
      />

      <BucketSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        bucket={selectedBucket}
        onUpdate={async (type) => {
          await refreshBuckets();
          if (type === "permission" && selectedBucket) {
            await loadBucketDetails(selectedBucket.slug);
          }
        }}
      />
    </>
  );
}
