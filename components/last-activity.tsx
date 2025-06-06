"use client"

import { useState, useEffect } from "react"
import { Gamepad2, Headphones } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"

interface LastActivityProps {
  data?: LanyardData | null
  loading?: boolean
}

export function LastActivity({ data, loading }: LastActivityProps) {
  const [timeAgo, setTimeAgo] = useState("")

  // Get the most recent activity
  const getLastActivity = () => {
    if (!data) return null

    // Check for Spotify first
    if (data.listening_to_spotify && data.spotify) {
      return {
        type: "Currently Listening",
        name: data.spotify.song,
        details: `by ${data.spotify.artist}`,
        icon: <Headphones className="w-5 h-5 text-green-400" />,
        color: "border-green-500/50",
        bgColor: "bg-green-500/10",
        timestamp: Date.now(),
        isActive: true,
      }
    }

    // Check for current activities
    const currentActivity = data.activities?.find((activity) => activity.type === 0)
    if (currentActivity) {
      // Visual Studio Code
      if (
        currentActivity.application_id === "383226320970055681" ||
        currentActivity.name.includes("Visual Studio Code")
      ) {
        return {
          type: "Currently Playing",
          name: "Visual Studio Code",
          details: currentActivity.details || currentActivity.state || "Workspace: mercury-bio",
          icon: (
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
            </svg>
          ),
          color: "border-blue-500/50",
          bgColor: "bg-blue-500/10",
          timestamp: currentActivity.timestamps?.start || Date.now(),
          isActive: true,
        }
      }

      // Roblox
      if (currentActivity.name.toLowerCase().includes("roblox")) {
        return {
          type: "Currently Playing",
          name: currentActivity.name,
          details: currentActivity.details || currentActivity.state || "Playing Roblox",
          icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
          color: "border-orange-500/50",
          bgColor: "bg-orange-500/10",
          timestamp: currentActivity.timestamps?.start || Date.now(),
          isActive: true,
        }
      }

      // Generic activity
      return {
        type: "Currently Playing",
        name: currentActivity.name,
        details: currentActivity.details || currentActivity.state,
        icon: <Gamepad2 className="w-5 h-5 text-green-400" />,
        color: "border-green-500/50",
        bgColor: "bg-green-500/10",
        timestamp: currentActivity.timestamps?.start || Date.now(),
        isActive: true,
      }
    }

    // No current activity - show last known activity
    return {
      type: "Last activity",
      name: "Visual Studio Code",
      details: "Workspace: mercury-bio",
      icon: (
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
        </svg>
      ),
      color: "border-gray-500/50",
      bgColor: "bg-gray-500/10",
      timestamp: Date.now() - 300000, // 5 minutes ago
      isActive: false,
    }
  }

  const activity = getLastActivity()

  useEffect(() => {
    if (!activity) return

    const updateTimeAgo = () => {
      const now = Date.now()
      const diff = now - activity.timestamp
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)

      if (activity.isActive) {
        if (minutes > 0) {
          setTimeAgo(`${minutes}min`)
        } else {
          setTimeAgo("now")
        }
      } else {
        if (minutes < 1) {
          setTimeAgo("a few seconds ago")
        } else if (minutes < 60) {
          setTimeAgo(`${minutes} minutes ago`)
        } else {
          const hours = Math.floor(minutes / 60)
          setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`)
        }
      }
    }

    updateTimeAgo()
    const interval = setInterval(updateTimeAgo, 1000)

    return () => clearInterval(interval)
  }, [activity])

  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span className="text-white font-medium">Do Not Disturb</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span className="text-white font-medium">Do Not Disturb</span>
        </div>
        <p className="text-gray-400 text-sm">No recent activity</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
        <span className="text-white font-medium">Do Not Disturb</span>
      </div>

      <div className="space-y-3">
        <div className="text-gray-400 text-sm font-medium">{activity.type}</div>

        <div className={`border-l-4 ${activity.color} ${activity.bgColor} rounded-r-lg p-3`}>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">
                {activity.type === "Last activity" ? `Last activity: ${activity.name}` : activity.name}
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span>{activity.details}</span>
                {timeAgo && (
                  <>
                    <span>•</span>
                    <span>{timeAgo}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
