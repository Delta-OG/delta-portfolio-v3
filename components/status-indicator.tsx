interface StatusIndicatorProps {
  status: "online" | "idle" | "dnd" | "offline"
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  // تحديد اللون والنص حسب الحالة
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "online":
        return { color: "bg-green-500", text: "Online", textColor: "text-green-600" }
      case "idle":
        return { color: "bg-yellow-500", text: "Away", textColor: "text-yellow-600" }
      case "dnd":
        return { color: "bg-red-500", text: "Do Not Disturb", textColor: "text-red-600" }
      case "offline":
      default:
        return { color: "bg-gray-500", text: "Offline", textColor: "text-gray-600" }
    }
  }

  const config = getStatusConfig(status)

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${config.color} animate-pulse`} />
      <span className={`text-sm font-medium ${config.textColor}`}>{config.text}</span>
    </div>
  )
}
