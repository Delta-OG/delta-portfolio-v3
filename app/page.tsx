"use client"

import { useState, useEffect } from "react"
import { ClockIcon, Github, Mail, MessageCircle, Twitter, Moon, Sun } from "lucide-react"

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [currentTimezoneIndex, setCurrentTimezoneIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const [status, setStatus] = useState<"online" | "idle" | "dnd" | "offline">("online")

  // Timezones
  const timezones = [
    { name: "Riyadh", timezone: "Asia/Riyadh", flag: "🇸🇦" },
    { name: "New York", timezone: "America/New_York", flag: "🇺🇸" },
    { name: "Casablanca", timezone: "Africa/Casablanca", flag: "🇲🇦" },
    { name: "Dubai", timezone: "Asia/Dubai", flag: "🇦🇪" },
  ]

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const currentTimezone = timezones[currentTimezoneIndex]
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: currentTimezone.timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      setCurrentTime(timeString)
    }

    // Update time immediately
    updateTime()

    // Update time every second
    const timeInterval = setInterval(updateTime, 1000)

    // Change timezone every 30 seconds
    const timezoneInterval = setInterval(() => {
      setCurrentTimezoneIndex((prev) => (prev + 1) % timezones.length)
    }, 30000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(timezoneInterval)
    }
  }, [currentTimezoneIndex])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Toggle status for demo
  const toggleStatus = () => {
    const statuses: Array<"online" | "idle" | "dnd" | "offline"> = ["online", "idle", "dnd", "offline"]
    const currentIndex = statuses.indexOf(status)
    const nextIndex = (currentIndex + 1) % statuses.length
    setStatus(statuses[nextIndex])
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      case "offline":
      default:
        return "bg-gray-500"
    }
  }

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "idle":
        return "Away"
      case "dnd":
        return "Do Not Disturb"
      case "offline":
      default:
        return "Offline"
    }
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://sjc.microlink.io/I5ERdHVSOoRPrz74PuRJWIugBKiokA3IrI3gS9PY2ogtRDdjZjG6zdnAgA3dILl3P2AzYI4myYq98otMw0VlGg.jpeg')`,
        }}
      >
        <div className="min-h-screen bg-black/60 text-white">
          {/* Header */}
          <header className="w-full px-4 py-6 bg-black/40 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <h2 className="text-xl font-bold">Delta's Portfolio</h2>
              <div className="flex items-center gap-4">
                {/* Clock */}
                <div className="flex items-center gap-2 text-sm bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <ClockIcon className="w-4 h-4" />
                  <span className="font-mono">
                    {timezones[currentTimezoneIndex].flag} {timezones[currentTimezoneIndex].name}: {currentTime}
                  </span>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20"
                >
                  {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
              <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 text-center space-y-6">
                {/* Profile Picture with Status */}
                <div className="relative inline-block">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tswirtyeye%20circle.jpg-0Kk2zxuS9K8WYu1bnGeBxhg8jqf3AB.jpeg"
                    alt="Delta's Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-xl ring-4 ring-purple-500/30 mx-auto"
                    onClick={toggleStatus} // Click to toggle status for demo
                  />
                  {/* Discord-style status indicator */}
                  <div
                    className={`absolute bottom-2 right-2 w-8 h-8 ${getStatusColor(
                      status,
                    )} rounded-full border-4 border-black shadow-lg`}
                  />
                </div>

                {/* Name and Title */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Hey, I'm Delta! 👋</h1>
                  <p className="text-xl text-purple-200 font-medium">Software Engineering</p>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center">
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} animate-pulse`} />
                      <span className="text-sm font-medium text-white/80">{getStatusText(status)}</span>
                    </div>
                  </div>
                </div>

                {/* Discord Info */}
                <div className="space-y-2">
                  <p className="text-sm text-white/70">@Delta</p>

                  {/* Current Activity */}
                  <div className="text-sm text-white/80 bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                    <p className="font-medium text-purple-300">Currently:</p>
                    <p className="text-white">Visual Studio Code</p>
                    <p className="text-xs text-white/60">Working on Portfolio</p>
                    <p className="text-xs text-purple-300">TypeScript</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 justify-center pt-4">
                  {[
                    {
                      icon: <MessageCircle className="w-5 h-5" />,
                      url: "https://discordapp.com/users/1330617292798562401",
                      color: "hover:text-indigo-300 hover:bg-indigo-500/20",
                    },
                    {
                      icon: <Mail className="w-5 h-5" />,
                      url: "mailto:abdessamadk77@gmail.com",
                      color: "hover:text-red-300 hover:bg-red-500/20",
                    },
                    {
                      icon: <Github className="w-5 h-5" />,
                      url: "https://github.com/Delta-OG",
                      color: "hover:text-gray-300 hover:bg-gray-500/20",
                    },
                    {
                      icon: <Twitter className="w-5 h-5" />,
                      url: "https://twitter.com/vinxnzo",
                      color: "hover:text-blue-300 hover:bg-blue-500/20",
                    },
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-white/80 ${link.color}`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-white/60">Built with ❤️ using Next.js & Tailwind CSS</p>
                  <div className="flex justify-center gap-4 mt-2 text-xs text-white/60">
                    <a
                      href="https://github.com/Delta-OG/delta-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      View Source
                    </a>
                    <span>•</span>
                    <a href="/" className="hover:text-purple-300 transition-colors">
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
