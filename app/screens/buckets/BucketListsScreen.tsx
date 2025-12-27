"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BucketsList, { BucketListItem } from "./BucketsList";
import CreateBucketDialog from "./CreateBucketDialog";
import BucketSettingsDialog from "./BucketSettingsDialog";

/* -------------------------------
   FULL BUCKET DETAIL TYPE
-------------------------------- */
export interface BucketDetail extends BucketListItem {
  accessKeyId: string;
  accessKeyName: string;
  storageProvider: string;
  storageRegion?: string | null;
  storageEndpoint?: string | null;
  apiKeys?: Array<{
    name: string;
    accessKeyId: string;
    status: string;
    createdAt: string;
    lastUsedAt: string | null;
  }>;
}

export default function BucketListsScreen() {
  const [buckets, setBuckets] = useState<BucketListItem[]>([]);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  // ❌ Was any | null  →  ✅ Now strongly typed
  const [selectedBucket, setSelectedBucket] = useState<BucketDetail | null>(
    null
  );

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
    try {
      const res = await fetch(`/api/buckets/${slug}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("Failed to load bucket detail", res.status);
        setSelectedBucket(null);
        return;
      }
      const data = await res.json();
      setSelectedBucket(data.bucket || null);
      setSettingsOpen(true);
    } catch (error) {
      console.error("Failed to load bucket detail:", error);
      setSelectedBucket(null);
    }
  };

  useEffect(() => {
    const load = async () => {
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

    load();
  }, []);

  useEffect(() => {
    let active = true;
    const loadPermissions = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (active) setCanCreate(false);
          return;
        }
        const data = await res.json();
        const perms = data?.user?.permissions || {};
        const allowed = Boolean(perms?.buckets?.create);
        const allowUpdate = Boolean(perms?.buckets?.update);
        const allowDelete = Boolean(perms?.buckets?.delete);
        if (active) setCanCreate(allowed);
        if (active) setCanUpdate(allowUpdate);
        if (active) setCanDelete(allowDelete);
      } catch (error) {
        console.error("Failed to load bucket permissions:", error);
        if (active) setCanCreate(false);
        if (active) setCanUpdate(false);
        if (active) setCanDelete(false);
      }
    };

    loadPermissions();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handler = () => refreshBuckets();
    window.addEventListener("refresh-buckets", handler);
    return () => window.removeEventListener("refresh-buckets", handler);
  }, []);

  const handleOpenSettings = async (slug: string) => {
    await refreshBuckets();
    await loadBucketDetails(slug);
  };

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

          {canCreate && (
            <Button onClick={() => setOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Bucket
            </Button>
          )}
        </header>

        <main className="px-6 py-8">
          <BucketsList
            buckets={buckets}
            onOpenSettings={handleOpenSettings}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
        </main>
      </div>

      <CreateBucketDialog
        open={open}
        onOpenChange={setOpen}
        onSuccess={() => {
          refreshBuckets();
        }}
      />

      {canUpdate && (
        <BucketSettingsDialog
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          bucket={selectedBucket}
          onUpdate={async (type) => {
            await refreshBuckets();
            if (selectedBucket) {
              await loadBucketDetails(selectedBucket.slug);
              setSettingsOpen(true);
            }
          }}
        />
      )}
    </>
  );
}
