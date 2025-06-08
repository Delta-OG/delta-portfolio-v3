import type { BlogPost } from "@/lib/blog-data"
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react"
import Link from "next/link"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all duration-300 group">
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-sm">{post.category}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">{post.category}</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-gray-500 text-sm">by {post.author}</span>
        </div>
      </div>
    </article>
  )
}
