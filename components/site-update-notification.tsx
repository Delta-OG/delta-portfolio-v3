"use client"

import { useState, useEffect } from "react"
import { X, Globe, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteUpdateNotificationProps {
  onClose?: () => void
}

export function SiteUpdateNotification({ onClose }: SiteUpdateNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [language, setLanguage] = useState<"en" | "ar">("en")

  useEffect(() => {
    // Show notification after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300)
  }

  const content = {
    en: {
      title: "🎉 Site Update",
      date: "Today - January 6, 2025",
      updates: [
        "✨ Added Discord Nitro effects for founders",
        "👑 Updated Chairman and Friend badges",
        "🔄 Optimized refresh intervals",
        "🌐 Added multi-language support",
        "🎨 Enhanced UI animations",
      ],
      close: "Close",
      switchLang: "عربي",
    },
    ar: {
      title: "🎉 تحديث الموقع",
      date: "اليوم - 6 يناير 2025",
      updates: [
        "✨ إضافة تأثيرات Discord Nitro للمؤسسين",
        "👑 تحديث شارات الرئيس والصديق",
        "🔄 تحسين فترات التحديث",
        "🌐 إضافة دعم متعدد اللغات",
        "🎨 تحسين الرسوم المتحركة",
      ],
      close: "إغلاق",
      switchLang: "English",
    },
  }

  const currentContent = content[language]

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 shadow-2xl shadow-purple-500/20 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold text-sm">{currentContent.title}</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="w-4 h-4 text-gray-400" />
          </Button>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-xs">{currentContent.date}</span>
        </div>

        {/* Updates List */}
        <div className="space-y-2 mb-4">
          {currentContent.updates.map((update, index) => (
            <div key={index} className="text-gray-300 text-xs leading-relaxed">
              {update}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Globe className="w-3 h-3" />
            {currentContent.switchLang}
          </button>
          <Button variant="outline" size="sm" onClick={handleClose} className="h-7 text-xs">
            {currentContent.close}
          </Button>
        </div>
      </div>
    </div>
  )
}
