"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, XCircle, Settings } from "lucide-react"

export function IntegrationStatus() {
  const integrations = [
    { name: "Shopify", status: "connected", lastSync: "2 min ago" },
    { name: "Amazon", status: "connected", lastSync: "5 min ago" },
    { name: "eBay", status: "warning", lastSync: "1 hour ago" },
    { name: "Facebook Shop", status: "connected", lastSync: "10 min ago" },
    { name: "Google Merchant", status: "error", lastSync: "Failed" },
    { name: "Instagram Shop", status: "connected", lastSync: "3 min ago" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Settings className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Status</CardTitle>
        <p className="text-sm text-muted-foreground">
          Platform connections and sync status
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50"
            >
              <div className="flex items-center">
                {getStatusIcon(integration.status)}
                <span className="ml-3 font-medium text-foreground">
                  {integration.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {integration.lastSync}
              </span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
          Manage Integrations
        </button>
      </CardContent>
    </Card>
  )
}
