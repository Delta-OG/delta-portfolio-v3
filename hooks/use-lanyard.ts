"use client"

import { useState, useEffect } from "react"

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

  useEffect(() => {
    let ws: WebSocket | null = null
    let heartbeatInterval: NodeJS.Timeout | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null

    // Create realistic fallback data
    const createFallbackData = (reason: string) => {
      console.log(`Using fallback data: ${reason}`)
      setData({
        discord_user: {
          id: userId,
          username: "Delta",
          avatar: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
          discriminator: "0",
          global_name: "Delta",
        },
        discord_status: "online",
        activities: [
          {
            name: "Visual Studio Code",
            type: 0,
            state: "Working on Portfolio",
            details: "Editing TypeScript",
            application_id: "383226320970055681",
            timestamps: {
              start: Date.now() - 1800000, // 30 minutes ago
            },
          },
        ],
        spotify: null,
        listening_to_spotify: false,
        kv: {},
      })
      setLastUpdated(new Date())
      setError(`Discord API: ${reason}`)
      setConnectionStatus("disconnected")
    }

    // Initial fetch using REST API
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log(`Attempting to fetch Lanyard data for user: ${userId}`)

        // Try to fetch the user's data directly
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "User-Agent": "Delta-Portfolio/1.0",
          },
        })

        console.log(`Lanyard API response status: ${response.status}`)

        if (response.status === 404) {
          createFallbackData("User not found. You may need to join the Lanyard Discord server at discord.gg/lanyard")
          return
        }

        if (response.status === 429) {
          createFallbackData("Rate limited. Please try again later")
          return
        }

        if (response.status >= 500) {
          createFallbackData("Lanyard service is temporarily unavailable")
          return
        }

        if (!response.ok) {
          createFallbackData(`API error (${response.status})`)
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

          // Only try WebSocket if REST API works
          setTimeout(connectWebSocket, 1000)
        } else {
          createFallbackData(result.error?.message || "Invalid API response")
        }
      } catch (err) {
        console.error("Error fetching Lanyard data:", err)
        const errorMessage = err instanceof Error ? err.message : "Network error"

        if (errorMessage.includes("fetch")) {
          createFallbackData("Network connection failed")
        } else {
          createFallbackData(errorMessage)
        }
      } finally {
        setLoading(false)
      }
    }

    // Connect to WebSocket for real-time updates
    const connectWebSocket = () => {
      if (error || !data) {
        console.log("Skipping WebSocket connection due to REST API error")
        return
      }

      try {
        console.log("Connecting to Lanyard WebSocket")
        setConnectionStatus("connecting")
        ws = new WebSocket("wss://api.lanyard.rest/socket")

        ws.onopen = () => {
          console.log("WebSocket connection established")
          setConnectionStatus("connected")
        }

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data)
            console.log("WebSocket message:", message)

            // Handle different message types
            if (message.op === 0 && message.t) {
              // Event message
              if ((message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") && message.d) {
                if (message.d.discord_user?.id === userId) {
                  console.log(`Received ${message.t} for user ${userId}`, message.d)
                  setData(message.d)
                  setLastUpdated(new Date())
                  setError(null)
                }
              }
            } else if (message.op === 0 && message.d?.heartbeat_interval) {
              // Hello message
              console.log("Received hello message, sending identify")
              const identifyMessage = {
                op: 2,
                d: {
                  subscribe_to_id: userId,
                },
              }
              ws?.send(JSON.stringify(identifyMessage))

              // Setup heartbeat
              if (heartbeatInterval) clearInterval(heartbeatInterval)
              heartbeatInterval = setInterval(() => {
                if (ws?.readyState === WebSocket.OPEN) {
                  const heartbeatMessage = {
                    op: 1,
                    d: Date.now(),
                  }
                  ws.send(JSON.stringify(heartbeatMessage))
                  console.log("Sent heartbeat")
                }
              }, message.d.heartbeat_interval)
            }
          } catch (err) {
            console.error("Error processing WebSocket message:", err)
          }
        }

        ws.onerror = (event) => {
          console.error("WebSocket error:", event)
          setConnectionStatus("disconnected")
        }

        ws.onclose = (event) => {
          console.log(`WebSocket closed with code ${event.code}:`, event.reason)
          setConnectionStatus("disconnected")

          // Only try to reconnect if we had a successful initial connection
          if (event.code !== 1000 && data) {
            console.log("Attempting to reconnect in 10 seconds...")
            reconnectTimeout = setTimeout(() => {
              connectWebSocket()
            }, 10000)
          }
        }
      } catch (err) {
        console.error("Error setting up WebSocket:", err)
        setConnectionStatus("disconnected")
      }
    }

    // Start the process
    fetchInitialData()

    // Cleanup
    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval)
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
      if (ws) {
        ws.close(1000, "Component unmounting")
        ws = null
      }
    }
  }, [userId])

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
  }
}
