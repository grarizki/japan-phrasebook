import { useState, useMemo, useCallback, Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { MY_PHRASES_ID, categories, conversations, translations } from "./data"
import { useFavorites } from "./hooks/useFavorites"
import { useUserPhrases } from "./hooks/useUserPhrases"
import { ConversationCard } from "./components/ConversationCard"
import { CategorySheet } from "./components/CategorySheet"
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

type Tab = "browse" | "add" | "favorites"

function CategoryNav({
  selected,
  onSelect,
  hasMyPhrases,
  layoutId = "category-pill",
}: {
  selected: string
  onSelect: (id: string) => void
  hasMyPhrases: boolean
  layoutId?: string
}) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pt-2 pb-2 scrollbar-none md:flex-wrap md:overflow-visible md:justify-center md:px-0">
      {hasMyPhrases && (
        <button
          onClick={() => onSelect(MY_PHRASES_ID)}
          className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === MY_PHRASES_ID
              ? "text-brown-950"
              : "text-amber-400 hover:text-amber-300"
          }`}
        >
          {selected === MY_PHRASES_ID && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-amber-400"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">✨ My Phrases</span>
        </button>
      )}
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
              layoutId={layoutId}
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
          />
        )
      })}
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>("browse")
  const [selectedCategory, setSelectedCategory] = useState("cat1")
  const [editingPhrase, setEditingPhrase] = useState<UserPhrase | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
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
    if (selectedCategory === MY_PHRASES_ID) {
      return userPhrases.map((p) => ({
        type: "user" as const,
        id: p.id,
        content: p.content,
        context: p.context,
        translation: p.translation,
        pronunciation: p.pronunciation,
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
        }
      })

    return builtIn
  }, [selectedCategory, userPhrases])

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
          <div className="px-4 pt-4 pb-2">
            <h1 className="text-xl font-bold text-brown-100 tracking-tight">
              日本語フレーズブック
            </h1>
            <p className="text-xs text-brown-500 mt-0.5">
              Offline Japanese phrasebook
            </p>
          </div>

          {tab === "browse" && (
            <div className="px-4 pb-3">
              <button
                onClick={() => setSheetOpen(true)}
                className="w-full flex items-center justify-between rounded-xl bg-brown-900/70 border border-brown-800/50 px-4 py-2.5"
              >
                <span className="text-sm font-medium text-brown-100">
                  {currentCategory.label}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-brown-500">
                    {currentCategory.count} phrases
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

        {/* Desktop Category Bar — shown on desktop browse tab */}
        {tab === "browse" && (
          <div className="hidden lg:block border-b border-brown-900/50 bg-brown-950/60">
            <div className="max-w-3xl mx-auto">
              <CategoryNav
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                hasMyPhrases={hasMyPhrases}
                layoutId="category-pill-desktop"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8 pt-4 lg:pt-10">
          <div className="max-w-3xl mx-auto">
            {favLoading || upLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-6 h-6 border-2 border-brown-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : tab === "browse" ? (
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
                      item.type === "user"
                        ? () => setEditingPhrase(item.phrase)
                        : undefined
                    }
                    onDelete={
                      item.type === "user"
                        ? () => handleDelete(item.id)
                        : undefined
                    }
                  />
                ))}
              </div>
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
        myPhraseCount={userPhrases.length}
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
