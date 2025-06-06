"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CasablancaTime() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const casablancaTime = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Casablanca",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      setTime(casablancaTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <Clock className="w-4 h-4" />
      <span>Last seen: {time}</span>
    </div>
  )
}
