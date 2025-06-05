import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanyard } from "./hooks/use-lanyard"
import { StatusIndicator } from "./components/status-indicator"
import { SocialLinks } from "./components/social-links"
import { DiscordStatusAvatar } from "./components/discord-status-avatar"
import { Header } from "./components/header"
import { DebugPanel } from "./components/debug-panel"

// متغيرات المشروع - يمكن تخصيصها حسب الحاجة
const BASE_URL = "/"
const REPOSITORY_LINK = "https://github.com/Delta-OG/delta-portfolio"
const DISCORD_USER_ID = "1330617292798562401"

export default function Portfolio() {
  const { data: lanyardData, loading, error } = useLanyard(DISCORD_USER_ID)

  return (
    <div className="min-h-screen relative">
      {/* Custom Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/coding-bg.jpg')`,
        }}
      />

      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* البطاقة الرئيسية */}
            <Card className="backdrop-blur-lg bg-black/40 border border-white/20 shadow-2xl">
              <CardContent className="p-8 text-center space-y-6">
                {/* صورة الملف الشخصي مع مؤشر الحالة */}
                <div className="flex justify-center">
                  {loading ? (
                    <Skeleton className="w-32 h-32 rounded-full" />
                  ) : (
                    <DiscordStatusAvatar
                      src="/images/profile.jpg"
                      alt="Delta's Profile"
                      status={lanyardData?.discord_status || "offline"}
                      size={128}
                    />
                  )}
                </div>

                {/* التحية والمسمى الوظيفي */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg">Hey, I'm Delta! 👋</h1>
                  <p className="text-xl text-purple-200 font-medium">Software Engineering</p>
                </div>

                {/* Discord Status Badge */}
                {lanyardData && (
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="px-3 py-1 bg-black/50 backdrop-blur-sm border-white/20">
                      <StatusIndicator status={lanyardData.discord_status} />
                    </Badge>
                  </div>
                )}

                {/* معلومات Discord الإضافية */}
                {lanyardData && (
                  <div className="space-y-2">
                    <p className="text-sm text-white/70">
                      @{lanyardData.discord_user?.username || "Delta"}
                      {lanyardData.discord_user?.discriminator !== "0" && `#${lanyardData.discord_user?.discriminator}`}
                    </p>

                    {/* عرض النشاط الحالي إن وجد */}
                    {lanyardData.activities && lanyardData.activities.length > 0 && (
                      <div className="text-sm text-white/80 bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                        <p className="font-medium text-purple-300">Currently:</p>
                        <p className="text-white">{lanyardData.activities[0].name}</p>
                        {lanyardData.activities[0].details && (
                          <p className="text-xs text-white/60">{lanyardData.activities[0].details}</p>
                        )}
                        {lanyardData.activities[0].state && (
                          <p className="text-xs text-purple-300">{lanyardData.activities[0].state}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* رسالة خطأ في حالة فشل تحميل البيانات */}
                {error && !lanyardData && (
                  <div className="text-sm text-red-300 bg-red-900/30 rounded-lg p-3 backdrop-blur-sm border border-red-500/20">
                    <p>Discord status temporarily unavailable</p>
                    <p className="text-xs text-red-400 mt-1">Using fallback data</p>
                  </div>
                )}

                {/* روابط التواصل الاجتماعي */}
                <div className="pt-4">
                  <SocialLinks />
                </div>

                {/* معلومات إضافية */}
                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs text-white/60">Built with ❤️ using Next.js & Tailwind CSS</p>
                  <div className="flex justify-center gap-4 mt-2 text-xs text-white/60">
                    <a
                      href={REPOSITORY_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-300 transition-colors"
                    >
                      View Source
                    </a>
                    <span>•</span>
                    <a href={BASE_URL} className="hover:text-purple-300 transition-colors">
                      Visit Site
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Debug Panel */}
      <DebugPanel lanyardData={lanyardData} loading={loading} error={error} />
    </div>
  )
}
