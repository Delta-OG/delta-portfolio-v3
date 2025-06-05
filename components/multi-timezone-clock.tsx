"use client"

import { useState, useEffect } from "react"
import { ClockIcon } from "lucide-react"

interface TimeZone {
  name: string
  timezone: string
  flag: string
}

const timezones: TimeZone[] = [
  { name: "Riyadh", timezone: "Asia/Riyadh", flag: "🇸🇦" },
  { name: "New York", timezone: "America/New_York", flag: "🇺🇸" },
  { name: "Casablanca", timezone: "Africa/Casablanca", flag: "🇲🇦" },
  { name: "Dubai", timezone: "Asia/Dubai", flag: "🇦🇪" },
]

export function MultiTimezoneClockComponent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const currentTimezone = timezones[currentIndex]
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: currentTimezone.timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      setTime(timeString)
    }

    // Update time immediately
    updateTime()

    // Update time every second
    const timeInterval = setInterval(updateTime, 1000)

    // Change timezone every 30 seconds
    const timezoneInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % timezones.length)
    }, 30000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(timezoneInterval)
    }
  }, [currentIndex])

  const currentTimezone = timezones[currentIndex]

  return (
    <div className="flex items-center gap-2 text-sm text-white/80 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
      <ClockIcon className="w-4 h-4" />
      <span className="font-mono">
        {currentTimezone.flag} {currentTimezone.name}: {time}
      </span>
    </div>
  )
}
