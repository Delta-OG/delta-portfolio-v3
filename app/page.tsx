"use client"
import { useState, useCallback, useEffect } from "react"
import { useLanyard } from "@/hooks/use-lanyard"
import { DiscordWidget } from "@/components/discord-widget"
import { QuickLinks } from "@/components/quick-links"
import { SiteUpdateNotification } from "@/components/site-update-notification"
import { BirthdayCelebration } from "@/components/birthday-celebration"
import { SpotifyWidgetV23 } from "@/components/spotify-widget-v23"
import { ActivityWidgetV23 } from "@/components/activity-widget-v23"
import { SkillsSectionEnhanced } from "@/components/skills-section-enhanced"
import { Clock } from "lucide-react"

export default function Portfolio() {
  // Discord user ID
  const DISCORD_USER_ID = "1330617292798562401"
  const [showNotification, setShowNotification] = useState(false)
  const [isSpotifyPlaying, setIsSpotifyPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  // Use Lanyard hook to get real Discord data
  const { data: discordData, loading, refetch } = useLanyard(DISCORD_USER_ID)

  // Update local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = useCallback(() => {
    refetch?.()
  }, [refetch])

  const handleSpotifyStatusChange = useCallback((isPlaying: boolean) => {
    setIsSpotifyPlaying(isPlaying)
  }, [])

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

  // Dynamic background based on Spotify status
  const getBackgroundStyle = () => {
    if (isSpotifyPlaying) {
      return "bg-gradient-to-br from-green-900/20 via-gray-800 to-gray-900"
    }
    return "bg-gradient-to-br from-red-900/20 via-gray-800 to-gray-900"
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 p-4 ${getBackgroundStyle()}`}>
      {/* Birthday Celebration */}
      <BirthdayCelebration />

      {/* Site Update Button - Floating */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowNotification(true)}
          className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-full p-3 hover:bg-gray-700/90 transition-all shadow-lg hover:shadow-purple-500/20"
          aria-label="Show updates"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </button>
      </div>

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

          {/* Location, Age & Time - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2">
              <div className="text-gray-400 text-xs uppercase tracking-wide">Location</div>
              <div className="text-white font-semibold">MA</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2">
              <div className="text-gray-400 text-xs uppercase tracking-wide">Age</div>
              <div className="text-white font-semibold">16</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2">
              <div className="text-gray-400 text-xs uppercase tracking-wide flex items-center gap-1">
                <Clock className="w-3 h-3" /> Local Time
              </div>
              <div className="text-white font-semibold font-mono">{currentTime}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-red-400 text-sm mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
            <span>Do Not Disturb - Busy</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <DiscordWidget data={discordData} loading={loading} onRefresh={handleRefresh} />
            <SkillsSectionEnhanced />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <SpotifyWidgetV23 data={discordData} loading={loading} onStatusChange={handleSpotifyStatusChange} />
            <QuickLinks />
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <ActivityWidgetV23 data={discordData} loading={loading} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>💻</span>
            <span>© 2024 - crafted with passion</span>
          </div>
        </div>
      </div>
    </div>
  )
}
