import { MultiTimezoneClockComponent } from "./multi-timezone-clock"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white/90">Delta</h2>
        </div>

        <div className="flex items-center gap-4">
          <MultiTimezoneClockComponent />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
