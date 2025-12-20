"use client"
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
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement)

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Sales",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Orders",
      data: [800, 1200, 1000, 1600, 1400, 1900, 1800, 2200, 2000, 2500, 2400, 2800],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
}

const revenueData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Revenue",
      data: [3200, 4100, 3800, 5200, 4900, 6100, 5800],
      backgroundColor: "rgba(139, 92, 246, 0.8)",
      borderColor: "rgb(139, 92, 246)",
      borderWidth: 1,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    x: {
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  interaction: {
    mode: "nearest" as const,
    axis: "x" as const,
    intersect: false,
  },
}

const mobileChartOptions = {
  ...chartOptions,
  plugins: {
    ...chartOptions.plugins,
    legend: {
      ...chartOptions.plugins.legend,
      labels: {
        ...chartOptions.plugins.legend.labels,
        padding: 10,
        font: {
          size: 10,
        },
      },
    },
  },
  scales: {
    ...chartOptions.scales,
    y: {
      ...chartOptions.scales.y,
      ticks: {
        font: {
          size: 9,
        },
        maxTicksLimit: 6,
      },
    },
    x: {
      ...chartOptions.scales.x,
      ticks: {
        font: {
          size: 9,
        },
        maxRotation: 45,
        minRotation: 0,
      },
    },
  },
}

export function SalesChart() {
  return (
    <div className="w-full min-w-0 rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          Sales Overview
        </h3>
        <select className="w-full rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground sm:w-auto sm:text-sm">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="h-64 sm:h-80 w-full">
        <Line data={salesData} options={window.innerWidth < 640 ? mobileChartOptions : chartOptions} />
      </div>
    </div>
  )
}

export function RevenueChart() {
  return (
    <div className="w-full min-w-0 rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          Weekly Revenue
        </h3>
        <span className="text-xs text-muted-foreground sm:text-sm">
          This week
        </span>
      </div>
      <div className="h-48 sm:h-64 w-full">
        <Bar data={revenueData} options={window.innerWidth < 640 ? mobileChartOptions : chartOptions} />
      </div>
    </div>
  )
}
