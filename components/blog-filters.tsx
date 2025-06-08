"use client"

import { useState } from "react"
import { ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogFiltersProps {
  categories: string[]
  tags: string[]
  selectedCategory: string | null
  selectedTag: string | null
  onCategoryChange: (category: string | null) => void
  onTagChange: (tag: string | null) => void
}

export function BlogFilters({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategoryChange,
  onTagChange,
}: BlogFiltersProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showTagDropdown, setShowTagDropdown] = useState(false)

  return (
    <div className="flex gap-2">
      {/* Category Filter */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
        >
          <Filter className="w-4 h-4 mr-2" />
          {selectedCategory || "Category"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>

        {showCategoryDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-[150px]">
            <button
              onClick={() => {
                onCategoryChange(null)
                setShowCategoryDropdown(false)
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 first:rounded-t-lg"
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category)
                  setShowCategoryDropdown(false)
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-700 last:rounded-b-lg ${
                  selectedCategory === category ? "text-purple-400 bg-gray-700" : "text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tag Filter */}
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setShowTagDropdown(!showTagDropdown)}
          className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50"
        >
          <Filter className="w-4 h-4 mr-2" />
          {selectedTag || "Tag"}
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>

        {showTagDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 min-w-[150px] max-h-60 overflow-y-auto">
            <button
              onClick={() => {
                onTagChange(null)
                setShowTagDropdown(false)
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 first:rounded-t-lg"
            >
              All Tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onTagChange(tag)
                  setShowTagDropdown(false)
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-700 last:rounded-b-lg ${
                  selectedTag === tag ? "text-purple-400 bg-gray-700" : "text-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
