import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function VerifiedBadge() {
  return (
    <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
      <CheckCircle className="w-3 h-3 mr-1" />
      Developer
    </Badge>
  )
}
