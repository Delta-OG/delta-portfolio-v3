"use client"

import { useMultipleLanyard } from "@/hooks/use-multiple-lanyard"
import { Crown, ExternalLink, Sparkles, Heart } from "lucide-react"

const founders = [
  {
    id: "1015561031545798666",
    role: "Chairman",
    icon: Crown,
    color: "text-purple-400",
    bgColor: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    fallbackName: "DeMo Chairman",
    fallbackUsername: "chairman",
    hasNitro: true,
    discordLink: "https://discord.gg/tPnNJDxE9c",
  },
  {
    id: "479010864393879561",
    role: "Friend",
    icon: Heart,
    color: "text-pink-400",
    bgColor: "bg-gradient-to-r from-pink-500/20 to-red-500/20",
    borderColor: "border-pink-500/30",
    fallbackName: "DeMo Friend",
    fallbackUsername: "friend",
    hasNitro: true,
    discordLink: "https://discord.gg/5WxRF6v35u",
  },
]

export function DemoFounders() {
  const { data, loading, error } = useMultipleLanyard(founders.map((f) => f.id))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"
      case "idle":
        return "bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-pulse"
      case "dnd":
        return "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"
      default:
        return "bg-gray-500 shadow-lg shadow-gray-500/50"
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <img src="/images/demolab-logo.png" alt="DeMo Lab Logo" className="w-6 h-6" />
        <span className="text-white font-medium">DeMo Founder's</span>
      </div>

      <div className="space-y-3">
        {founders.map((founder) => {
          const userData = data[founder.id]
          const Icon = founder.icon
          const isLoading = loading
          const hasError = error && !userData

          return (
            <a
              key={founder.id}
              href={founder.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block border rounded-lg p-4 transition-all duration-200 group relative overflow-hidden ${
                founder.hasNitro
                  ? "bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30 border-purple-500/50 hover:border-purple-400/70"
                  : "bg-gray-700/30 hover:bg-gray-700/50 border-gray-600/50"
              }`}
            >
              {/* Nitro animated background */}
              {founder.hasNitro && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
              )}

              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-500/50">
                    {isLoading ? (
                      <div className="w-full h-full bg-gray-600 animate-pulse flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                      </div>
                    ) : userData?.discord_user?.avatar ? (
                      <img
                        src={`https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=128`}
                        alt="Discord avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          target.nextElementSibling?.classList.remove("hidden")
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {userData?.discord_user?.username?.charAt(0).toUpperCase() || founder.fallbackName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  {userData && (
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-700 ${getStatusColor(userData.discord_status)}`}
                    ></div>
                  )}
                  {founder.hasNitro && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium text-sm truncate">
                      {isLoading
                        ? "Loading..."
                        : userData?.discord_user?.global_name ||
                          userData?.discord_user?.username ||
                          founder.fallbackName}
                    </p>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${founder.bgColor} border ${founder.borderColor}`}
                    >
                      <Icon className={`w-3 h-3 ${founder.color}`} />
                      <span className={founder.color}>{founder.role}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {isLoading
                      ? "..."
                      : userData
                        ? `@${userData.discord_user.username}`
                        : `@${founder.fallbackUsername}`}
                  </p>
                  {founder.hasNitro && (
                    <div className="flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span className="text-purple-400 text-xs font-medium">Nitro</span>
                    </div>
                  )}
                </div>

                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </a>
          )
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <p className="text-gray-400 text-xs text-center">Click to join our Discord server</p>
      </div>
    </div>
  )
}
