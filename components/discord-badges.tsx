"use client"

interface DiscordBadge {
  id: string
  name: string
  description: string
  image: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
}

interface DiscordBadgesProps {
  className?: string
}

export function DiscordBadges({ className }: DiscordBadgesProps) {
  const badges: DiscordBadge[] = [
    {
      id: "early-supporter",
      name: "Early Supporter",
      description: "Supported Discord before it was cool",
      image: "/images/discord-early-supporter.png",
      rarity: "legendary",
      unlocked: true,
    },
    {
      id: "bug-hunter",
      name: "Bug Hunter",
      description: "Helped squash bugs and improve Discord",
      image: "/images/discord-bug-hunter.png",
      rarity: "epic",
      unlocked: true,
    },
    {
      id: "nitro",
      name: "Nitro Subscriber",
      description: "Supporting Discord with Nitro",
      image: "/images/discord-nitro-badge.png",
      rarity: "rare",
      unlocked: true,
    },
  ]

  const unlockedBadges = badges.filter((badge) => badge.unlocked)

  if (unlockedBadges.length === 0) return null

  return null
}

// Export individual badge data for external use
export const discordBadgeData = {
  badges: [
    {
      id: "early-supporter",
      name: "Early Supporter",
      description: "Supported Discord before it was cool",
      image: "/images/discord-early-supporter.png",
      rarity: "legendary" as const,
    },
    {
      id: "bug-hunter",
      name: "Bug Hunter",
      description: "Helped squash bugs and improve Discord",
      image: "/images/discord-bug-hunter.png",
      rarity: "epic" as const,
    },
    {
      id: "nitro",
      name: "Nitro Subscriber",
      description: "Supporting Discord with Nitro",
      image: "/images/discord-nitro-badge.png",
      rarity: "rare" as const,
    },
    // Easy to add new badges:
    // {
    //   id: "hypesquad",
    //   name: "HypeSquad",
    //   description: "Member of Discord HypeSquad",
    //   image: "/images/discord-hypesquad.png",
    //   rarity: "rare" as const,
    // },
  ],
}
