import { Github, Mail, MessageCircle, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialLinks() {
  // روابط التواصل الاجتماعي
  const socialLinks = [
    {
      name: "Discord",
      url: "https://discordapp.com/users/1330617292798562401",
      icon: MessageCircle,
      color: "hover:text-indigo-300 hover:bg-indigo-500/20",
    },
    {
      name: "Email",
      url: "mailto:abdessamadk77@gmail.com",
      icon: Mail,
      color: "hover:text-red-300 hover:bg-red-500/20",
    },
    {
      name: "GitHub",
      url: "https://github.com/Delta-OG",
      icon: Github,
      color: "hover:text-gray-300 hover:bg-gray-500/20",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/vinxnzo",
      icon: Twitter,
      color: "hover:text-blue-300 hover:bg-blue-500/20",
    },
  ]

  return (
    <div className="flex gap-4 justify-center">
      {socialLinks.map((link) => {
        const IconComponent = link.icon
        return (
          <Button
            key={link.name}
            variant="ghost"
            size="icon"
            asChild
            className={`transition-all duration-300 backdrop-blur-sm border border-white/20 text-white/80 ${link.color}`}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
              <IconComponent className="w-5 h-5" />
            </a>
          </Button>
        )
      })}
    </div>
  )
}
