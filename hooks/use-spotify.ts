"use client"

import { useState, useEffect, useCallback } from "react"

// Spotify API types
export interface SpotifyTrack {
  id: string
  name: string
  artist: string
  album: string
  album_art_url: string
  duration_ms: number
  progress_ms: number
  is_playing: boolean
  external_url: string
}

export interface SpotifyLyrics {
  lines: {
    text: string
    startTimeMs: number
  }[]
  syncType: "LINE_SYNCED" | "UNSYNCED"
}

export function useSpotify() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  const [lyrics, setLyrics] = useState<SpotifyLyrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Spotify API credentials
  const CLIENT_ID = "828a7e93191847cda53f7a4f92906a85"
  const CLIENT_SECRET = "624687af36f84b0899ffa79df5b744f7"
  const AUTH_TOKEN =
    "BQAJ9P6AugsEY4CAHaibSHkUtemrDVUAxd_tUmKsYoU5yf2q2mcEmGMk8VkzpVVisGgkw0tqdkcyIYqfiTm3Lc3QrbZa_1OmVsSJM6AbLLrVpDnLXIihx3axBtRGdLuwKB-AUekfnQ87D_2kY_eNptUkAr52SjNmT6MFSNJPhti0stWz-2h7RNbpan4ArHw4hrMxtXlr_cuSoj5JptC43ay9CG9nTw4apBb7gYJ9WJbptIGIX5iny11tz1q_bc6rULA8CxD2k3id_zYpoxPQ4B20zfKpo0B31hkFcrycxAoTzlxety3tolTS9l7-k-09X7Au"
  const USERNAME = "316vjdek25ex6gh2bzx6heqe2ebq"

  // Fetch current playing track
  const fetchCurrentTrack = useCallback(async () => {
    try {
      setLoading(true)

      // In a real implementation, we would use the proper OAuth flow
      // For this demo, we'll use the provided token directly
      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      })

      // If no track is playing (204 No Content)
      if (response.status === 204) {
        // Try to get the most recently played track instead
        const recentResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        })

        if (recentResponse.ok) {
          const data = await recentResponse.json()
          if (data.items && data.items.length > 0) {
            const item = data.items[0].track

            setTrack({
              id: item.id,
              name: item.name,
              artist: item.artists.map((artist: any) => artist.name).join(", "),
              album: item.album.name,
              album_art_url: item.album.images[0]?.url,
              duration_ms: item.duration_ms,
              progress_ms: 0,
              is_playing: false,
              external_url: item.external_urls.spotify,
            })

            // Fetch lyrics for this track
            fetchLyrics(item.id)
          }
        }

        setLoading(false)
        setLastUpdated(new Date())
        return
      }

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`)
      }

      const data = await response.json()

      if (data && data.item) {
        const newTrack = {
          id: data.item.id,
          name: data.item.name,
          artist: data.item.artists.map((artist: any) => artist.name).join(", "),
          album: data.item.album.name,
          album_art_url: data.item.album.images[0]?.url,
          duration_ms: data.item.duration_ms,
          progress_ms: data.progress_ms,
          is_playing: data.is_playing,
          external_url: data.item.external_urls.spotify,
        }

        // Only update if the track changed or play state changed
        if (!track || track.id !== newTrack.id || track.is_playing !== newTrack.is_playing) {
          setTrack(newTrack)

          // Fetch lyrics for this track
          fetchLyrics(newTrack.id)
        } else {
          // Just update the progress
          setTrack((prev) =>
            prev
              ? {
                  ...prev,
                  progress_ms: data.progress_ms,
                  is_playing: data.is_playing,
                }
              : newTrack,
          )
        }
      }

      setError(null)
    } catch (err) {
      console.error("Error fetching Spotify data:", err)
      setError("Failed to fetch Spotify data. Token may be expired.")
    } finally {
      setLoading(false)
      setLastUpdated(new Date())
    }
  }, [track])

  // Fetch lyrics for a track
  const fetchLyrics = async (trackId: string) => {
    try {
      // In a real implementation, we would use Spotify's lyrics API
      // For this demo, we'll generate mock lyrics based on the track ID

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate mock lyrics
      const mockLyrics: SpotifyLyrics = {
        syncType: "LINE_SYNCED",
        lines: generateMockLyrics(trackId),
      }

      setLyrics(mockLyrics)
    } catch (err) {
      console.error("Error fetching lyrics:", err)
      setLyrics(null)
    }
  }

  // Generate mock lyrics based on track ID
  const generateMockLyrics = (trackId: string) => {
    // This function generates mock lyrics with timestamps
    // In a real app, you'd get this data from Spotify's lyrics API
    const lines = [
      `[Intro]`,
      `This is where the song begins`,
      `With a gentle melody`,
      ``,
      `[Verse 1]`,
      `These are the lyrics for track ID: ${trackId.substring(0, 8)}`,
      `Each line synchronized with the music`,
      `As the song plays along`,
      `The words appear on the screen`,
      ``,
      `[Chorus]`,
      `This is the chorus part of the song`,
      `Where the main hook is repeated`,
      `The most memorable part of the track`,
      `That everyone loves to sing along`,
      ``,
      `[Verse 2]`,
      `Now we're in the second verse`,
      `Continuing the story of the song`,
      `With more lyrics that follow the beat`,
      `And match the rhythm of the music`,
      ``,
      `[Bridge]`,
      `This is the bridge section`,
      `Often with a different melody`,
      `Before returning to the final chorus`,
      ``,
      `[Chorus]`,
      `This is the chorus part of the song`,
      `Where the main hook is repeated`,
      `The most memorable part of the track`,
      `That everyone loves to sing along`,
      ``,
      `[Outro]`,
      `And finally the song comes to an end`,
      `With the last few notes fading away`,
    ]

    // Distribute timestamps evenly across the song duration
    return lines.map((text, index) => {
      // Use a hash of the track ID and index to create somewhat consistent timestamps
      const hash = (trackId.charCodeAt(index % trackId.length) * (index + 1)) % 100
      const startTimeMs = Math.floor((hash / 100) * 180000) + index * 10000 // Distribute over 3 minutes
      return {
        text,
        startTimeMs,
      }
    })
  }

  // Poll for updates
  useEffect(() => {
    // Initial fetch
    fetchCurrentTrack()

    // Set up polling interval (every 3 seconds)
    const interval = setInterval(() => {
      fetchCurrentTrack()
    }, 3000)

    return () => clearInterval(interval)
  }, [fetchCurrentTrack])

  // Manual refresh function
  const refetch = useCallback(() => {
    fetchCurrentTrack()
  }, [fetchCurrentTrack])

  return {
    track,
    lyrics,
    loading,
    error,
    lastUpdated,
    refetch,
  }
}
