"use client"

import { useState, useEffect, useCallback, useRef } from "react"

// Types for Lanyard API responses
export interface LanyardActivity {
  name: string
  type: number
  state?: string
  details?: string
  application_id?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
}

export interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name: string | null
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: LanyardActivity[]
  spotify: any | null
  listening_to_spotify: boolean
  kv: Record<string, any>
}

interface LanyardResponse {
  success: boolean
  data: LanyardData
  error?: {
    message: string
    code: string
  }
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")

  const previousDataRef = useRef<LanyardData | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Generate realistic fallback data
  const generateFallbackData = useCallback((): LanyardData => {
    const activities: LanyardActivity[] = []

    // Randomly generate activities
    const possibleActivities = [
      {
        name: "Visual Studio Code",
        type: 0,
        details: "Editing portfolio.tsx",
        state: "Workspace: delta-portfolio",
        application_id: "383226320970055681",
        timestamps: {
          start: Date.now() - Math.floor(Math.random() * 3600000), // Up to 1 hour ago
        },
      },
      {
        name: "Roblox",
        type: 0,
        details: "Playing Brookhaven RP",
        state: "In game",
        application_id: "363472714589413376",
        timestamps: {
          start: Date.now() - Math.floor(Math.random() * 1800000), // Up to 30 minutes ago
        },
        assets: {
          large_image: "roblox_logo",
          large_text: "Roblox",
        },
      },
      {
        name: "FiveM",
        type: 0,
        details: "Los Santos Police Department",
        state: "On duty as Officer",
        application_id: "356876176465199104",
        timestamps: {
          start: Date.now() - Math.floor(Math.random() * 7200000), // Up to 2 hours ago
        },
        assets: {
          large_image: "fivem_logo",
          large_text: "FiveM",
        },
      },
      {
        name: "Discord",
        type: 0,
        details: "In voice channel",
        state: "General",
        application_id: "356876176465199104",
        timestamps: {
          start: Date.now() - Math.floor(Math.random() * 900000), // Up to 15 minutes ago
        },
      },
    ]

    // 70% chance of having an activity
    if (Math.random() < 0.7) {
      const randomActivity = possibleActivities[Math.floor(Math.random() * possibleActivities.length)]
      activities.push(randomActivity)
    }

    // Random status
    const statuses: ("online" | "idle" | "dnd" | "offline")[] = ["online", "idle", "dnd", "offline"]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      discord_user: {
        id: userId,
        username: "deltaexe",
        avatar: "a_1234567890abcdef1234567890abcdef",
        discriminator: "0",
        global_name: "Delta",
      },
      discord_status: randomStatus,
      activities,
      spotify: null,
      listening_to_spotify: false,
      kv: {},
    }
  }, [userId])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setConnectionStatus("connecting")
      console.log(`Fetching Lanyard data for user: ${userId}`)

      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      // Set a timeout that doesn't use AbortController
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), 6000)
      })

      // Create the fetch promise
      const fetchPromise = fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "Delta-Portfolio/1.0",
        },
        signal,
      })

      // Race between fetch and timeout
      const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response

      // Check if request was aborted
      if (signal.aborted) {
        console.log("Request was aborted")
        return
      }

      console.log(`Lanyard API response status: ${response.status}`)

      if (response.status === 404) {
        console.warn("User not found on Lanyard, using fallback data")
        setData(generateFallbackData())
        setError("Demo mode - join discord.gg/lanyard for live status")
        setConnectionStatus("disconnected")
        setLastUpdated(new Date())
        return
      }

      if (response.status === 429) {
        console.warn("Rate limited, using fallback data")
        setData(generateFallbackData())
        setError("Rate limited - using demo data")
        setConnectionStatus("disconnected")
        setLastUpdated(new Date())
        return
      }

      if (!response.ok) {
        throw new Error(`API error (${response.status})`)
      }

      const result: LanyardResponse = await response.json()
      console.log("Lanyard API response:", result)

      if (result.success && result.data) {
        console.log("Successfully loaded Discord data:", result.data)
        previousDataRef.current = result.data
        setData(result.data)
        setLastUpdated(new Date())
        setError(null)
        setConnectionStatus("connected")
      } else {
        throw new Error(result.error?.message || "Invalid API response")
      }
    } catch (err) {
      // Don't log abort errors as they're expected
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Request was aborted (expected)")
        return
      }

      console.error("Error fetching Lanyard data:", err)

      // Use fallback data instead of showing error
      setData(generateFallbackData())

      if (err instanceof Error) {
        if (err.message === "Request timeout") {
          setError("Demo mode - API timeout")
        } else if (err.message.includes("Failed to fetch")) {
          setError("Demo mode - Network error")
        } else {
          setError("Demo mode - API unavailable")
        }
      } else {
        setError("Demo mode - Unknown error")
      }

      setConnectionStatus("disconnected")
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }, [userId, generateFallbackData])

  useEffect(() => {
    fetchData()

    // Auto-refresh every 20 seconds for more dynamic updates
    const interval = setInterval(() => {
      // Only fetch if not currently loading
      if (!loading) {
        fetchData()
      }
    }, 20000)

    // Cleanup function
    return () => {
      clearInterval(interval)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Format elapsed time for activities
  const getElapsedTime = (activity: LanyardActivity | undefined) => {
    if (!activity?.timestamps?.start) return null

    const startTime = activity.timestamps.start
    const now = Date.now()
    const elapsed = now - startTime

    const hours = Math.floor(elapsed / (1000 * 60 * 60))
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m elapsed`
    } else {
      return `${minutes}m elapsed`
    }
  }

  return {
    data,
    loading,
    error,
    lastUpdated,
    connectionStatus,
    getElapsedTime,
    refetch: fetchData,
  }
}
