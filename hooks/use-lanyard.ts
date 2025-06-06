"use client"

import { useState, useEffect, useCallback } from "react"

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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`Fetching Lanyard data for user: ${userId}`)

      const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "Delta-Portfolio/1.0",
        },
      })

      console.log(`Lanyard API response status: ${response.status}`)

      if (response.status === 404) {
        setError("User not found. You may need to join the Lanyard Discord server at discord.gg/lanyard")
        setConnectionStatus("disconnected")
        return
      }

      if (response.status === 429) {
        setError("Rate limited. Please try again later")
        setConnectionStatus("disconnected")
        return
      }

      if (response.status >= 500) {
        setError("Lanyard service is temporarily unavailable")
        setConnectionStatus("disconnected")
        return
      }

      if (!response.ok) {
        setError(`API error (${response.status})`)
        setConnectionStatus("disconnected")
        return
      }

      const result: LanyardResponse = await response.json()
      console.log("Lanyard API response:", result)

      if (result.success && result.data) {
        console.log("Successfully loaded Discord data:", result.data)
        setData(result.data)
        setLastUpdated(new Date())
        setError(null)
        setConnectionStatus("connected")
      } else {
        setError(result.error?.message || "Invalid API response")
        setConnectionStatus("disconnected")
      }
    } catch (err) {
      console.error("Error fetching Lanyard data:", err)
      const errorMessage = err instanceof Error ? err.message : "Network error"
      setError(errorMessage)
      setConnectionStatus("disconnected")
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchData()

    // Auto-refresh every 90 seconds (1.5 minutes) for real-time updates
    const interval = setInterval(fetchData, 90000)

    return () => clearInterval(interval)
  }, [fetchData])

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
