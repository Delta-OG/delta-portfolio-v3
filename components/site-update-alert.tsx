"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, Sparkles, CheckCircle2 } from "lucide-react"

interface SiteUpdateAlertProps {
  onClose?: () => void
}

export function SiteUpdateAlert({ onClose }: SiteUpdateAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  const updates = [
    {
      id: 1,
      title: "Removed Demo Spotify",
      description: "Now using real Discord music detection instead of mock data",
      icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    },
    {
      id: 2,
      title: "Added Dark Mode",
      description: "Toggle between light and dark themes with next-themes",
      icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 3,
      title: "Enhanced Platform Icons",
      description: "Better platform detection and proper logo display",
      icon: <CheckCircle2 className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 4,
      title: "Verified Developer Badge",
      description: "Added verified badge with developer status",
      icon: <CheckCircle2 className="w-4 h-4 text-yellow-400" />,
    },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Alert className="w-full max-w-md bg-background/95 backdrop-blur-sm border-border shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <AlertTitle>Latest Updates</AlertTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <AlertDescription>
          <div className="space-y-3">
            {updates.map((update) => (
              <div key={update.id} className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{update.icon}</div>
                  <div>
                    <h4 className="text-foreground text-sm font-medium">{update.title}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{update.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={handleClose}>
              Close
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
