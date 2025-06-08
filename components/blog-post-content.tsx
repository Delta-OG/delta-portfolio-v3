"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface BlogPostContentProps {
  content: string
}

export function BlogPostContent({ content }: BlogPostContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Process the markdown content
  const processContent = (content: string) => {
    // Split content by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        // Extract language and code
        const lines = part.split("\n")
        const firstLine = lines[0]
        const language = firstLine.replace("```", "").trim()
        const code = lines.slice(1, -1).join("\n")
        const codeId = `code-${index}`

        return (
          <div key={index} className="relative group my-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              {language && (
                <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <span className="text-sm text-gray-400 font-mono">{language}</span>
                  <button
                    onClick={() => copyToClipboard(code, codeId)}
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {copiedCode === codeId ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono">{code}</code>
              </pre>
            </div>
          </div>
        )
      } else {
        // Process regular markdown
        return (
          <div
            key={index}
            className="prose prose-invert prose-purple max-w-none"
            dangerouslySetInnerHTML={{
              __html: processMarkdown(part),
            }}
          />
        )
      }
    })
  }

  const processMarkdown = (text: string) => {
    return (
      text
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-white mt-8 mb-4">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mt-10 mb-6">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-white mt-12 mb-8">$1</h1>')

        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        // Inline code
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">$1</code>',
        )

        // Links
        .replace(
          /\[([^\]]+)\]$$([^)]+)$$/g,
          '<a href="$2" class="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">$1</a>',
        )

        // Paragraphs
        .replace(/^(?!<[h|u|o|c|t|s|a])(.*$)/gim, '<p class="text-gray-300 leading-relaxed mb-4">$1</p>')

        // Tables
        .replace(/\|(.+)\|/g, (match, content) => {
          const cells = content.split("|").map((cell: string) => cell.trim())
          return `<tr>${cells.map((cell: string) => `<td class="border border-gray-700 px-4 py-2 text-gray-300">${cell}</td>`).join("")}</tr>`
        })

        // Line breaks
        .replace(/\n/g, "<br>")
    )
  }

  return <div className="prose prose-invert prose-purple max-w-none">{processContent(content)}</div>
}
