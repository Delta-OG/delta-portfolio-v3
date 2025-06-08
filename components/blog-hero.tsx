"use client"

import { useState, useEffect } from "react"
import type { BlogPost } from "@/lib/blog-data"
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface BlogHeroProps {
  featuredPosts: BlogPost[]
}

export function BlogHero({ featuredPosts }: BlogHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (featuredPosts.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [featuredPosts.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)
  }

  if (featuredPosts.length === 0) {
    return (
      <div className="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Delta's Blog</h1>
          <p className="text-xl text-gray-300">Thoughts on development, design, and technology</p>
        </div>
      </div>
    )
  }

  const currentPost = featuredPosts[currentSlide]

  return (
    <div className="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Delta's Blog</h1>
          <p className="text-xl text-gray-300">Thoughts on development, design, and technology</p>
        </div>

        {/* Featured Post Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-sm opacity-75">Featured Article</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                    {currentPost.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(currentPost.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentPost.readTime}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">{currentPost.title}</h2>

                <p className="text-gray-300 mb-4 line-clamp-3">{currentPost.excerpt}</p>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/blog/${currentPost.id}`}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm">by {currentPost.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          {featuredPosts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-purple-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
