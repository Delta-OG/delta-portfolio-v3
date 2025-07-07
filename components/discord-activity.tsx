"use client"

import { useState, useEffect } from "react"
import { SpotlightCard } from "./spotlight-card"
import { PlatformIcons } from "./platform-icons"
import type { LanyardData } from "@/hooks/use-lanyard"
import { Gamepad2, Headphones } from "lucide-react"

interface DiscordActivityProps {
  data?: LanyardData | null
  loading?: boolean
  isOnline?: boolean
}

export function DiscordActivity({ data, loading, isOnline = false }: DiscordActivityProps) {
  const [progress, setProgress] = useState(0)

  // Update progress for Spotify from Discord
  useEffect(() => {
    if (!data?.listening_to_spotify || !data.spotify?.timestamps) return

    const updateProgress = () => {
      const now = Date.now()
      const start = data.spotify.timestamps.start
      const end = data.spotify.timestamps.end
      const elapsed = now - start
      const total = end - start
      const progressPercent = Math.min((elapsed / total) * 100, 100)
      setProgress(progressPercent)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [data])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getCurrentTime = () => {
    if (!data?.spotify?.timestamps) return "0:00"
    const now = Date.now()
    const elapsed = now - data.spotify.timestamps.start
    return formatTime(elapsed)
  }

  const getTotalTime = () => {
    if (!data?.spotify?.timestamps) return "0:00"
    const total = data.spotify.timestamps.end - data.spotify.timestamps.start
    return formatTime(total)
  }

  // Get main activity (non-Spotify)
  const mainActivity = data?.activities?.find((activity) => activity.type === 0)

  // Get spotlight color based on status
  const getSpotlightColor = () => {
    if (data?.listening_to_spotify) return "rgba(30, 215, 96, 0.15)" // Spotify green
    if (isOnline) return "rgba(88, 101, 242, 0.15)" // Discord blue
    return "rgba(255, 68, 68, 0.15)" // Red for offline
  }

  const getBorderColor = () => {
    if (data?.listening_to_spotify) return "rgba(30, 215, 96, 0.3)" // Spotify green
    if (isOnline) return "rgba(88, 101, 242, 0.3)" // Discord blue
    return "rgba(255, 68, 68, 0.3)" // Red for offline
  }

  if (loading) {
    return (
      <SpotlightCard
        className="p-4 border-border"
        spotlightColor="rgba(255, 255, 255, 0.1)"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </SpotlightCard>
    )
  }

  // Priority: Spotify from Discord > Main Activity > Nothing
  if (data?.listening_to_spotify && data.spotify) {
    return (
      <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
        {/* Spotify Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Listening on Spotify</span>
          </div>
          <PlatformIcons.Spotify className="w-5 h-5 text-green-500" />
        </div>

        {/* Track Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            {data.spotify.album_art_url ? (
              <img
                src={data.spotify.album_art_url || "/placeholder.svg"}
                alt="Album art"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PlatformIcons.Spotify className="w-6 h-6 text-green-500" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium text-sm truncate">{data.spotify.song}</p>
            <p className="text-muted-foreground text-xs truncate">by {data.spotify.artist}</p>
            <p className="text-muted-foreground text-xs truncate">{data.spotify.album}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{getCurrentTime()}</span>
            <span>{getTotalTime()}</span>
          </div>
        </div>
      </SpotlightCard>
    )
  }

  // Show main activity if available
  if (mainActivity) {
    // Determine the correct platform icon based on the activity
    const getPlatformInfo = () => {
      // Visual Studio Code
      if (mainActivity.application_id === "383226320970055681" || mainActivity.name.includes("Visual Studio Code")) {
        return {
          icon: <PlatformIcons.VSCode className="w-5 h-5 text-blue-500" />,
          type: "Coding",
          color: "text-blue-400",
          platformName: "VS Code",
        }
      }

      // Roblox
      if (mainActivity.name.toLowerCase().includes("roblox") || mainActivity.application_id === "363472714589413376") {
        return {
          icon: <PlatformIcons.Roblox className="w-5 h-5 text-orange-500" />,
          type: "Playing",
          color: "text-orange-400",
          platformName: "Roblox",
        }
      }

      // FiveM
      if (mainActivity.name.toLowerCase().includes("fivem") || mainActivity.application_id === "356876176465199104") {
        return {
          icon: <PlatformIcons.FiveM className="w-5 h-5 text-purple-500" />,
          type: "Playing",
          color: "text-purple-400",
          platformName: "FiveM",
        }
      }

      // Discord
      if (mainActivity.name.toLowerCase().includes("discord")) {
        return {
          icon: <PlatformIcons.Discord className="w-5 h-5 text-indigo-500" />,
          type: "Using",
          color: "text-indigo-400",
          platformName: "Discord",
        }
      }

      // Discord.js Development
      if (
        mainActivity.name.toLowerCase().includes("discord") ||
        mainActivity.details?.toLowerCase().includes("discord.js") ||
        mainActivity.state?.toLowerCase().includes("bot")
      ) {
        return {
          icon: <img src="/images/discord-js-logo.png" alt="Discord.js" className="w-5 h-5" />,
          type: "Developing",
          color: "text-blue-400",
          platformName: "Discord.js",
        }
      }

      // Default game
      return {
        icon: <Gamepad2 className="w-5 h-5 text-green-500" />,
        type: "Playing",
        color: "text-green-400",
        platformName: mainActivity.name,
      }
    }

    const platformInfo = getPlatformInfo()

    return (
      <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
        {/* Activity Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className={`text-sm font-medium ${platformInfo.color}`}>Currently {platformInfo.type}</span>
          </div>
          {platformInfo.icon}
        </div>

        {/* Activity Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
            {mainActivity.assets?.large_image ? (
              <img
                src={`https://cdn.discordapp.com/app-assets/${mainActivity.application_id}/${mainActivity.assets.large_image}.png`}
                alt="Activity image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement!.innerHTML = platformInfo.icon.props.className
                    ? `<div class="${platformInfo.icon.props.className}">${platformInfo.icon}</div>`
                    : platformInfo.icon.toString()
                }}
              />
            ) : (
              platformInfo.icon
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-foreground font-medium text-sm truncate">{mainActivity.name}</p>
            {mainActivity.details && <p className="text-muted-foreground text-xs truncate">{mainActivity.details}</p>}
            {mainActivity.state && <p className="text-muted-foreground text-xs truncate">{mainActivity.state}</p>}
          </div>
        </div>

        {/* Elapsed Time */}
        {mainActivity.timestamps?.start && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">
              {Math.floor((Date.now() - mainActivity.timestamps.start) / 60000)}m elapsed
            </span>
          </div>
        )}
      </SpotlightCard>
    )
  }

  // No activity
  return (
    <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
      <div className="flex items-center gap-3 mb-3">
        <PlatformIcons.Discord className="w-5 h-5 text-muted-foreground" />
        <span className="text-muted-foreground text-sm font-medium">Activity</span>
      </div>
      <p className="text-muted-foreground text-sm">No current activity detected</p>
    </SpotlightCard>
  )
}
