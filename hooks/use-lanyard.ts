"use client"

import { useState, useEffect } from "react"

// تعريف أنواع البيانات المستلمة من Lanyard API
interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string | null
    discriminator: string
    global_name: string | null
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
  }>
}

interface LanyardResponse {
  success: boolean
  data: LanyardData
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // دالة لجلب البيانات من Lanyard API
    const fetchLanyardData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log(`Fetching Lanyard data for user: ${userId}`)

        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        console.log(`Lanyard API response status: ${response.status}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: LanyardResponse = await response.json()
        console.log("Lanyard API response:", result)

        if (result.success && result.data) {
          setData(result.data)
          setError(null)
          console.log("Successfully loaded Discord data:", result.data)
        } else {
          throw new Error("Lanyard API returned unsuccessful response")
        }
      } catch (err) {
        console.error("Lanyard API error:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred")
        setData(null)

        // Fallback data for demonstration
        setData({
          discord_user: {
            id: userId,
            username: "Delta",
            avatar: null,
            discriminator: "0",
            global_name: "Delta",
          },
          discord_status: "online",
          activities: [
            {
              name: "Visual Studio Code",
              type: 0,
              details: "Working on Portfolio",
              state: "TypeScript",
            },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchLanyardData()
      // تحديث البيانات كل 30 ثانية
      const interval = setInterval(fetchLanyardData, 30000)
      return () => clearInterval(interval)
    }
  }, [userId])

  return { data, loading, error }
}
