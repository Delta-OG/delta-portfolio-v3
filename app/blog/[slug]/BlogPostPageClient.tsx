"use client"

import { useParams } from "next/navigation"
import { getBlogPost, getBlogPosts } from "@/lib/blog-data"
import { BlogPostContent } from "@/components/blog-post-content"
import { BlogPostHeader } from "@/components/blog-post-header"
import { BlogPostNavigation } from "@/components/blog-post-navigation"
import { RelatedPosts } from "@/components/related-posts"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BlogPostPageClient() {
  const params = useParams()
  const slug = params.slug as string

  const post = getBlogPost(slug)
  const allPosts = getBlogPosts()

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Find related posts (same category, excluding current post)
  const relatedPosts = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  // Find previous and next posts
  const currentIndex = allPosts.findIndex((p) => p.id === post.id)
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Back to Blog Link */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 pb-12">
        <BlogPostHeader post={post} />
        <BlogPostContent content={post.content} />

        {/* Navigation */}
        <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} currentCategory={post.category} />}
      </article>
    </div>
  )
}
