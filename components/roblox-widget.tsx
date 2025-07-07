"use client"

import { useState, useEffect } from "react"
import { SpotlightCard } from "./spotlight-card"
import { PlatformIcons } from "./platform-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink } from "lucide-react"

interface RobloxWidgetProps {
  isOnline?: boolean
}

interface RobloxUser {
  id: number
  name: string
  displayName: string
  description: string
  created: string
  isBanned: boolean
  externalAppDisplayName: string | null
  hasVerifiedBadge: boolean
}

export function RobloxWidget({ isOnline = false }: RobloxWidgetProps) {
  // Extract user ID from the provided profile link
  const robloxUserId = "5134375476"
  const [robloxUser, setRobloxUser] = useState<RobloxUser | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRobloxData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Try multiple approaches to fetch Roblox data
        let userData = null
        const avatarData = null

        // Method 1: Try direct API call (might fail due to CORS)
        try {
          console.log("Attempting direct Roblox API call...")
          const userResponse = await fetch(`https://users.roblox.com/v1/users/${robloxUserId}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          })

          if (userResponse.ok) {
            userData = await userResponse.json()
            console.log("Direct API call successful:", userData)
          }
        } catch (directError) {
          console.log("Direct API call failed:", directError)
        }

        // Method 2: Try with CORS proxy if direct call failed
        if (!userData) {
          try {
            console.log("Attempting CORS proxy call...")
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://users.roblox.com/v1/users/${robloxUserId}`)}`
            const proxyResponse = await fetch(proxyUrl)

            if (proxyResponse.ok) {
              const proxyData = await proxyResponse.json()
              userData = JSON.parse(proxyData.contents)
              console.log("CORS proxy call successful:", userData)
            }
          } catch (proxyError) {
            console.log("CORS proxy call failed:", proxyError)
          }
        }

        // Try to get avatar data
        try {
          const avatarResponse = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxUserId}&size=150x150&format=Png&isCircular=true`)}`,
          )

          if (avatarResponse.ok) {
            const avatarProxyData = await avatarResponse.json()
            const avatarResult = JSON.parse(avatarProxyData.contents)

            if (avatarResult.data && avatarResult.data.length > 0) {
              setAvatarUrl(avatarResult.data[0].imageUrl)
              console.log("Avatar fetched successfully")
            }
          }
        } catch (avatarError) {
          console.log("Avatar fetch failed:", avatarError)
        }

        // Set user data or fallback
        if (userData && userData.name) {
          setRobloxUser(userData)
          console.log("Using real Roblox data")
        } else {
          // Use fallback data based on the user ID
          console.log("Using fallback Roblox data")
          setRobloxUser({
            id: Number.parseInt(robloxUserId),
            name: "egorbx1",
            displayName: "egorbx1",
            description: "Roblox Player",
            created: "2021-01-01T00:00:00.000Z",
            isBanned: false,
            externalAppDisplayName: null,
            hasVerifiedBadge: false,
          })

          // Use a placeholder avatar if we couldn't fetch the real one
          if (!avatarUrl) {
            setAvatarUrl("https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/150/150/AvatarHeadshot/Png")
          }
        }
      } catch (error) {
        console.error("Error fetching Roblox data:", error)
        setError("Unable to load Roblox data")

        // Always provide fallback data
        setRobloxUser({
          id: Number.parseInt(robloxUserId),
          name: "egorbx1",
          displayName: "egorbx1",
          description: "Roblox Player",
          created: "2021-01-01T00:00:00.000Z",
          isBanned: false,
          externalAppDisplayName: null,
          hasVerifiedBadge: false,
        })

        // Use default Roblox avatar
        setAvatarUrl("https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/150/150/AvatarHeadshot/Png")
      } finally {
        setLoading(false)
      }
    }

    fetchRobloxData()
  }, [robloxUserId])

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

  if (loading) {
    return (
      <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
        <div className="flex items-center gap-3 mb-3">
          <PlatformIcons.Roblox className="w-5 h-5 text-green-400" />
          <span className="text-green-400 text-sm font-medium">Roblox</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </SpotlightCard>
    )
  }

  return (
    <SpotlightCard className="p-4" spotlightColor={getSpotlightColor()} borderColor={getBorderColor()}>
      <div className="flex items-center gap-3 mb-3">
        <PlatformIcons.Roblox className="w-5 h-5 text-green-400" />
        <span className="text-green-400 text-sm font-medium">Roblox</span>
        <a
          href={`https://www.roblox.com/users/${robloxUserId}/profile?friendshipSourceType=PlayerSearch`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-gray-400 hover:text-green-400 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={avatarUrl || "/placeholder.svg"}
            alt="Roblox avatar"
            onError={(e) => {
              // Fallback to placeholder if avatar fails to load
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=40&width=40"
            }}
          />
          <AvatarFallback className="bg-green-500/20 text-green-400">
            {(robloxUser?.displayName || "E").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium text-sm truncate">@{robloxUser?.displayName || "egorbx1"}</p>
          {error && <p className="text-yellow-400 text-xs">Demo mode</p>}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Profile</span>
          <a
            href={`https://www.roblox.com/users/${robloxUserId}/profile?friendshipSourceType=PlayerSearch`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
          >
            View Profile →
          </a>
        </div>
      </div>
    </SpotlightCard>
  )
}
