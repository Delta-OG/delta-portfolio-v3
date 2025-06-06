"use client"

import { MessageCircle, Github, Twitter, Mail } from "lucide-react"

const links = [
  {
    name: "Discord",
    icon: MessageCircle,
    url: "https://discordapp.com/users/1330617292798562401",
    color: "hover:bg-blue-500/20 hover:border-blue-500/50",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Delta-OG",
    color: "hover:bg-gray-500/20 hover:border-gray-500/50",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/vinxnzo",
    color: "hover:bg-blue-400/20 hover:border-blue-400/50",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:abdessamadk77@gmail.com",
    color: "hover:bg-red-500/20 hover:border-red-500/50",
  },
]

export function QuickLinks() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-white font-medium">⭐ Quick Links</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gray-700/30 border border-gray-600/50 rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-200 ${link.color}`}
            >
              <Icon className="w-6 h-6 text-gray-300" />
              <span className="text-gray-300 text-sm font-medium">{link.name}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
