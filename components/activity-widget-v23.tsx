"use client"

import { useState, useEffect } from "react"
import { Code, Gamepad2 } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"

interface ActivityWidgetV23Props {
  data?: LanyardData | null
  loading?: boolean
}

export function ActivityWidgetV23({ data, loading }: ActivityWidgetV23Props) {
  const [elapsedTime, setElapsedTime] = useState("")

  // Get the main activity (playing, coding, etc.)
  const mainActivity = data?.activities?.find((activity) => activity.type === 0)

  useEffect(() => {
    if (!mainActivity?.timestamps?.start) return

    const updateElapsed = () => {
      const startTime = mainActivity.timestamps!.start!
      const now = Date.now()
      const elapsed = now - startTime
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)

      if (minutes > 0) {
        setElapsedTime(`${minutes}:${seconds.toString().padStart(2, "0")}`)
      } else {
        setElapsedTime(`0:${seconds.toString().padStart(2, "0")}`)
      }
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)

    return () => clearInterval(interval)
  }, [mainActivity])

  const getActivityInfo = () => {
    if (!mainActivity) return null

    // Visual Studio Code
    if (mainActivity.application_id === "383226320970055681" || mainActivity.name.includes("Visual Studio Code")) {
      return {
        type: "Currently Coding",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state || "Workspace: mercury-bio",
        icon: <Code className="w-5 h-5 text-blue-400" />,
        color: "text-blue-400",
        image: null,
      }
    }

    // Roblox
    if (mainActivity.name.toLowerCase().includes("roblox")) {
      return {
        type: "Currently Playing",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state || "Playing Roblox",
        icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
        color: "text-orange-400",
        image: mainActivity.assets?.large_image
          ? `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`
          : null,
      }
    }

    // Generic activity
    return {
      type: "Currently Playing",
      name: mainActivity.name,
      details: mainActivity.details || mainActivity.state,
      icon: <Gamepad2 className="w-5 h-5 text-green-400" />,
      color: "text-green-400",
      image: mainActivity.assets?.large_image
        ? `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`
        : null,
    }
  }

  const activityInfo = getActivityInfo()

  if (loading) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-5 h-5 bg-gray-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">Activity</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!activityInfo) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Gamepad2 className="w-5 h-5 text-gray-400" />
          <span className="text-white text-sm font-medium">Activity</span>
        </div>
        <p className="text-gray-400 text-sm">Delta is not doing anything right now.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {activityInfo.icon}
        <span className="text-white text-sm font-medium">{activityInfo.type}</span>
      </div>

      {/* Activity Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
          {activityInfo.image ? (
            <img
              src={activityInfo.image || "/placeholder.svg"}
              alt="Activity image"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                target.nextElementSibling?.classList.remove("hidden")
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">{activityInfo.icon}</div>
          )}
          <div className="w-full h-full flex items-center justify-center hidden">{activityInfo.icon}</div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate">{activityInfo.name}</p>
          <p className="text-gray-400 text-xs truncate">{activityInfo.details}</p>
        </div>
      </div>

      {/* Elapsed Time */}
      {elapsedTime && (
        <div className="space-y-2">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div className="bg-blue-500 h-1 rounded-full w-1/3 animate-pulse" />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{elapsedTime}</span>
            <span>elapsed</span>
          </div>
        </div>
      )}
    </div>
  )
}
