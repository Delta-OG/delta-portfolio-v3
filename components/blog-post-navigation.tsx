import type { BlogPost } from "@/lib/blog-data"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

interface BlogPostNavigationProps {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

export function BlogPostNavigation({ previousPost, nextPost }: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) return null

  return (
    <nav className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
      <div className="flex-1">
        {previousPost && (
          <Link
            href={`/blog/${previousPost.id}`}
            className="group flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <div>
              <p className="text-sm text-gray-400 mb-1">Previous</p>
              <p className="text-white font-medium line-clamp-2">{previousPost.title}</p>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextPost && (
          <Link
            href={`/blog/${nextPost.id}`}
            className="group flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/80 transition-colors text-right"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1">Next</p>
              <p className="text-white font-medium line-clamp-2">{nextPost.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </Link>
        )}
      </div>
    </nav>
  )
}
