"use client"
import { useState, useCallback } from "react"
import { useLanyard } from "@/hooks/use-lanyard"
import { DiscordWidget } from "@/components/discord-widget"
import { LastActivity } from "@/components/last-activity"
import { SkillsSection } from "@/components/skills-section"
import { QuickLinks } from "@/components/quick-links"
import { CasablancaTime } from "@/components/casablanca-time"
import { BirthdayCountdown } from "@/components/birthday-countdown"
import { DemoFounders } from "@/components/demo-founders"
import { SiteUpdateNotification } from "@/components/site-update-notification"

export default function Portfolio() {
  // Discord user ID
  const DISCORD_USER_ID = "1330617292798562401"
  const [currentAge, setCurrentAge] = useState(15)
  const [showNotification, setShowNotification] = useState(true)

  // Use Lanyard hook to get real Discord data
  const { data: discordData, loading, refetch } = useLanyard(DISCORD_USER_ID)

  const handleBirthdayComplete = useCallback(() => {
    setCurrentAge(16)
  }, [])

  const handleRefresh = useCallback(() => {
    refetch?.()
  }, [refetch])

  // Get status color for profile picture indicator
  const getProfileStatusColor = () => {
    if (!discordData) return "bg-gray-500"

    switch (discordData.discord_status) {
      case "online":
        return "bg-green-500 shadow-lg shadow-green-500/50"
      case "idle":
        return "bg-yellow-500 shadow-lg shadow-yellow-500/50"
      case "dnd":
        return "bg-red-500 shadow-lg shadow-red-500/50"
      default:
        return "bg-gray-500 shadow-lg shadow-gray-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Site Update Notification */}
      {showNotification && <SiteUpdateNotification onClose={() => setShowNotification(false)} />}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tswirtyeye%20circle.jpg-0Kk2zxuS9K8WYu1bnGeBxhg8jqf3AB.jpeg"
              alt="Delta's Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-600 mx-auto mb-4"
            />
            <div
              className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-gray-900 animate-pulse ${getProfileStatusColor()}`}
            ></div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">Delta</h1>
          <p className="text-gray-400 text-lg mb-4">creative developer</p>

          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2">
              <div className="text-gray-400 text-xs uppercase tracking-wide">Location</div>
              <div className="text-white font-semibold">MA</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2">
              <div className="text-gray-400 text-xs uppercase tracking-wide">Age</div>
              <div className="text-white font-semibold">{currentAge}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-red-400 text-sm mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
            <span>Do Not Disturb - Busy</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <DiscordWidget data={discordData} loading={loading} onRefresh={handleRefresh} />
            <SkillsSection />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <LastActivity data={discordData} loading={loading} />
            <QuickLinks />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <BirthdayCountdown onBirthdayComplete={handleBirthdayComplete} />
            <DemoFounders />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-between max-w-md mx-auto text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span>💻</span>
              <span>© 2024 - crafted with passion</span>
            </div>
            <CasablancaTime />
          </div>
        </div>
      </div>
    </div>
  )
}
