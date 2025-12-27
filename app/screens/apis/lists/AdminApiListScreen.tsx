"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiKeysTable, BucketApiKeyRow } from "./api-keys-table";
import { GenerateKeyDialog, BucketOption } from "./generate-key-dialog";

export default function AdminApiListScreen() {
  const [keys, setKeys] = useState<BucketApiKeyRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalKeys, setTotalKeys] = useState(0);
  const [buckets, setBuckets] = useState<BucketOption[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [loadingBuckets, setLoadingBuckets] = useState(false);
  const [keysError, setKeysError] = useState<string | null>(null);
  const [bucketsError, setBucketsError] = useState<string | null>(null);
  const [newSecrets, setNewSecrets] = useState<Record<string, string>>({});

  const loadKeys = useCallback(
    async (pageToLoad = 1) => {
      setLoadingKeys(true);
      try {
        const res = await fetch(
          `/api/buckets/keys?page=${pageToLoad}&limit=20`,
          {
            cache: "no-store",
            headers: { "x-ui-request": "true" },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Unable to load API keys.");
        }
        setKeys(data.keys || []);
        setTotalKeys(data.meta?.total ?? 0);
      setPage(data.meta?.page ?? pageToLoad);
        setKeysError(null);
      } catch (error) {
        console.error("Load API keys error:", error);
        setKeys([]);
        setKeysError(
          error instanceof Error ? error.message : "Failed to load API keys."
        );
      } finally {
        setLoadingKeys(false);
      }
    },
    [page]
  );

  const handlePageChange = (newPage: number) => {
    loadKeys(newPage);
  };

  const loadBuckets = useCallback(async () => {
    setLoadingBuckets(true);
    try {
      const res = await fetch("/api/buckets/lists", {
        cache: "no-store",
        headers: { "x-ui-request": "true" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Unable to load buckets.");
      }
      setBuckets(
        (data.buckets || []).map((bucket: any) => ({
          slug: bucket.slug,
          name: bucket.name,
        }))
      );
      setBucketsError(null);
    } catch (error) {
      console.error("Load buckets error:", error);
      setBucketsError(
        error instanceof Error ? error.message : "Failed to load buckets."
      );
    } finally {
      setLoadingBuckets(false);
    }
  }, []);

  useEffect(() => {
    loadBuckets();
    loadKeys();
  }, [loadBuckets, loadKeys]);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Spaces access keys
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Keys you have generated to connect with third party clients or to access the Spaces API.
              </p>
              {bucketsError && (
                <p className="text-xs text-destructive">
                  {bucketsError}
                </p>
              )}
            </div>
            <GenerateKeyDialog
              buckets={buckets}
              loading={loadingBuckets}
              onKeyCreated={({ accessKeyId, secretAccessKey }) => {
                setNewSecrets((prev) => ({
                  ...prev,
                  [accessKeyId]: secretAccessKey,
                }));
                loadKeys();
              }}
            />
          </div>
          <ApiKeysTable
            keys={keys}
            loading={loadingKeys}
            error={keysError}
            onRefresh={() => loadKeys(page)}
            newSecrets={newSecrets}
            onDismissNewSecret={(accessKeyId) => {
              setNewSecrets((prev) => {
                if (!prev[accessKeyId]) return prev;
                const next = { ...prev };
                delete next[accessKeyId];
                return next;
              });
            }}
            page={page}
            limit={20}
            total={totalKeys}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
