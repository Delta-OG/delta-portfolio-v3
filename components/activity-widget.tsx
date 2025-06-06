"use client"

import { useState, useEffect } from "react"
import { Code, Gamepad2, Monitor, Headphones } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"

interface ActivityWidgetProps {
  data?: LanyardData | null
  loading?: boolean
}

export function ActivityWidget({ data, loading }: ActivityWidgetProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  // Get the main activity (playing, listening, etc.)
  const mainActivity = data?.activities?.find((activity) => activity.type === 0 || activity.type === 2)
  const spotifyData = data?.listening_to_spotify ? data.spotify : null

  useEffect(() => {
    if (!mainActivity?.timestamps || !mainActivity.timestamps.start) return

    const updateProgress = () => {
      const startTime = mainActivity.timestamps!.start!
      const now = Date.now()
      const elapsed = now - startTime

      setCurrentTime(elapsed)

      // Calculate progress for activities with end time
      if (mainActivity.timestamps!.end) {
        const duration = mainActivity.timestamps!.end - startTime
        const progressPercent = Math.min((elapsed / duration) * 100, 100)
        setProgress(progressPercent)
      }
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)

    return () => clearInterval(interval)
  }, [mainActivity])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getActivityInfo = () => {
    // Spotify takes priority
    if (spotifyData) {
      return {
        type: "Currently Listening",
        name: spotifyData.song,
        details: spotifyData.artist,
        icon: <Headphones className="w-5 h-5 text-green-400" />,
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        image: spotifyData.album_art_url,
        hasProgress: true,
        timestamps: spotifyData.timestamps,
      }
    }

    if (!mainActivity) return null

    // Visual Studio Code
    if (mainActivity.application_id === "383226320970055681" || mainActivity.name.includes("Visual Studio Code")) {
      return {
        type: "Coding",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state,
        icon: <Code className="w-5 h-5 text-blue-400" />,
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        image: null,
        hasProgress: false,
      }
    }

    // Roblox
    if (mainActivity.name.toLowerCase().includes("roblox")) {
      return {
        type: "Playing",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state,
        icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
        color: "text-orange-400",
        bgColor: "bg-orange-500/20",
        image: mainActivity.assets?.large_image
          ? `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`
          : null,
        hasProgress: false,
      }
    }

    // Generic game/application
    return {
      type: "Playing",
      name: mainActivity.name,
      details: mainActivity.details || mainActivity.state,
      icon: <Gamepad2 className="w-5 h-5 text-green-400" />,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      image: mainActivity.assets?.large_image
        ? `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`
        : null,
      hasProgress: false,
    }
  }

  const activityInfo = getActivityInfo()

  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm font-medium">Activity</span>
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
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm font-medium">Activity</span>
        </div>
        <p className="text-gray-400 text-sm">Delta is not doing anything right now.</p>
      </div>
    )
  }

  const totalDuration = activityInfo.timestamps ? activityInfo.timestamps.end - activityInfo.timestamps.start : 0

  return (
    <div className={`backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 ${activityInfo.bgColor}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
        <span className={`text-sm font-medium ${activityInfo.color}`}>{activityInfo.type}</span>
      </div>

      <div className="flex items-center gap-3">
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
          {activityInfo.details && <p className="text-gray-400 text-xs truncate">{activityInfo.details}</p>}
        </div>
      </div>

      {activityInfo.hasProgress && activityInfo.timestamps && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className={`h-1 rounded-full transition-all duration-1000 ease-linear ${activityInfo.color.includes("green") ? "bg-green-500" : "bg-blue-500"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {!activityInfo.hasProgress && mainActivity?.timestamps?.start && (
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">
              {Math.floor((Date.now() - mainActivity.timestamps.start) / 60000)}m elapsed
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
