"use client"

import { useState } from "react"
import { X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteUpdateNotificationProps {
  onClose?: () => void
}

export function SiteUpdateNotification({ onClose }: SiteUpdateNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [activeTab, setActiveTab] = useState<"updates" | "roadmap">("updates")

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  const updates = [
    {
      id: 1,
      title: "CORS Error Fixed",
      description: "Resolved Roblox API CORS issues with fallback system and proxy implementation",
      date: "Just now",
      icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    },
    {
      id: 2,
      title: "Dark Mode Toggle Restored",
      description: "Re-enabled dark mode functionality with theme toggle in the header",
      date: "Today",
      icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    },
    {
      id: 3,
      title: "Roblox Integration Enhanced",
      description: "Updated Roblox widget with new user profile and robust error handling",
      date: "Today",
      icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    },
    {
      id: 4,
      title: "Original Layout Restored",
      description: "Reverted to the original design and layout with all previous features",
      date: "Today",
      icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 5,
      title: "Green Verification Badge",
      description: "Added green verification badge next to the user's name",
      date: "Today",
      icon: <CheckCircle2 className="w-4 h-4 text-purple-400" />,
    },
  ]

  const roadmap = [
    {
      id: 1,
      title: "API Optimization",
      description: "Implement server-side proxy for better API reliability",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Projects Section",
      description: "Showcase portfolio projects with descriptions and links",
      status: "Planned",
    },
    {
      id: 3,
      title: "Contact Form",
      description: "Add a contact form for direct communication",
      status: "Planned",
    },
    {
      id: 4,
      title: "Performance Optimization",
      description: "Further optimize loading times and user experience",
      status: "In Progress",
    },
    {
      id: 5,
      title: "Mobile App",
      description: "Develop a mobile companion app for the portfolio",
      status: "Future",
    },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 
        w-full max-w-md animate-in fade-in duration-300 max-h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold">Latest Updates</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4 text-gray-400" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab("updates")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "updates"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Recent Updates
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "roadmap"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Roadmap
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "updates" ? (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/80 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{update.icon}</div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-white text-sm font-medium">{update.title}</h4>
                        <span className="text-gray-500 text-xs">{update.date}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">{update.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {roadmap.map((item) => (
                <div key={item.id} className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/80 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-white text-sm font-medium">{item.title}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            item.status === "In Progress"
                              ? "bg-blue-900/50 text-blue-400"
                              : item.status === "Future"
                                ? "bg-gray-900/50 text-gray-400"
                                : "bg-purple-900/50 text-purple-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleClose} className="text-xs bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
