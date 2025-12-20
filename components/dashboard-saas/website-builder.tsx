"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Eye, Smartphone, Monitor } from "lucide-react"

export function WebsiteBuilder() {
  const websites = [
    {
      name: "Main Store",
      url: "mystore.com",
      visitors: "12.4K",
      status: "live",
      mobile: "98%",
      desktop: "95%",
    },
    {
      name: "Fashion Blog",
      url: "fashion.mystore.com",
      visitors: "8.2K",
      status: "live",
      mobile: "92%",
      desktop: "88%",
    },
    {
      name: "Landing Page",
      url: "promo.mystore.com",
      visitors: "3.1K",
      status: "draft",
      mobile: "85%",
      desktop: "90%",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Website Builder
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage your websites and performance
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {websites.map((website, index) => (
            <div
              key={index}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">
                  {website.name}
                </h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    website.status === "live"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {website.status}
                </span>
              </div>

              <p className="mb-3 text-sm text-muted-foreground">
                {website.url}
              </p>

              <div className="flex items-center mb-3">
                <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {website.visitors} visitors
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Smartphone className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Mobile</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {website.mobile}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Monitor className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Desktop</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {website.desktop}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create New Website
        </button>
      </CardContent>
    </Card>
  )
}
