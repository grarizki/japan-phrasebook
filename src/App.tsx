import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  Suspense,
  lazy,
  useRef,
} from "react"
import { motion } from "framer-motion"
import { MY_PHRASES_ID, categories, conversations, translations } from "./data"
import { useFavorites } from "./hooks/useFavorites"
import { useUserPhrases } from "./hooks/useUserPhrases"
import { ConversationCard } from "./components/ConversationCard"
import { CategorySheet } from "./components/CategorySheet"
import { OutletSidebar } from "./components/OutletSidebar"
import { RealTimeClock } from "./components/RealTimeClock"
import type { UserPhrase } from "./schema"

const AddPhraseForm = lazy(() =>
  import("./components/AddPhraseForm").then((m) => ({
    default: m.AddPhraseForm,
  })),
)
const EditPhraseModal = lazy(() =>
  import("./components/EditPhraseModal").then((m) => ({
    default: m.EditPhraseModal,
  })),
)

type Tab = "browse" | "add" | "favorites" | "about"

function FavoritesView({
  isFavorite,
  onToggle,
  userPhrases,
  onEdit,
  onDelete,
  expandedId,
  onToggleExpand,
}: {
  isFavorite: (id: string) => boolean
  onToggle: (id: string) => void
  userPhrases: UserPhrase[]
  onEdit: (phrase: UserPhrase) => void
  onDelete: (id: string) => void
  expandedId: string | null
  onToggleExpand: (id: string) => void
}) {
  const favConvs = conversations.filter((c) => isFavorite(c.id))
  const favUser = userPhrases.filter((p) => isFavorite(p.id))

  if (favConvs.length === 0 && favUser.length === 0) {
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
    <div className="space-y-3 px-4 lg:px-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-3 lg:space-y-0">
      {favUser.map((p) => (
        <ConversationCard
          key={p.id}
          content={p.content}
          context={p.context}
          translation={p.translation}
          pronunciation={p.pronunciation}
          isFavorite={isFavorite(p.id)}
          onToggleFavorite={() => onToggle(p.id)}
          expanded={expandedId === p.id}
          onToggle={() => onToggleExpand(p.id)}
          isUserPhrase
          onEdit={() => onEdit(p)}
          onDelete={() => onDelete(p.id)}
        />
      ))}
      {favConvs.map((conv) => {
        const t = translations.find((t) => t.conversation_id === conv.id)
        if (!t) return null
        return (
          <ConversationCard
            key={conv.id}
            content={conv.content}
            context={conv.context}
            translation={t.translation}
            pronunciation={t.pronunciation}
            isFavorite={isFavorite(conv.id)}
            onToggleFavorite={() => onToggle(conv.id)}
            expanded={expandedId === conv.id}
            onToggle={() => onToggleExpand(conv.id)}
            verified={t.verified}
          />
        )
      })}
    </div>
  )
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function App() {
  const [tab, setTab] = useState<Tab>("browse")
  const [selectedCategory, setSelectedCategory] = useState("cat1")
  const [editingPhrase, setEditingPhrase] = useState<UserPhrase | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery.trim().toLowerCase(), 200)
  const searchRef = useRef<HTMLInputElement>(null)

  // Read category + tab from URL on mount (persists across refresh)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("cat")
    const tabParam = params.get("tab")
    if (cat) setSelectedCategory(cat)
    if (
      tabParam === "browse" ||
      tabParam === "add" ||
      tabParam === "favorites" ||
      tabParam === "about"
    ) {
      setTab(tabParam)
    }
  }, [])

  // Write category + tab to URL (replaceState — no history spam)
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory !== "cat1") params.set("cat", selectedCategory)
    if (tab !== "browse") params.set("tab", tab)
    const qs = params.toString()
    const url = qs
      ? `${window.location.pathname}?${qs}`
      : window.location.pathname
    if (window.location.search !== (qs ? `?${qs}` : "")) {
      window.history.replaceState(null, "", url)
    }
  }, [selectedCategory, tab])

  const { isFavorite, toggle, loading: favLoading } = useFavorites()
  const {
    phrases: userPhrases,
    add,
    update,
    remove,
    loading: upLoading,
  } = useUserPhrases()

  const hasMyPhrases = userPhrases.length > 0

  const userCategoryNames = useMemo(() => {
    return [...new Set(userPhrases.map((p) => p.category_name))]
  }, [userPhrases])

  const userSheetCategories = useMemo(() => {
    const builtInNames = new Set(categories.map((c) => c.name))
    const counts = new Map<string, number>()
    userPhrases.forEach((p) => {
      if (!builtInNames.has(p.category_name)) {
        counts.set(p.category_name, (counts.get(p.category_name) ?? 0) + 1)
      }
    })
    return [...counts.entries()].map(([name, count]) => ({ name, count }))
  }, [userPhrases])

  const currentCategory = useMemo(() => {
    if (selectedCategory === MY_PHRASES_ID) {
      return { label: "✨ My Phrases", count: userPhrases.length }
    }
    const cat = categories.find((c) => c.id === selectedCategory)
    if (cat) {
      return {
        label: cat.name,
        count: conversations.filter((c) => c.category_id === cat.id).length,
      }
    }
    return {
      label: selectedCategory,
      count: userPhrases.filter((p) => p.category_name === selectedCategory)
        .length,
    }
  }, [selectedCategory, userPhrases])

  const filtered = useMemo(() => {
    const matchesSearch = (
      content: string,
      translation: string,
      pronunciation: string,
    ) => {
      if (!debouncedQuery) return true
      return (
        content.toLowerCase().includes(debouncedQuery) ||
        translation.includes(debouncedQuery) ||
        pronunciation.toLowerCase().includes(debouncedQuery)
      )
    }

    if (debouncedQuery) {
      // Global search across all categories when searching
      const results: {
        type: "builtin" | "user"
        id: string
        content: string
        context: string
        translation: string
        pronunciation: string
        verified?: boolean
        phrase?: UserPhrase
      }[] = []

      conversations.forEach((c) => {
        const t = translations.find((t) => t.conversation_id === c.id)
        if (matchesSearch(c.content, t?.translation ?? "", t?.pronunciation ?? "")) {
          results.push({
            type: "builtin",
            id: c.id,
            content: c.content,
            context: c.context,
            translation: t?.translation ?? "",
            pronunciation: t?.pronunciation ?? "",
            verified: t?.verified,
          })
        }
      })

      userPhrases.forEach((p) => {
        if (matchesSearch(p.content, p.translation, p.pronunciation)) {
          results.push({
            type: "user",
            id: p.id,
            content: p.content,
            context: p.context,
            translation: p.translation,
            pronunciation: p.pronunciation,
            verified: false,
            phrase: p,
          })
        }
      })

      return results
    }

    if (selectedCategory === MY_PHRASES_ID) {
      return userPhrases.map((p) => ({
        type: "user" as const,
        id: p.id,
        content: p.content,
        context: p.context,
        translation: p.translation,
        pronunciation: p.pronunciation,
        verified: false,
        phrase: p,
      }))
    }

    const builtIn = conversations
      .filter((c) => c.category_id === selectedCategory)
      .map((c) => {
        const t = translations.find((t) => t.conversation_id === c.id)
        return {
          type: "builtin" as const,
          id: c.id,
          content: c.content,
          context: c.context,
          translation: t?.translation ?? "",
          pronunciation: t?.pronunciation ?? "",
          verified: t?.verified,
        }
      })

    return builtIn
  }, [selectedCategory, userPhrases, debouncedQuery])

  const handleDelete = useCallback(
    (id: string) => {
      remove(id)
      if (isFavorite(id)) toggle(id)
    },
    [remove, isFavorite, toggle],
  )

  const tabs = [
    { id: "browse" as Tab, label: "Browse", icon: "📚" },
    { id: "add" as Tab, label: "Add", icon: "➕" },
    { id: "favorites" as Tab, label: "Saved", icon: "♡" },
    { id: "about" as Tab, label: "About", icon: "ℹ️" },
  ]

  return (
    <div className="min-h-dvh bg-brown-950 flex flex-col lg:flex-row">
      {/* Desktop Sidebar Nav — hidden on mobile */}
      <nav className="hidden lg:flex lg:flex-col lg:w-44 lg:shrink-0 lg:border-r lg:border-brown-900/50 lg:bg-brown-950/95 lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex-1 flex flex-col gap-1 px-3 py-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                tab === item.id
                  ? "text-brown-100 bg-brown-800/60"
                  : "text-brown-500 hover:text-brown-300 hover:bg-brown-900/40"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
              {tab === item.id && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brown-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header — hidden on desktop */}
        <header className="lg:hidden sticky top-0 z-50 bg-brown-950/90 backdrop-blur-md border-b border-brown-900/50">
          <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-brown-100 tracking-tight">
                日本語フレーズブック
              </h1>
              <p className="text-xs text-brown-500 mt-0.5">
                Offline Japanese phrasebook
              </p>
            </div>
            <RealTimeClock />
          </div>

          {tab === "browse" && (
            <div className="px-4 pb-3 space-y-2">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-500"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <path d="M13 13l4 4" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search English or Japanese..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-brown-900/70 border border-brown-800/50 pl-9 pr-9 py-2.5 text-sm text-brown-100 placeholder:text-brown-600 focus:outline-none focus:border-brown-600 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      searchRef.current?.focus()
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-500 hover:text-brown-300 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 5l10 10M15 5L5 15" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                data-testid="category-trigger"
                onClick={() => setSheetOpen(true)}
                className="w-full flex items-center justify-between rounded-xl bg-brown-900/70 border border-brown-800/50 px-4 py-2.5"
              >
                <span className="text-sm font-medium text-brown-100">
                  {debouncedQuery ? "All Categories" : currentCategory.label}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-brown-500">
                    {debouncedQuery
                      ? `${filtered.length} results`
                      : `${currentCategory.count} phrases`}
                  </span>
                  <span
                    className={`text-brown-500 transition-transform duration-200 ${sheetOpen ? "rotate-180" : ""}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          )}
        </header>

        {/* Desktop Top Bar — search + category trigger (browse) + clock, aligned in one row */}
        <div className="hidden lg:block border-b border-brown-900/50 bg-brown-950/60">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            {tab === "browse" ? (
              <>
                <div className="relative flex-1">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-500"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="8.5" cy="8.5" r="5.5" />
                    <path d="M13 13l4 4" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search English or Japanese..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl bg-brown-900/70 border border-brown-800/50 pl-9 pr-9 py-2.5 text-sm text-brown-100 placeholder:text-brown-600 focus:outline-none focus:border-brown-600 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        searchRef.current?.focus()
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-500 hover:text-brown-300 transition-colors"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 5l10 10M15 5L5 15" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  data-testid="category-trigger"
                  onClick={() => setSheetOpen(true)}
                  className="flex items-center justify-between rounded-xl bg-brown-900/70 border border-brown-800/50 px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-brown-100">
                    {debouncedQuery ? "All" : currentCategory.label}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-brown-500">
                      {debouncedQuery
                        ? `${filtered.length}`
                        : `${currentCategory.count}`}
                    </span>
                    <span
                      className={`text-brown-500 transition-transform duration-200 ${sheetOpen ? "rotate-180" : ""}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 7.5L10 12.5L15 7.5" />
                      </svg>
                    </span>
                  </span>
                </button>
              </>
            ) : (
              <div className="flex-1" />
            )}
            <RealTimeClock />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8 pt-4 lg:pt-10">
          <div className="max-w-3xl mx-auto">
            {favLoading || upLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-6 h-6 border-2 border-brown-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : tab === "browse" ? (
              <>
                {selectedCategory === "cat23" && (
                  <div className="px-4 lg:px-0 mb-4">
                    <OutletSidebar />
                  </div>
                )}
                <div className="space-y-3 px-4 lg:px-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-3 lg:space-y-0">
                  {filtered.map((item) => (
                    <ConversationCard
                      key={item.id}
                      content={item.content}
                      context={item.context}
                      translation={item.translation}
                      pronunciation={item.pronunciation}
                      isFavorite={isFavorite(item.id)}
                      onToggleFavorite={() => toggle(item.id)}
                      expanded={expandedId === item.id}
                      onToggle={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                      isUserPhrase={item.type === "user"}
                      onEdit={
                        item.type === "user" && item.phrase
                          ? () => setEditingPhrase(item.phrase!)
                          : undefined
                      }
                      onDelete={
                        item.type === "user"
                          ? () => handleDelete(item.id)
                          : undefined
                      }
                      verified={item.verified}
                    />
                  ))}
                </div>
                <a
                  href="/japan-bakeries/"
                  className="mx-4 lg:mx-0 mt-3 lg:mt-4 flex items-center justify-between gap-3 rounded-xl bg-brown-900/70 border border-brown-800/50 px-4 py-3.5 transition-colors hover:bg-brown-900/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🍞</span>
                    <span>
                      <span className="block text-sm font-medium text-brown-100">
                        Japan Bakeries
                      </span>
                      <span className="block text-xs text-brown-500">
                        Discover bakeries across Japan →
                      </span>
                    </span>
                  </span>
                </a>
              </>
            ) : tab === "add" ? (
              <div className="max-w-lg mx-auto">
                <Suspense
                  fallback={
                    <div className="flex justify-center py-10">
                      <div className="w-6 h-6 border-2 border-brown-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <AddPhraseForm
                    userCategories={userCategoryNames}
                    onSave={(phrase) => add(phrase)}
                  />
                </Suspense>
              </div>
            ) : tab === "about" ? (
              <div className="max-w-lg mx-auto px-4 lg:px-0">
                <div className="rounded-xl bg-brown-900/70 border border-brown-800/50 px-5 py-6 space-y-3">
                  <h2 className="text-lg font-bold text-brown-100">About</h2>
                  <p className="text-sm text-brown-400 leading-relaxed">
                    Hi, I'm grarizki. I built this offline phrasebook to help
                    travelers navigate daily life in Japan — from konbini runs
                    to restaurant orders.
                  </p>
                  <p className="text-sm text-brown-400 leading-relaxed">
                    I also explore Japan's bakery scene. More of my work:
                  </p>
                  <a
                    href="https://grarizki.github.io/"
                    className="inline-block text-sm font-medium text-brown-100 underline decoration-brown-600 underline-offset-4 hover:text-brown-300"
                  >
                    grarizki.github.io →
                  </a>
                </div>
              </div>
            ) : (
              <FavoritesView
                isFavorite={isFavorite}
                onToggle={toggle}
                userPhrases={userPhrases}
                onEdit={setEditingPhrase}
                onDelete={handleDelete}
                expandedId={expandedId}
                onToggleExpand={(id) =>
                  setExpandedId(expandedId === id ? null : id)
                }
              />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar — hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-brown-950/95 backdrop-blur-md border-t border-brown-900/50 safe-area-pb">
        <div className="flex">
          {tabs.map((item) => (
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

      {/* Category Sheet (mobile) */}
      <CategorySheet
        open={sheetOpen}
        selected={selectedCategory}
        hasMyPhrases={hasMyPhrases}
        userCategories={userSheetCategories}
        onSelect={(id) => {
          setSelectedCategory(id)
          setSheetOpen(false)
          setExpandedId(null)
        }}
        onClose={() => setSheetOpen(false)}
      />

      {/* Edit Modal */}
      {editingPhrase && (
        <Suspense fallback={null}>
          <EditPhraseModal
            phrase={editingPhrase}
            onClose={() => setEditingPhrase(null)}
            onSave={(id, updates) => update(id, updates)}
          />
        </Suspense>
      )}
    </div>
  )
}
