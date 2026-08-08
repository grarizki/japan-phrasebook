import { useState } from "react"
import { categories } from "../data"

export function AddPhraseForm({
  userCategories,
  onSave,
}: {
  userCategories: string[]
  onSave: (phrase: {
    category_id: string
    category_name: string
    content: string
    context: string
    translation: string
    pronunciation: string
  }) => void
}) {
  const [categoryId, setCategoryId] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [content, setContent] = useState("")
  const [context, setContext] = useState("")
  const [translation, setTranslation] = useState("")
  const [pronunciation, setPronunciation] = useState("")
  const [saved, setSaved] = useState(false)

  const isNewCategory = categoryId === "__new__"
  const allUserCats = [...new Set(userCategories)]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const catId = isNewCategory
      ? `user_${newCategory.toLowerCase().replace(/\s+/g, "_")}`
      : categoryId
    const catName = isNewCategory
      ? newCategory
      : (categories.find((c) => c.id === categoryId)?.name ?? categoryId)

    onSave({
      category_id: catId,
      category_name: catName,
      content,
      context,
      translation,
      pronunciation,
    })

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setContent("")
    setContext("")
    setTranslation("")
    setPronunciation("")
  }

  const canSubmit =
    content && translation && (categoryId !== "__new__" || newCategory)

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4">
      {saved && (
        <div className="rounded-xl bg-green-900/50 border border-green-700/50 p-3 text-center text-green-300 text-sm animate-fade-in">
          ✓ Phrase saved!
        </div>
      )}

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-brown-400">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 outline-none focus:border-brown-600"
        >
          <option value="" disabled>
            Select category...
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
          {allUserCats.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="__new__">＋ New category</option>
        </select>
      </div>

      {isNewCategory && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-brown-400">
            New Category Name
          </label>
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g. Train Station"
            required
            className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 placeholder:text-brown-700 outline-none focus:border-brown-600"
          />
        </div>
      )}

      {/* English phrase */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-brown-400">
          English Phrase
        </label>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="e.g. Where is the exit?"
          required
          className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 placeholder:text-brown-700 outline-none focus:border-brown-600"
        />
      </div>

      {/* Context */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-brown-400">Context</label>
        <input
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. At the airport"
          className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 placeholder:text-brown-700 outline-none focus:border-brown-600"
        />
      </div>

      {/* Japanese translation */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-brown-400">
          Japanese Translation
        </label>
        <input
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          placeholder="e.g. 出口はどこですか？"
          required
          className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 placeholder:text-brown-700 outline-none focus:border-brown-600"
        />
      </div>

      {/* Pronunciation */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-brown-400">
          Pronunciation
        </label>
        <input
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          placeholder="e.g. Deguchi wa doko desu ka?"
          className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 placeholder:text-brown-700 outline-none focus:border-brown-600"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-brown-400 px-4 py-3 text-sm font-semibold text-brown-950 transition-colors hover:bg-brown-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Save Phrase
      </button>
    </form>
  )
}
