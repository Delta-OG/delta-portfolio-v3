"use client"
import { useState, useEffect } from "react"
import { useLanyard } from "@/hooks/use-lanyard"
import { DiscordWidget } from "@/components/discord-widget"
import { QuickLinks } from "@/components/quick-links"
import { SiteUpdateAlert } from "@/components/site-update-alert"
import { DiscordActivityEnhanced } from "@/components/discord-activity-enhanced"
import { SkillsSectionEnhanced } from "@/components/skills-section-enhanced"
import { DynamicBackground } from "@/components/dynamic-background"
import { ScrambledText } from "@/components/scrambled-text"
import { VerifiedBadge } from "@/components/verified-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { FAQAccordion } from "@/components/faq-accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

export default function Portfolio() {
  // Discord user ID
  const DISCORD_USER_ID = "1330617292798562401"
  const [showNotification, setShowNotification] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  // Use hooks to get real data
  const { data: discordData, loading: discordLoading } = useLanyard(DISCORD_USER_ID)

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

  // Determine status for background and cards
  const isDiscordOnline =
    discordData?.discord_status === "online" ||
    discordData?.discord_status === "idle" ||
    discordData?.discord_status === "dnd"

  const isSpotifyPlaying = discordData?.listening_to_spotify || false

  // Get status color for profile picture indicator
  const getProfileStatusColor = () => {
    if (isSpotifyPlaying) {
      return "bg-green-500 shadow-lg shadow-green-500/50"
    } else if (isDiscordOnline) {
      return "bg-blue-500 shadow-lg shadow-blue-500/50"
    } else {
      return "bg-red-500 shadow-lg shadow-red-500/50"
    }
  }

  // Get status text based on priority
  const getStatusText = () => {
    if (isSpotifyPlaying) {
      return "Listening to Music"
    } else if (isDiscordOnline) {
      return "Online"
    } else {
      return "Offline"
    }
  }

  // Get status dot color
  const getStatusDotColor = () => {
    if (isSpotifyPlaying) {
      return "bg-green-500 shadow-lg shadow-green-500/50"
    } else if (isDiscordOnline) {
      return "bg-blue-500 shadow-lg shadow-blue-500/50"
    } else {
      return "bg-red-500 shadow-lg shadow-red-500/50"
    }
  }

  return (
    <div className="min-h-screen relative bg-background">
      {/* Dynamic Background with Beams */}
      <DynamicBackground isDiscordOnline={isDiscordOnline} isSpotifyPlaying={isSpotifyPlaying} />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen p-4">
        {/* Header with Theme Toggle */}
        <div className="fixed top-4 right-4 z-40">
          <ThemeToggle />
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
          {/* Updates Button */}
          <button
            onClick={() => setShowNotification(true)}
            className="bg-background/90 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-muted/90 transition-all shadow-lg hover:shadow-purple-500/20"
            aria-label="Show updates"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </button>
        </div>

        {/* Site Update Alert */}
        {showNotification && <SiteUpdateAlert onClose={() => setShowNotification(false)} />}

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-border">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tswirtyeye%20circle.jpg-0Kk2zxuS9K8WYu1bnGeBxhg8jqf3AB.jpeg"
                  alt="Delta's Profile"
                />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div
                className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-background animate-pulse ${getProfileStatusColor()}`}
              ></div>
            </div>

            <div className="flex items-center justify-center mb-2">
              <h1 className="text-4xl font-bold text-foreground">
                <ScrambledText text="Delta" className="text-4xl font-bold text-foreground" />
              </h1>
              <VerifiedBadge />
            </div>
            <p className="text-muted-foreground text-lg mb-4">creative developer</p>

            {/* Location, Age & Time - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
              <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Location</div>
                <div className="text-foreground font-semibold">MA</div>
              </div>
              <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Age</div>
                <div className="text-foreground font-semibold">16</div>
              </div>
              <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
                <div className="text-muted-foreground text-xs uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Local Time
                </div>
                <div className="text-foreground font-semibold font-mono">{currentTime}</div>
              </div>
            </div>

            {/* Dynamic Status Display */}
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusDotColor()}`}></div>
              <span
                className={isSpotifyPlaying ? "text-green-400" : isDiscordOnline ? "text-blue-400" : "text-red-400"}
              >
                {getStatusText()}
              </span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <DiscordWidget data={discordData} loading={discordLoading} isOnline={isDiscordOnline} />
              <SkillsSectionEnhanced isOnline={isDiscordOnline} />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <DiscordActivityEnhanced data={discordData} loading={discordLoading} isOnline={isDiscordOnline} />
              <QuickLinks isOnline={isDiscordOnline} />
            </div>

            {/* Right Column */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">{/* Additional content can go here */}</div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-8">
            <FAQAccordion />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <span>💻</span>
              <span>© 2024 - crafted with passion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
