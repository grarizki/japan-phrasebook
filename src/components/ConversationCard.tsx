import { useState, useCallback } from "react"

export function ConversationCard({
  content,
  context,
  translation,
  pronunciation,
  isFavorite,
  onToggleFavorite,
  expanded,
  onToggle,
  isUserPhrase,
  onEdit,
  onDelete,
}: {
  content: string
  context: string
  translation: string
  pronunciation: string
  isFavorite: boolean
  onToggleFavorite: () => void
  expanded: boolean
  onToggle: () => void
  isUserPhrase?: boolean
  onEdit?: () => void
  onDelete?: () => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(translation).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [translation])

  return (
    <div className="overflow-hidden rounded-2xl bg-brown-900/80 backdrop-blur-sm border border-brown-800/50">
      <button onClick={onToggle} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-brown-100 font-medium leading-snug">{content}</p>
            <p className="mt-1 text-xs text-brown-500">{context}</p>
          </div>
          {isUserPhrase && (
            <span className="shrink-0 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-medium px-2 py-0.5">
              My Phrase
            </span>
          )}
          <span
            className={`shrink-0 text-brown-500 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 7.5L10 12.5L15 7.5" />
            </svg>
          </span>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-brown-800/50 p-4 space-y-3">
            <div>
              <p className="text-brown-400 text-lg font-semibold leading-relaxed">
                {translation}
              </p>
              <p className="mt-1 text-brown-300/70 text-sm italic">
                {pronunciation}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite()
                }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors bg-brown-800/60 hover:bg-brown-800"
              >
                <span
                  className={`inline-block transition-transform duration-200 ${isFavorite ? "animate-pulse-heart" : ""}`}
                >
                  {isFavorite ? "❤️" : "🤍"}
                </span>
                <span className="text-brown-300">
                  {isFavorite ? "Saved" : "Save"}
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy()
                }}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors bg-brown-800/60 hover:bg-brown-800 text-brown-300"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>

              {isUserPhrase && onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit()
                  }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors bg-brown-800/60 hover:bg-brown-800 text-brown-300"
                >
                  ✏️ Edit
                </button>
              )}

              {isUserPhrase && onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete()
                  }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors bg-red-900/40 hover:bg-red-900/60 text-red-300"
                >
                  🗑 Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
