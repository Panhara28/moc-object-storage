"use client";

import Link from "next/link";
import OverviewStats from "./overview-stats";
import ContentChart from "./content-chart";
import RecentUpload from "./recent-upload";
import PopularArticles from "./popular-articles";
import ContentCategories from "./content-categories";
import RecentComments from "./recent-comments";
import PublishingSchedule from "./publishing-schedule";
import UserActivity from "./user-activity";
import SystemHistory from "./system-history";

export default function CMSDashboardContent() {
  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            MOC Object Storage
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Forks & Likes this Project, and download Full Templates at MOC
            Object Storage
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/buckets/lists"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Go to bucket
          </Link>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStats />

      {/* Content Chart - moved here */}
      <ContentChart />

      {/* User Activity & System History Row */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <SystemHistory />
        <UserActivity />
      </div>

      {/* Main Content */}
      <div className="space-y-4 sm:space-y-6 w-full min-w-0">
        <RecentUpload />
        {/* <PopularArticles />
        <PublishingSchedule /> */}
      </div>

      {/* Right Column - 1/3 width on desktop */}
      {/* <div className="space-y-4 sm:space-y-6 w-full min-w-0">
          <ContentCategories />
          <RecentComments />
        </div> */}
    </div>
  );
}
