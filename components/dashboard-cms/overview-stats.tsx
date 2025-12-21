"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Database,
  ImageIcon,
  ShieldAlert,
  ShieldX,
  Folder,
  Clock,
  RefreshCw,
} from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

type DashboardStats = {
  bucketCount: number;
  mediaCount: number;
  totalBytes: number;
  pendingScans: number;
  failedScans: number;
  maliciousScans: number;
  lastUploadAt: string | null;
  pendingItems: {
    id: number;
    slug: string;
    filename: string;
    bucketSlug: string;
    bucketName: string;
  }[];
};

const emptyStats: DashboardStats = {
  bucketCount: 0,
  mediaCount: 0,
  totalBytes: 0,
  pendingScans: 0,
  failedScans: 0,
  maliciousScans: 0,
  lastUploadAt: null,
  pendingItems: [],
};

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  let value = bytes;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

export default function OverviewStats() {
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) {
        throw new Error("Failed to load stats");
      }
      const payload = await res.json();
      if (payload?.data) {
        setStats(payload.data as DashboardStats);
      }
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      setStats(emptyStats);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  const lastUploadLabel = stats.lastUploadAt
    ? new Date(stats.lastUploadAt).toLocaleString()
    : "No uploads yet";

  const pendingSummary = useMemo(() => {
    if (stats.pendingItems.length === 0) {
      return "Waiting for antivirus";
    }
    const first = stats.pendingItems[0];
    const moreCount = stats.pendingItems.length - 1;
    const firstLabel = first.filename || first.slug;
    if (moreCount > 0) {
      return `${firstLabel} +${moreCount} more`;
    }
    return firstLabel;
  }, [stats.pendingItems]);

  const cards: StatCard[] = [
    {
      title: "Buckets",
      value: isLoading ? "…" : stats.bucketCount.toLocaleString(),
      icon: <Folder className="h-6 w-6 text-amber-500" />,
      description: "Available buckets",
    },
    {
      title: "Media Files",
      value: isLoading ? "…" : stats.mediaCount.toLocaleString(),
      icon: <ImageIcon className="h-6 w-6 text-sky-500" />,
      description: `Last upload: ${lastUploadLabel}`,
    },
    {
      title: "Storage Used",
      value: isLoading ? "…" : formatBytes(stats.totalBytes),
      icon: <Database className="h-6 w-6 text-emerald-500" />,
      description: "Total media size",
    },
    {
      title: "Pending Scans",
      value: isLoading ? "…" : stats.pendingScans.toLocaleString(),
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      description: pendingSummary,
    },
    {
      title: "Failed Scans",
      value: isLoading ? "…" : stats.failedScans.toLocaleString(),
      icon: <ShieldX className="h-6 w-6 text-rose-500" />,
      description: "Retry or remove",
    },
    {
      title: "Malicious",
      value: isLoading ? "…" : stats.maliciousScans.toLocaleString(),
      icon: <ShieldAlert className="h-6 w-6 text-red-600" />,
      description: "Detected threats",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={loadStats}
          disabled={isLoading}
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-border bg-card p-3 text-card-foreground transition-shadow hover:shadow-md sm:rounded-xl sm:p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-lg font-bold text-foreground sm:text-xl">
                {stat.value}
              </div>
              <div className="flex-shrink-0">{stat.icon}</div>
            </div>
            <div className="space-y-0.5 pt-2">
              <h3 className="text-xs font-medium text-muted-foreground sm:text-sm">
                {stat.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
