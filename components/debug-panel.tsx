"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, X, Wifi, WifiOff, Loader2, ExternalLink } from "lucide-react"

interface DebugPanelProps {
  lanyardData: any
  loading: boolean
  error: string | null
  connectionStatus: "connecting" | "connected" | "disconnected"
  lastUpdated: Date | null
}

export function DebugPanel({ lanyardData, loading, error, connectionStatus, lastUpdated }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="w-4 h-4 text-green-500" />
      case "connecting":
        return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
      case "disconnected":
        return <WifiOff className="w-4 h-4 text-red-500" />
    }
  }

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "disconnected":
        return "bg-red-500"
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {/* Connection Status Indicator */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
          {getConnectionIcon()}
          <span className="text-xs text-white capitalize">{connectionStatus}</span>
        </div>

        {/* Debug Button */}
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          <Bug className="w-4 h-4 mr-2" />
          Debug
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[80vh] overflow-auto z-50 bg-black/90 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-white">Discord Debug Panel</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-3 text-white">
        {/* Connection Status */}
        <div>
          <p className="font-semibold mb-2">Connection Status:</p>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getConnectionColor()}`} />
            <Badge variant="outline" className="text-white border-white/30">
              {connectionStatus}
            </Badge>
          </div>
        </div>

        {/* Loading State */}
        <div>
          <Badge variant={loading ? "secondary" : "outline"} className="text-white border-white/30">
            Loading: {loading ? "Yes" : "No"}
          </Badge>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div>
            <p className="font-semibold text-green-400">Last Updated:</p>
            <p className="text-green-300">{lastUpdated.toLocaleTimeString()}</p>
          </div>
        )}

        {/* Error Information */}
        {error && (
          <div>
            <p className="font-semibold text-yellow-400">Status:</p>
            <div className="bg-yellow-900/30 p-2 rounded text-yellow-300 whitespace-pre-wrap text-xs">{error}</div>
          </div>
        )}

        {/* Discord Data */}
        {lanyardData && (
          <div>
            <p className="font-semibold text-green-400">Discord Data:</p>
            <div className="bg-gray-800/50 p-2 rounded text-xs space-y-1">
              <p>
                <span className="text-gray-400">Username:</span> {lanyardData.discord_user?.username || "N/A"}
              </p>
              <p>
                <span className="text-gray-400">Status:</span>{" "}
                <span
                  className={
                    lanyardData.discord_status === "online"
                      ? "text-green-400"
                      : lanyardData.discord_status === "idle"
                        ? "text-yellow-400"
                        : lanyardData.discord_status === "dnd"
                          ? "text-red-400"
                          : "text-gray-400"
                  }
                >
                  {lanyardData.discord_status || "N/A"}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Avatar:</span> {lanyardData.discord_user?.avatar ? "✓" : "✗"}
              </p>
              <p>
                <span className="text-gray-400">Activities:</span> {lanyardData.activities?.length || 0}
              </p>
              {lanyardData.activities?.length > 0 && (
                <div className="ml-2 mt-1">
                  <p className="text-gray-400">Current Activity:</p>
                  <p className="text-blue-300">{lanyardData.activities[0].name}</p>
                  {lanyardData.activities[0].details && (
                    <p className="text-gray-300">{lanyardData.activities[0].details}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* API Information */}
        <div>
          <p className="font-semibold text-blue-400">API Information:</p>
          <div className="bg-gray-800/50 p-2 rounded text-xs space-y-1">
            <p>
              <span className="text-gray-400">User ID:</span> 1330617292798562401
            </p>
            <p>
              <span className="text-gray-400">Endpoint:</span> api.lanyard.rest/v1/users/...
            </p>
            <p>
              <span className="text-gray-400">WebSocket:</span> wss://api.lanyard.rest/socket
            </p>
          </div>
        </div>

        {/* Setup Instructions */}
        <div>
          <p className="font-semibold text-blue-400">Setup Instructions:</p>
          <div className="bg-blue-900/20 p-2 rounded text-xs space-y-2 text-blue-200">
            <div className="flex items-center gap-2">
              <span>1. Join Lanyard Discord server:</span>
              <a
                href="https://discord.gg/lanyard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-100 flex items-center gap-1"
              >
                discord.gg/lanyard
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p>2. Set Discord status to Online/Idle/DND (not invisible)</p>
            <p>3. Wait 5-10 minutes for API recognition</p>
            <p>4. Refresh this page</p>
          </div>
        </div>

        {/* Current Status */}
        <div>
          <p className="font-semibold text-purple-400">Current Mode:</p>
          <div className="bg-purple-900/20 p-2 rounded text-xs text-purple-200">
            {error ? <p>🎭 Demo Mode - Showing realistic fallback data</p> : <p>🔴 Live Mode - Real Discord status</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
