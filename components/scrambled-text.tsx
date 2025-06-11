"use client"

import { useEffect, useState, useRef } from "react"

interface ScrambledTextProps {
  text: string
  className?: string
  speed?: number
  scrambleTime?: number
}

export function ScrambledText({ text, className = "", speed = 50, scrambleTime = 1000 }: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isScrambling, setIsScrambling] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/"

  // Function to generate random character
  const getRandomChar = () => {
    return characters.charAt(Math.floor(Math.random() * characters.length))
  }

  // Function to scramble text
  const scrambleText = () => {
    setIsScrambling(true)
    let iterations = 0
    const maxIterations = 10

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            // If it's a space, don't scramble
            if (char === " ") return " "

            // If we've already revealed this character, keep it
            if (index < iterations) return text[index]

            // Otherwise return a random character
            return getRandomChar()
          })
          .join(""),
      )

      if (iterations >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsScrambling(false)
      }

      iterations += 1 / 3
    }, speed)
  }

  // Initial scramble on mount
  useEffect(() => {
    scrambleText()

    // Set up periodic scrambling
    const setupScrambleInterval = () => {
      timeoutRef.current = setTimeout(
        () => {
          if (!isScrambling) {
            scrambleText()
          }
          setupScrambleInterval()
        },
        scrambleTime + Math.random() * 2000,
      )
    }

    setupScrambleInterval()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text])

  return <span className={className}>{displayText}</span>
}
