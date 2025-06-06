"use client"

import { Code } from "lucide-react"

const skills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "CSS",
  "Git",
  "Discord.js",
  "HTML",
  "Editing",
  "Brand Designing",
]

export function SkillsSection() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-4">
        <Code className="w-5 h-5 text-purple-400" />
        <span className="text-white font-medium">Skills & Technologies</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-700/50 hover:bg-gray-700/70 transition-colors rounded-lg px-3 py-2 text-center"
          >
            <span className="text-gray-300 text-sm font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
