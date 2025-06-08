import type { BlogPost } from "@/lib/blog-data"
import { BlogCard } from "./blog-card"

interface RelatedPostsProps {
  posts: BlogPost[]
  currentCategory: string
}

export function RelatedPosts({ posts, currentCategory }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">More in {currentCategory}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
