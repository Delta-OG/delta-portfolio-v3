"use client"

import { MessageCircle, Gamepad2 } from "lucide-react"
import type { LanyardData } from "@/hooks/use-lanyard"

interface DiscordWidgetProps {
  data?: LanyardData | null
  loading?: boolean
}

export function DiscordWidget({ data, loading }: DiscordWidgetProps) {
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Discord</span>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse ml-auto"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Discord</span>
          <div className="w-2 h-2 bg-gray-500 rounded-full ml-auto"></div>
        </div>
        <p className="text-gray-400 text-sm">Not connected to Discord</p>
      </div>
    )
  }

  const getStatusColor = () => {
    switch (data.discord_status) {
      case "online":
        return "bg-green-500 status-glow-green"
      case "idle":
        return "bg-yellow-500 status-glow-yellow"
      case "dnd":
        return "bg-red-500 status-glow-red"
      default:
        return "bg-gray-500 status-glow-gray"
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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <MessageCircle className="w-5 h-5 text-blue-400" />
        <span className="text-blue-400 text-sm font-medium">Discord</span>
        <div className={`w-2 h-2 rounded-full ml-auto ${getStatusColor()}`}></div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          {data.discord_user.avatar ? (
            <img
              src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`}
              alt="Discord avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {data.discord_user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate">
            {data.discord_user.global_name || data.discord_user.username}
          </p>
          <p className="text-gray-400 text-xs">{getStatusText()}</p>
        </div>
      </div>

      {mainActivity ? (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Gamepad2 className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-xs font-medium">Playing</span>
          </div>
          <p className="text-white text-sm font-medium">{mainActivity.name}</p>
          {mainActivity.details && <p className="text-gray-400 text-xs">{mainActivity.details}</p>}
          {mainActivity.state && <p className="text-gray-400 text-xs">{mainActivity.state}</p>}
        </div>
      ) : (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-gray-400 text-sm">Delta is not doing anything right now.</p>
        </div>
      )}
    </div>
  )
}
