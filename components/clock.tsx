"use client"

import { useState, useEffect } from "react"
import { ClockIcon } from "lucide-react"

export function Clock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    // دالة لتحديث الوقت
    const updateTime = () => {
      const now = new Date()
      const riyadhTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Riyadh",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      setTime(riyadhTime)
    }

    // تحديث الوقت فور التحميل
    updateTime()

    // تحديث الوقت كل ثانية
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <ClockIcon className="w-4 h-4" />
      <span>Riyadh: {time}</span>
    </div>
  )
}
