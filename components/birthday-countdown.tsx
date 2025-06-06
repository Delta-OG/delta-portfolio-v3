"use client"

import { useState, useEffect } from "react"
import { Gift } from "lucide-react"

export function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  }>({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set birthday to tomorrow at 5 AM
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(5, 0, 0, 0)

      const now = new Date()
      const difference = tomorrow.getTime() - now.getTime()

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  const isToday = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <Gift className="w-5 h-5 text-purple-400" />
        <span className="text-purple-400 font-medium">Birthday Countdown</span>
      </div>

      {isToday ? (
        <div className="text-center">
          <p className="text-white font-bold text-lg mb-2">🎉 Happy 16th Birthday! 🎉</p>
          <p className="text-purple-300 text-sm">Hope you have an amazing day!</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white font-medium mb-2">Turning 16 in:</p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-purple-500/20 rounded-lg px-3 py-2">
              <div className="text-white font-bold text-lg">{timeLeft.hours}</div>
              <div className="text-purple-300 text-xs">Hours</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg px-3 py-2">
              <div className="text-white font-bold text-lg">{timeLeft.minutes}</div>
              <div className="text-purple-300 text-xs">Minutes</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg px-3 py-2">
              <div className="text-white font-bold text-lg">{timeLeft.seconds}</div>
              <div className="text-purple-300 text-xs">Seconds</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
