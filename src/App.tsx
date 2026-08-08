import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { categories, conversations, translations } from "./data"
import { useFavorites } from "./hooks/useFavorites"

type Tab = "browse" | "favorites"

function CategoryNav({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === cat.id
              ? "text-brown-950"
              : "text-brown-300 hover:text-brown-100"
          }`}
        >
          {selected === cat.id && (
            <motion.span
              layoutId="category-pill"
              className="absolute inset-0 rounded-full bg-brown-400"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.name}</span>
        </button>
      ))}
    </div>
  )
}

function ConversationCard({
  conv,
  translation,
  isFavorite,
  onToggle,
}: {
  conv: { id: string; content: string; context: string }
  translation: { translation: string; pronunciation: string }
  isFavorite: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(translation.translation).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [translation.translation])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="overflow-hidden rounded-2xl bg-brown-900/80 backdrop-blur-sm border border-brown-800/50"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-brown-100 font-medium leading-snug">
              {conv.content}
            </p>
            <p className="mt-1 text-xs text-brown-500">{conv.context}</p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-brown-500"
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
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-brown-800/50 p-4 space-y-3">
              <div>
                <p className="text-brown-400 text-lg font-semibold leading-relaxed">
                  {translation.translation}
                </p>
                <p className="mt-1 text-brown-300/70 text-sm italic">
                  {translation.pronunciation}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle()
                  }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors bg-brown-800/60 hover:bg-brown-800"
                >
                  <motion.span
                    animate={
                      isFavorite
                        ? { scale: [1, 1.3, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {isFavorite ? "❤️" : "🤍"}
                  </motion.span>
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FavoritesView({
  isFavorite,
  onToggle,
}: {
  isFavorite: (id: string) => boolean
  onToggle: (id: string) => void
}) {
  const favConvs = conversations.filter((c) => isFavorite(c.id))

  if (favConvs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-brown-500">
        <span className="text-4xl mb-3">♡</span>
        <p className="text-sm">No saved phrases yet</p>
        <p className="text-xs mt-1 text-brown-600">
          Tap the heart on any card to save it
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 px-4">
      <AnimatePresence mode="popLayout">
        {favConvs.map((conv) => {
          const t = translations.find((t) => t.conversation_id === conv.id)
          if (!t) return null
          return (
            <ConversationCard
              key={conv.id}
              conv={conv}
              translation={t}
              isFavorite={isFavorite(conv.id)}
              onToggle={() => onToggle(conv.id)}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>("browse")
  const [selectedCategory, setSelectedCategory] = useState("cat1")
  const { isFavorite, toggle, loading } = useFavorites()

  const filtered = conversations.filter(
    (c) => c.category_id === selectedCategory,
  )

  return (
    <div className="min-h-dvh bg-brown-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brown-950/90 backdrop-blur-md border-b border-brown-900/50">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-brown-100 tracking-tight">
            日本語フレーズブック
          </h1>
          <p className="text-xs text-brown-500 mt-0.5">
            Offline Japanese phrasebook
          </p>
        </div>

        {tab === "browse" && (
          <CategoryNav
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20 pt-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-brown-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === "browse" ? (
          <div className="space-y-3 px-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((conv) => {
                const t = translations.find(
                  (t) => t.conversation_id === conv.id,
                )
                if (!t) return null
                return (
                  <ConversationCard
                    key={conv.id}
                    conv={conv}
                    translation={t}
                    isFavorite={isFavorite(conv.id)}
                    onToggle={() => toggle(conv.id)}
                  />
                )
              })}
            </AnimatePresence>
          </div>
        ) : (
          <FavoritesView isFavorite={isFavorite} onToggle={toggle} />
        )}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-brown-950/95 backdrop-blur-md border-t border-brown-900/50 safe-area-pb">
        <div className="flex">
          {([
            { id: "browse" as Tab, label: "Browse", icon: "📚" },
            { id: "favorites" as Tab, label: "Saved", icon: "♡" },
          ]).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition-colors ${
                tab === item.id
                  ? "text-brown-300"
                  : "text-brown-600 hover:text-brown-400"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
              {tab === item.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute top-0 h-0.5 w-12 bg-brown-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
