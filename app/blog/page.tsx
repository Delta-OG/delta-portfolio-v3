"use client"

import { useState } from "react"
import { getBlogPosts, getFeaturedPosts, getAllCategories, getAllTags } from "@/lib/blog-data"
import { BlogCard } from "@/components/blog-card"
import { BlogHero } from "@/components/blog-hero"
import { BlogFilters } from "@/components/blog-filters"
import { Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allPosts = getBlogPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  // Filter posts based on search and filters
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === null || post.category === selectedCategory
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <BlogHero featuredPosts={featuredPosts} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <BlogFilters
              categories={categories}
              tags={tags}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onCategoryChange={setSelectedCategory}
              onTagChange={setSelectedTag}
            />
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedTag || searchQuery) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  <Search className="w-3 h-3" />"{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-blue-300">
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  <Tag className="w-3 h-3" />
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)} className="ml-1 hover:text-purple-300">
                    ×
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <Tag className="w-3 h-3" />
                  {selectedTag}
                  <button onClick={() => setSelectedTag(null)} className="ml-1 hover:text-green-300">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
                setSelectedTag(null)
              }}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
