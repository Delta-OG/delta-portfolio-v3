import type { BlogPost } from "@/lib/blog-data"
import { Calendar, Clock, Tag, User } from "lucide-react"

interface BlogPostHeaderProps {
  post: BlogPost
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="mb-8">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
          <Tag className="w-3 h-3" />
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Excerpt */}
      <p className="text-xl text-gray-300 leading-relaxed mb-8">{post.excerpt}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-gray-700 mt-8" />
    </header>
  )
}
