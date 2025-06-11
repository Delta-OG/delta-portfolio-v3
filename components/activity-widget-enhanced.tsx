"use client"

import { useState, useEffect } from "react"
import { Code, Gamepad2, Monitor, Headphones } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"
import type { SpotifyTrack } from "@/hooks/use-spotify"
import { SpotlightCard } from "./spotlight-card"
import { PlatformIcons } from "./platform-icons"

interface ActivityWidgetEnhancedProps {
  discordData?: LanyardData | null
  spotifyTrack?: SpotifyTrack | null
  loading?: boolean
  isOnline?: boolean
}

export function ActivityWidgetEnhanced({
  discordData,
  spotifyTrack,
  loading,
  isOnline = false,
}: ActivityWidgetEnhancedProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  // Get the main activity from Discord
  const mainActivity = discordData?.activities?.find((activity) => activity.type === 0)

  useEffect(() => {
    if (!spotifyTrack?.is_playing || !spotifyTrack.timestamps) return

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - spotifyTrack.timestamps!.start
      const progressPercent = Math.min((elapsed / spotifyTrack.duration_ms) * 100, 100)

      setCurrentTime(elapsed)
      setProgress(progressPercent)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)

    return () => clearInterval(interval)
  }, [spotifyTrack])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Get spotlight color based on status
  const getSpotlightColor = () => {
    if (spotifyTrack?.is_playing) return "rgba(30, 215, 96, 0.15)" // Spotify green
    if (isOnline) return "rgba(88, 101, 242, 0.15)" // Discord blue
    return "rgba(255, 68, 68, 0.15)" // Red for offline
  }

  // Get border color based on status
  const getBorderColor = () => {
    if (spotifyTrack?.is_playing) return "rgba(30, 215, 96, 0.3)" // Spotify green
    if (isOnline) return "rgba(88, 101, 242, 0.3)" // Discord blue
    return "rgba(255, 68, 68, 0.3)" // Red for offline
  }

  const getActivityInfo = () => {
    // Spotify takes priority
    if (spotifyTrack?.is_playing) {
      return {
        type: "Currently Listening",
        name: spotifyTrack.name,
        details: `by ${spotifyTrack.artist}`,
        icon: <Headphones className="w-5 h-5 text-green-400" />,
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
        image: spotifyTrack.album_art_url,
        hasProgress: true,
        platform: "Spotify",
        platformIcon: <PlatformIcons.Spotify className="w-4 h-4 text-green-500" />,
      }
    }

    if (!mainActivity) return null

    // Visual Studio Code
    if (mainActivity.application_id === "383226320970055681" || mainActivity.name.includes("Visual Studio Code")) {
      return {
        type: "Currently Coding",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state || "Workspace: delta-portfolio",
        icon: <Code className="w-5 h-5 text-blue-400" />,
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        image: null,
        hasProgress: false,
        platform: "VS Code",
        platformIcon: <PlatformIcons.VSCode className="w-4 h-4 text-blue-500" />,
      }
    }

    // Roblox
    if (mainActivity.name.toLowerCase().includes("roblox") || mainActivity.application_id === "363472714589413376") {
      return {
        type: "Currently Playing",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state || "Playing Roblox",
        icon: <Gamepad2 className="w-5 h-5 text-orange-400" />,
        color: "text-orange-400",
        bgColor: "bg-orange-500/20",
        borderColor: "border-orange-500/30",
        image: mainActivity.assets?.large_image
          ? `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`
          : null,
        hasProgress: false,
        platform: "Roblox",
        platformIcon: <PlatformIcons.Roblox className="w-4 h-4 text-orange-500" />,
      }
    }

    // FiveM
    if (mainActivity.name.toLowerCase().includes("fivem") || mainActivity.application_id === "356876176465199104") {
      return {
        type: "Currently Playing",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state || "Playing FiveM",
        icon: <Gamepad2 className="w-5 h-5 text-purple-400" />,
        color: "text-purple-400",
        bgColor: "bg-purple-500/20",
        borderColor: "border-purple-500/30",
        image: null,
        hasProgress: false,
        platform: "FiveM",
        platformIcon: <PlatformIcons.FiveM className="w-4 h-4 text-purple-500" />,
      }
    }

    // Discord
    if (mainActivity.name.toLowerCase().includes("discord")) {
      return {
        type: "Using Discord",
        name: mainActivity.name,
        details: mainActivity.details || mainActivity.state || "In voice channel",
        icon: <Monitor className="w-5 h-5 text-indigo-400" />,
        color: "text-indigo-400",
        bgColor: "bg-indigo-500/20",
        borderColor: "border-indigo-500/30",
        image: null,
        hasProgress: false,
        platform: "Discord",
        platformIcon: <PlatformIcons.Discord className="w-4 h-4 text-indigo-500" />,
      }
    }

    // Generic activity
    return {
      type: "Currently Playing",
      name: mainActivity.name,
      details: mainActivity.details || mainActivity.state,
      icon: <Gamepad2 className="w-5 h-5 text-green-400" />,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      image: mainActivity.assets?.large_image
        ? `https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`
        : null,
      hasProgress: false,
      platform: "Game",
      platformIcon: <PlatformIcons.Game className="w-4 h-4 text-green-500" />,
    }
  }

  const activityInfo = getActivityInfo()

  if (loading) {
    return (
      <SpotlightCard
        className="p-4 border-gray-800/50"
        spotlightColor="rgba(255, 255, 255, 0.1)"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm font-medium">Activity</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </SpotlightCard>
    )
  }

  if (!activityInfo) {
    return (
      <SpotlightCard
        className="p-4 border-gray-800/50"
        spotlightColor={getSpotlightColor()}
        borderColor={getBorderColor()}
      >
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 text-sm font-medium">Activity</span>
        </div>
        <p className="text-gray-400 text-sm">No current activity detected</p>
      </SpotlightCard>
    )
  }

  const totalDuration = spotifyTrack?.duration_ms || 0

  return (
    <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
          <span className={`text-sm font-medium ${activityInfo.color}`}>{activityInfo.type}</span>
        </div>
        <div className="flex items-center gap-2">
          {activityInfo.platformIcon}
          <span className="text-xs text-gray-400">{activityInfo.platform}</span>
        </div>
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
          {activityInfo.details && <p className="text-gray-400 text-xs truncate">{activityInfo.details}</p>}
        </div>
      </div>

      {/* Progress Bar for Spotify */}
      {activityInfo.hasProgress && spotifyTrack && (
        <div className="space-y-2">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className={`h-1 rounded-full transition-all duration-1000 ease-linear ${activityInfo.color.includes("green") ? "bg-green-500" : "bg-blue-500"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>
      )}

      {/* Elapsed Time for Discord Activities */}
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
    </SpotlightCard>
  )
}
