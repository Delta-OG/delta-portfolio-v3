import { getBlogPosts } from "@/lib/blog-data"
import BlogPostPageClient from "./BlogPostPageClient"

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default function BlogPostPage() {
  return <BlogPostPageClient />
}
