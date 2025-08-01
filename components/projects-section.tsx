"use client"

import { useState } from "react"
import { SpotlightCard } from "./spotlight-card"
import { ExternalLink, Github, Eye } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card" // Import HoverCard

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  status: "completed" | "in-progress" | "planned"
  techIcons?: Record<string, string>
}

interface ProjectCategory {
  id: string
  name: string
  icon: string
  projects: Project[]
  color: string
}

interface ProjectsSectionProps {
  isOnline?: boolean
}

export function ProjectsSection({ isOnline = false }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Project categories with real data
  const categories: ProjectCategory[] = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "/images/icons8-whatsapp-100.png",
      color: "hover:bg-green-500/20 hover:border-green-500/50",
      projects: [], // Empty for now
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: "/images/icons8-telegram-100.png",
      color: "hover:bg-blue-500/20 hover:border-blue-500/50",
      projects: [
        {
          id: "stablecoin-monitoring-bot",
          title: "Real-Time Stablecoin De-Peg Monitoring Bot",
          description:
            "A robust, automated Python bot designed to monitor the real-time prices of stablecoins against the US Dollar. The application uses the CoinMarketCap API to fetch live data and sends instant, multi-level alerts via Telegram if a coin's price falls below critical custom thresholds. To provide deeper market context, each alert is enriched with the asset's 24-hour percentage change, allowing for a quick and accurate assessment of volatility. The system includes an intelligent anti-spam mechanism and securely manages all API keys and configurations through an external .env file.",
          technologies: ["Python", "requests", "python-dotenv", "pytz", "CoinMarketCap API", "Telegram Bot API"],
          status: "completed" as const,
          techIcons: {
            Python: "/images/python-logo.png",
            "CoinMarketCap API": "/images/coinmarketcap-logo.png",
          },
        },
      ],
    },
    {
      id: "discord",
      name: "Discord",
      icon: "/images/icons8-discord-100.png",
      color: "hover:bg-indigo-500/20 hover:border-indigo-500/50",
      projects: [], // Empty for now
    },
    {
      id: "websites",
      name: "Websites",
      icon: "/images/icons8-website-100.png",
      color: "hover:bg-purple-500/20 hover:border-purple-500/50",
      projects: [], // Empty for now - will be added in future
    },
  ]

  const activeProjects = activeCategory ? categories.find((cat) => cat.id === activeCategory)?.projects || [] : []

  // Get spotlight color based on status
  const getSpotlightColor = () => {
    if (isOnline) {
      return "rgba(88, 101, 242, 0.15)" // Discord blue
    }
    return "rgba(255, 68, 68, 0.15)" // Red for offline
  }

  const getBorderColor = () => {
    if (isOnline) {
      return "rgba(88, 101, 242, 0.3)" // Discord blue
    }
    return "rgba(255, 68, 68, 0.3)" // Red for offline
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "planned":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "planned":
        return "Planned"
    }
  }

  return (
    <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
      <div className="flex items-center gap-3 mb-4">
        <img src="/images/projects-icon.png" alt="Projects" className="w-5 h-5" />
        <span className="text-white font-medium">Projects</span>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center gap-2 ${
              activeCategory === category.id ? "bg-gray-700/50 border-gray-500/50" : "bg-gray-700/30 border-gray-600/50"
            } ${category.color}`}
          >
            <img src={category.icon || "/placeholder.svg"} alt={category.name} className="w-6 h-6" />
            <span className="text-xs text-gray-300 font-medium">{category.name}</span>
            <span className="text-xs text-gray-500">
              {categories.find((cat) => cat.id === category.id)?.projects.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Display */}
      <div className="space-y-4">
        {!activeCategory ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">👆</div>
            <p className="text-gray-400 text-sm">Select a category above</p>
            <p className="text-gray-500 text-xs">to view projects</p>
          </div>
        ) : activeProjects.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📝</div>
            <p className="text-gray-400 text-sm">No projects yet</p>
            <p className="text-gray-500 text-xs">Coming soon...</p>
          </div>
        ) : (
          activeProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-700/30 border border-gray-600/50 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl" // Added hover effects
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-2 leading-tight">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {project.liveUrl && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          title="View Live"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto p-2 text-xs">
                        <span>View Live Demo</span>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {project.githubUrl && (
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          title="View Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto p-2 text-xs">
                        <span>View Source Code</span>
                      </HoverCardContent>
                    </HoverCard>
                  )}
                  {(project.liveUrl || project.githubUrl) && <ExternalLink className="w-3 h-3 text-gray-500" />}
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-600/50 text-gray-300 rounded-md flex items-center gap-1"
                  >
                    {project.techIcons?.[tech] && (
                      <img src={project.techIcons[tech] || "/placeholder.svg"} alt={tech} className="w-3 h-3" />
                    )}
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </SpotlightCard>
  )
}
