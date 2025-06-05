interface DiscordStatusProps {
  status: "online" | "idle" | "dnd" | "offline"
}

export function DiscordStatus({ status }: DiscordStatusProps) {
  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      case "offline":
      default:
        return "bg-gray-500"
    }
  }

  // Get status text
  const getStatusText = () => {
    switch (status) {
      case "online":
        return "Online"
      case "idle":
        return "Idle"
      case "dnd":
        return "Do Not Disturb"
      case "busy":
      default:
        return "Offline"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`} />
      <span className="text-sm font-medium text-white/80">{getStatusText()}</span>
    </div>
  )
}
