import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constants"
import { Send } from "lucide-react"

const PREVIEW_MESSAGES = [
  { id: 1, content: "It's over, Anakin. I have the high ground.", isSent: false },
  { id: 2, content: "You underestimate my power!", isSent: true }
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="mx-auto px-4 pt-20 max-w-5xl h-screen container">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat</p>
        </div>
        <div className="gap-2 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
              onClick={() => setTheme(t)}
            >
              <div className="relative rounded-md w-full h-8 overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 gap-px grid grid-cols-4 p-1">
                  <div className="bg-primary rounded"></div>
                  <div className="bg-secondary rounded"></div>
                  <div className="bg-accent rounded"></div>
                  <div className="bg-neutral rounded"></div>
                </div>
              </div>
              <span className="w-full font-medium text-[11px] text-center truncate">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SettingsPage