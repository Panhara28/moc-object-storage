"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartOptions,
  LegendOptions,
  TooltipOptions,
  TooltipItem,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

type DashboardChartData = {
  timeline: {
    labels: string[];
    uploads: number[];
    bytes: number[];
  };
  mediaTypes: {
    labels: string[];
    counts: number[];
  };
  scanStatuses: {
    labels: string[];
    counts: number[];
  };
};

const emptyData: DashboardChartData = {
  timeline: { labels: [], uploads: [], bytes: [] },
  mediaTypes: { labels: [], counts: [] },
  scanStatuses: { labels: [], counts: [] },
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

export default function ContentChart() {
  const [range, setRange] = useState<"12m" | "6m" | "3m">("12m");
  const [data, setData] = useState<DashboardChartData>(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    let active = true;
    const loadCharts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/dashboard/charts?range=${range}`);
        if (!res.ok) {
          throw new Error("Failed to load charts");
        }
        const payload = await res.json();
        if (active && payload?.data) {
          setData(payload.data as DashboardChartData);
        }
      } catch (error) {
        console.error("Failed to load dashboard charts:", error);
        if (active) {
          setData(emptyData);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadCharts();
    return () => {
      active = false;
    };
  }, [range]);

  const chartOptions = useMemo<ChartOptions<"line">>(() => {
    const fontSize = isMobile ? 9 : 11;

    const legendConfig = {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: isMobile ? 10 : 20,
        font: {
          size: isMobile ? 10 : 12,
        },
      },
    } as LegendOptions<"line">;

    const tooltipConfig = {
      mode: "index" as const,
      intersect: false,
      callbacks: {
        label: (context: TooltipItem<"line">) => {
          const label = context.dataset.label || "";
          const value = context.parsed?.y ?? 0;
          if (label.toLowerCase().includes("storage")) {
            return `${label}: ${formatBytes(value)}`;
          }
          return `${label}: ${value}`;
        },
      },
    } as TooltipOptions<"line">;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: legendConfig,
        title: {
          display: false,
        },
        tooltip: tooltipConfig,
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            font: {
              size: fontSize,
            },
            maxTicksLimit: isMobile ? 6 : undefined,
          },
        },
        y1: {
          beginAtZero: true,
          position: "right" as const,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            font: {
              size: fontSize,
            },
            callback: (value) => (typeof value === "number" ? formatBytes(value) : value),
          },
        },
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            font: {
              size: fontSize,
            },
            maxRotation: isMobile ? 45 : 0,
            minRotation: 0,
          },
        },
      },
      interaction: {
        mode: "nearest" as const,
        axis: "x" as const,
        intersect: false,
      },
    };
  }, [isMobile]);

  const barOptions = useMemo<ChartOptions<"bar">>(() => {
    const fontSize = isMobile ? 9 : 11;

    const legendConfig = {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: isMobile ? 10 : 20,
        font: {
          size: isMobile ? 10 : 12,
        },
      },
    } as LegendOptions<"bar">;

    const tooltipConfig = {
      mode: "index" as const,
      intersect: false,
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          const label = context.dataset.label || "";
          const value = context.parsed?.y ?? 0;
          if (label.toLowerCase().includes("storage")) {
            return `${label}: ${formatBytes(value)}`;
          }
          return `${label}: ${value}`;
        },
      },
    } as TooltipOptions<"bar">;

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: legendConfig,
        title: {
          display: false,
        },
        tooltip: tooltipConfig,
      },
      interaction: chartOptions.interaction,
      scales: {
        y: chartOptions.scales?.y,
        x: chartOptions.scales?.x,
      },
    };
  }, [chartOptions, isMobile]);

  const timelineData = useMemo(() => {
    return {
      labels: data.timeline.labels,
      datasets: [
        {
          label: "Uploads",
          data: data.timeline.uploads,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          yAxisID: "y",
        },
        {
          label: "Storage Added",
          data: data.timeline.bytes,
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          yAxisID: "y1",
        },
      ],
    };
  }, [data]);

  const typeData = useMemo(() => {
    return {
      labels: data.mediaTypes.labels,
      datasets: [
        {
          label: "Media Files",
          data: data.mediaTypes.counts,
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(245, 158, 11, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(139, 92, 246, 0.8)",
            "rgba(6, 182, 212, 0.8)",
          ],
          borderColor: [
            "rgb(59, 130, 246)",
            "rgb(16, 185, 129)",
            "rgb(245, 158, 11)",
            "rgb(239, 68, 68)",
            "rgb(139, 92, 246)",
            "rgb(6, 182, 212)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const scanData = useMemo(() => {
    return {
      labels: data.scanStatuses.labels,
      datasets: [
        {
          label: "Scan Status",
          data: data.scanStatuses.counts,
          backgroundColor: [
            "rgba(234, 179, 8, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(244, 63, 94, 0.8)",
          ],
          borderColor: [
            "rgb(234, 179, 8)",
            "rgb(34, 197, 94)",
            "rgb(239, 68, 68)",
            "rgb(244, 63, 94)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const showTimeline = data.timeline.labels.length > 0;
  const showTypes = data.mediaTypes.labels.length > 0;
  const showScans = data.scanStatuses.labels.length > 0;

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {/* Content Performance Chart */}
      <div className="w-full min-w-0 rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            Uploads & Storage
          </h3>
          <select
            className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground sm:w-auto sm:text-sm"
            value={range}
            onChange={(event) =>
              setRange(event.target.value as "12m" | "6m" | "3m")
            }
          >
            <option value="12m">Last 12 months</option>
            <option value="6m">Last 6 months</option>
            <option value="3m">Last 3 months</option>
          </select>
        </div>
        <div className="h-64 sm:h-80 w-full">
          {showTimeline ? (
            <Line data={timelineData} options={chartOptions} />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {isLoading ? "Loading..." : "No data yet"}
            </div>
          )}
        </div>
      </div>

      {/* Content by Category Chart */}
      <div className="w-full min-w-0 rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            Media by Type
          </h3>
          <span className="text-xs text-muted-foreground sm:text-sm">
            All time
          </span>
        </div>
        <div className="h-48 sm:h-64 w-full">
          {showTypes ? (
            <Bar data={typeData} options={barOptions} />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {isLoading ? "Loading..." : "No data yet"}
            </div>
          )}
        </div>
      </div>

      {/* Scan Status Chart */}
      <div className="w-full min-w-0 rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            Scan Status
          </h3>
          <span className="text-xs text-muted-foreground sm:text-sm">
            All time
          </span>
        </div>
        <div className="h-48 sm:h-64 w-full">
          {showScans ? (
            <Bar data={scanData} options={barOptions} />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {isLoading ? "Loading..." : "No data yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
