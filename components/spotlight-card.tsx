"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderColor?: string
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  borderColor = "rgba(255, 255, 255, 0.1)",
}: SpotlightCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  // Handle touch events for mobile
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = card.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top

        setPosition({ x, y })
        setOpacity(0.5) // Lower opacity for touch
      }
    }

    const handleTouchEnd = () => {
      setOpacity(0)
    }

    card.addEventListener("touchmove", handleTouchMove)
    card.addEventListener("touchend", handleTouchEnd)

    return () => {
      card.removeEventListener("touchmove", handleTouchMove)
      card.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-black/20 backdrop-blur-sm transition-colors duration-300",
        className,
      )}
      style={{ borderColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
