interface DiscordStatusAvatarProps {
  src: string
  alt: string
  status: "online" | "idle" | "dnd" | "offline"
  size?: number
}

export function DiscordStatusAvatar({ src, alt, status, size = 128 }: DiscordStatusAvatarProps) {
  const getStatusColor = (status: string) => {
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

  const statusSize = size > 100 ? "w-8 h-8" : "w-6 h-6"
  const statusPosition = size > 100 ? "bottom-2 right-2" : "bottom-1 right-1"

  return (
    <div className="relative inline-block">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`rounded-full object-cover border-4 border-white/30 shadow-xl ring-4 ring-purple-500/30`}
        style={{ width: size, height: size }}
      />
      {/* Discord-style status indicator */}
      <div
        className={`absolute ${statusPosition} ${statusSize} ${getStatusColor(
          status,
        )} rounded-full border-4 border-white shadow-lg`}
      />
    </div>
  )
}
