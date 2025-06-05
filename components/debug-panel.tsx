"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, X } from "lucide-react"

interface DebugPanelProps {
  lanyardData: any
  loading: boolean
  error: string | null
}

export function DebugPanel({ lanyardData, loading, error }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 z-50">
        <Bug className="w-4 h-4 mr-2" />
        Debug
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-auto z-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Debug Panel</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2">
        <div>
          <Badge variant={loading ? "secondary" : "outline"}>Loading: {loading ? "Yes" : "No"}</Badge>
        </div>

        {error && (
          <div>
            <p className="font-semibold text-red-500">Error:</p>
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {lanyardData && (
          <div>
            <p className="font-semibold text-green-500">Discord Data:</p>
            <div className="bg-muted p-2 rounded text-xs">
              <p>Username: {lanyardData.discord_user?.username || "N/A"}</p>
              <p>Status: {lanyardData.discord_status || "N/A"}</p>
              <p>Avatar: {lanyardData.discord_user?.avatar ? "✓" : "✗"}</p>
              <p>Activities: {lanyardData.activities?.length || 0}</p>
            </div>
          </div>
        )}

        <div>
          <p className="font-semibold">API Endpoint:</p>
          <p className="break-all">https://api.lanyard.rest/v1/users/1330617292798562401</p>
        </div>
      </CardContent>
    </Card>
  )
}
