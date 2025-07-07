"use client"

import { SpotlightCard } from "./spotlight-card"
import { PlatformIcons } from "./platform-icons"

interface QuickLinksProps {
  isOnline?: boolean
}

export function QuickLinks({ isOnline = false }: QuickLinksProps) {
  const links = [
    {
      name: "Discord",
      url: "https://discordapp.com/users/1330617292798562401",
      color: "hover:bg-blue-500/20 hover:border-blue-500/50",
      icon: <PlatformIcons.Discord className="w-6 h-6 text-blue-400" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/Delta-OG",
      color: "hover:bg-gray-500/20 hover:border-gray-500/50",
      icon: (
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/deltatalking",
      color: "hover:bg-blue-400/20 hover:border-blue-400/50",
      icon: (
        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Kick",
      url: "https://kick.com/deltaexe",
      color: "hover:bg-green-500/20 hover:border-green-500/50",
      icon: <PlatformIcons.Kick className="w-6 h-6 text-green-400" />,
    },
    {
      name: "Email",
      url: "mailto:DeMoNetwork.contact@gmail.com",
      color: "hover:bg-red-500/20 hover:border-red-500/50",
      icon: (
        <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ]

  // Get spotlight color based on status
  const getSpotlightColor = () => {
    if (isOnline) {
      return "rgba(88, 101, 242, 0.15)" // Discord blue
    }
    return "rgba(255, 68, 68, 0.15)" // Red for offline
  }

  // Get border color based on status
  const getBorderColor = () => {
    if (isOnline) {
      return "rgba(88, 101, 242, 0.3)" // Discord blue
    }
    return "rgba(255, 68, 68, 0.3)" // Red for offline
  }

  return (
    <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-yellow-400">⭐</span>
        <span className="text-white font-medium">Quick Links</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gray-700/30 border border-gray-600/50 rounded-lg p-3 flex items-center gap-3 transition-all duration-200 ${link.color}`}
          >
            <div className="text-gray-300">{link.icon}</div>
            <span className="text-gray-300 text-sm font-medium">{link.name}</span>
          </a>
        ))}
      </div>
    </SpotlightCard>
  )
}
