"use client"

import { Gamepad2 } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"
import { SpotlightCard } from "./spotlight-card"
import { PlatformIcons } from "./platform-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DiscordWidgetProps {
  data?: LanyardData | null
  loading?: boolean
  isOnline?: boolean
}

export function DiscordWidget({ data, loading, isOnline = false }: DiscordWidgetProps) {
  // Get spotlight color based on status
  const getSpotlightColor = () => {
    if (
      isOnline ||
      data?.discord_status === "online" ||
      data?.discord_status === "idle" ||
      data?.discord_status === "dnd"
    ) {
      return "rgba(88, 101, 242, 0.15)" // Discord blue
    }
    return "rgba(255, 68, 68, 0.15)" // Red for offline
  }

  // Get border color based on status
  const getBorderColor = () => {
    if (
      isOnline ||
      data?.discord_status === "online" ||
      data?.discord_status === "idle" ||
      data?.discord_status === "dnd"
    ) {
      return "rgba(88, 101, 242, 0.3)" // Discord blue
    }
    return "rgba(255, 68, 68, 0.3)" // Red for offline
  }

  if (loading) {
    return (
      <SpotlightCard
        className="p-4 border-border"
        spotlightColor="rgba(255, 255, 255, 0.1)"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex items-center gap-3 mb-3">
          <PlatformIcons.Discord className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Discord</span>
          <div className="w-2 h-2 bg-muted rounded-full animate-pulse ml-auto"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </SpotlightCard>
    )
  }

  if (!data) {
    return (
      <SpotlightCard className="p-4 border-border" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
        <div className="flex items-center gap-3 mb-3">
          <PlatformIcons.Discord className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Discord</span>
        </div>
        <p className="text-muted-foreground text-sm">Not connected to Discord</p>
      </SpotlightCard>
    )
  }

  const getStatusColor = () => {
    switch (data.discord_status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = () => {
    switch (data.discord_status) {
      case "online":
        return "Online"
      case "idle":
        return "Idle"
      case "dnd":
        return "Do Not Disturb"
      default:
        return "Offline"
    }
  }

  const mainActivity = data.activities?.find((activity) => activity.type === 0)

  return (
    <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
      <div className="flex items-center gap-3 mb-3">
        <PlatformIcons.Discord className="w-5 h-5 text-blue-400" />
        <span className="text-blue-400 text-sm font-medium">Discord</span>
        <div className="flex items-center gap-2 ml-auto">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}></div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              data.discord_user.avatar
                ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`
                : undefined
            }
            alt="Discord avatar"
          />
          <AvatarFallback>{data.discord_user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium text-sm truncate">
            {data.discord_user.global_name || data.discord_user.username}
          </p>
          <p className="text-muted-foreground text-xs">{getStatusText()}</p>
        </div>
      </div>

      {mainActivity ? (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 mb-1">
            <Gamepad2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-xs font-medium">Playing</span>
          </div>
          <p className="text-foreground text-sm font-medium">{mainActivity.name}</p>
          {mainActivity.details && <p className="text-muted-foreground text-xs">{mainActivity.details}</p>}
          {mainActivity.state && <p className="text-muted-foreground text-xs">{mainActivity.state}</p>}
        </div>
      ) : (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-muted-foreground text-sm">Delta is not doing anything right now.</p>
        </div>
      )}
    </SpotlightCard>
  )
}
