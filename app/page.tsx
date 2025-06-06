"use client"
import { useLanyard } from "@/hooks/use-lanyard"
import { DiscordWidget } from "@/components/discord-widget"
import { SpotifyWidget } from "@/components/spotify-widget"
import { SkillsSection } from "@/components/skills-section"
import { QuickLinks } from "@/components/quick-links"
import { CasablancaTime } from "@/components/casablanca-time"
import { BirthdayCountdown } from "@/components/birthday-countdown"

export default function Portfolio() {
  // Discord user ID
  const DISCORD_USER_ID = "1330617292798562401"

  // Use Lanyard hook to get real Discord data
  const { data: discordData, loading } = useLanyard(DISCORD_USER_ID)

  // Extract Spotify data from Discord activities
  const spotifyData = discordData?.listening_to_spotify ? discordData.spotify : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tswirtyeye%20circle.jpg-0Kk2zxuS9K8WYu1bnGeBxhg8jqf3AB.jpeg"
              alt="Delta's Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-600 mx-auto mb-4"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 shadow-lg shadow-green-500/50 animate-pulse"></div>
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
              <div className="text-white font-semibold">15</div>
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
            <DiscordWidget data={discordData} loading={loading} />
            <SkillsSection />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <SpotifyWidget
              track={
                spotifyData
                  ? {
                      name: spotifyData.song,
                      artist: spotifyData.artist,
                      album_art_url: spotifyData.album_art_url,
                      timestamps: spotifyData.timestamps,
                    }
                  : null
              }
              isPlaying={discordData?.listening_to_spotify}
            />
            <QuickLinks />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <BirthdayCountdown />
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
