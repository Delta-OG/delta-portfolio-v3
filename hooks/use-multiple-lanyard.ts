"use client"

import { useState, useEffect } from "react"
import type { LanyardData } from "./use-lanyard"

export function useMultipleLanyard(userIds: string[]) {
  const [data, setData] = useState<Record<string, LanyardData | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMultipleUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        const promises = userIds.map(async (userId) => {
          try {
            console.log(`Fetching data for user: ${userId}`)
            const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "User-Agent": "Delta-Portfolio/1.0",
              },
            })

            console.log(`Response for ${userId}:`, response.status)

            if (response.ok) {
              const result = await response.json()
              console.log(`Data for ${userId}:`, result)
              return { userId, data: result.success ? result.data : null }
            } else {
              console.warn(`Failed to fetch data for ${userId}: ${response.status}`)
              return { userId, data: null }
            }
          } catch (err) {
            console.error(`Error fetching data for ${userId}:`, err)
            return { userId, data: null }
          }
        })

        const results = await Promise.all(promises)
        const newData: Record<string, LanyardData | null> = {}

        results.forEach(({ userId, data }) => {
          newData[userId] = data
        })

        console.log("Final data:", newData)
        setData(newData)

        // Check if all requests failed
        const hasAnyData = Object.values(newData).some((userData) => userData !== null)
        if (!hasAnyData) {
          setError("Failed to fetch user data")
        }
      } catch (err) {
        console.error("Error in fetchMultipleUsers:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    if (userIds.length > 0) {
      // Only fetch once, no auto-refresh to prevent glitching
      fetchMultipleUsers()
    }
  }, [userIds])

  return { data, loading, error }
}
