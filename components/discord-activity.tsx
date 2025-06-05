import type { LanyardActivity } from "@/hooks/use-lanyard"
import { Code, Gamepad2, Headphones, Radio } from "lucide-react"

interface DiscordActivityProps {
  activity: LanyardActivity
  elapsedTime: string | null
}

export function DiscordActivity({ activity, elapsedTime }: DiscordActivityProps) {
  // Get the appropriate icon based on activity type
  const getActivityIcon = () => {
    // Discord activity types: 0 = Playing, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom, 5 = Competing
    switch (activity.type) {
      case 0: // Playing
        if (activity.application_id === "383226320970055681") {
          // Visual Studio Code
          return <Code className="w-5 h-5 text-blue-300" />
        }
        return <Gamepad2 className="w-5 h-5 text-green-300" />
      case 2: // Listening
        return <Headphones className="w-5 h-5 text-green-300" />
      default:
        return <Radio className="w-5 h-5 text-purple-300" />
    }
  }

  // Get activity type text
  const getActivityTypeText = () => {
    switch (activity.type) {
      case 0:
        return "Playing"
      case 1:
        return "Streaming"
      case 2:
        return "Listening to"
      case 3:
        return "Watching"
      case 5:
        return "Competing in"
      default:
        return ""
    }
  }

  // Get background color based on activity
  const getActivityBg = () => {
    if (activity.application_id === "383226320970055681") {
      return "bg-blue-600" // VS Code
    }

    switch (activity.type) {
      case 0:
        return "bg-green-600"
      case 2:
        return "bg-green-600"
      default:
        return "bg-purple-600"
    }
  }

  // Get the app icon or first letter
  const getAppIcon = () => {
    if (activity.application_id === "383226320970055681") {
      return "VS"
    }

    return activity.name.charAt(0)
  }

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 text-left border border-gray-700/30">
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 ${getActivityBg()} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}
        >
          <span className="text-sm font-bold text-white">{getAppIcon()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {getActivityIcon()}
            <p className="text-xs text-gray-400">{getActivityTypeText()}</p>
          </div>
          <p className="text-sm font-semibold text-white mt-1">{activity.name}</p>
          {activity.details && <p className="text-xs text-gray-400 mt-1">{activity.details}</p>}
          {activity.state && <p className="text-xs text-gray-300 mt-0.5">{activity.state}</p>}

          {elapsedTime && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">{elapsedTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
