"use client"
import { useState } from "react"
import { useLanyard } from "@/hooks/use-lanyard"
import { DiscordWidget } from "@/components/discord-widget"
import { QuickLinks } from "@/components/quick-links"
import { DiscordActivity } from "@/components/discord-activity"
import { SkillsSectionEnhanced } from "@/components/skills-section-enhanced"
import { RobloxWidget } from "@/components/roblox-widget"
import { DynamicBackground } from "@/components/dynamic-background"
import { ScrambledText } from "@/components/scrambled-text"
import { VerifiedBadge } from "@/components/verified-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { SiteUpdateNotification } from "@/components/site-update-notification"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { X } from "lucide-react"
// Remove the Sparkles import entirely

export default function Portfolio() {
  // Discord user ID
  const DISCORD_USER_ID = "1330617292798562401"

  // Use hooks to get real data
  const { data: discordData, loading: discordLoading } = useLanyard(DISCORD_USER_ID)

  // State for updates notification
  const [showUpdates, setShowUpdates] = useState(false)
  const [showFooterLinks, setShowFooterLinks] = useState(false)

  // Determine status for background and cards
  const isDiscordOnline =
    discordData?.discord_status === "online" ||
    discordData?.discord_status === "idle" ||
    discordData?.discord_status === "dnd"

  // Get status color for profile picture indicator
  const getProfileStatusColor = () => {
    if (isDiscordOnline) {
      return "bg-blue-500 shadow-lg shadow-blue-500/50"
    } else {
      return "bg-red-500 shadow-lg shadow-red-500/50"
    }
  }

  // Get status text
  const getStatusText = () => {
    if (isDiscordOnline) {
      return "Online"
    } else {
      return "Offline"
    }
  }

  // Get status dot color
  const getStatusDotColor = () => {
    if (isDiscordOnline) {
      return "bg-blue-500 shadow-lg shadow-blue-500/50"
    } else {
      return "bg-red-500 shadow-lg shadow-red-500/50"
    }
  }

  return (
    <div className="min-h-screen relative bg-background">
      {/* Dynamic Background with Beams */}
      <DynamicBackground isDiscordOnline={isDiscordOnline} />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen p-4">
        {/* Header with Theme Toggle and Updates Button */}
        <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
          <ThemeToggle />
        </div>

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

            {/* Dynamic Status Display */}
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusDotColor()}`}></div>
              <span className={isDiscordOnline ? "text-blue-400" : "text-red-400"}>{getStatusText()}</span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <DiscordWidget data={discordData} loading={discordLoading} isOnline={isDiscordOnline} />
              <RobloxWidget isOnline={isDiscordOnline} />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <DiscordActivity data={discordData} loading={discordLoading} isOnline={isDiscordOnline} />
              <SkillsSectionEnhanced isOnline={isDiscordOnline} />
            </div>

            {/* Right Column */}
            <div className="space-y-6 md:col-span-2 lg:col-span-1">
              <QuickLinks isOnline={isDiscordOnline} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <span>💻</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span
                    className="cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => setShowFooterLinks(!showFooterLinks)}
                  >
                    @2025 - @DeMoNetWork
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-48">
                  <p className="text-sm">Affiliated For Delta</p>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Expandable Links Section */}
            {showFooterLinks && (
              <div className="mt-4 p-4 bg-background/50 backdrop-blur-sm border border-border rounded-lg max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground font-medium text-sm">DeMo Network</h3>
                  <button
                    onClick={() => setShowFooterLinks(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <a
                  href="https://x.com/DeMoNerwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-foreground text-sm">@DeMoNerwork</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Updates Notification */}
      {showUpdates && <SiteUpdateNotification onClose={() => setShowUpdates(false)} />}
    </div>
  )
}
