import { useState } from "react"
import type { UserPhrase } from "../schema"

export function EditPhraseModal({
  phrase,
  onClose,
  onSave,
}: {
  phrase: UserPhrase
  onClose: () => void
  onSave: (
    id: string,
    updates: Partial<Omit<UserPhrase, "id" | "created_at">>,
  ) => void
}) {
  const [content, setContent] = useState(phrase.content)
  const [context, setContext] = useState(phrase.context)
  const [translation, setTranslation] = useState(phrase.translation)
  const [pronunciation, setPronunciation] = useState(phrase.pronunciation)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(phrase.id, { content, context, translation, pronunciation })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 animate-fade-in" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-brown-950 border border-brown-800/50 p-5 max-h-[85vh] overflow-y-auto animate-slide-up"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-brown-100">Edit Phrase</h2>
          <button
            onClick={onClose}
            className="text-brown-500 hover:text-brown-300 text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brown-400">
              English Phrase
            </label>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 outline-none focus:border-brown-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brown-400">
              Context
            </label>
            <input
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 outline-none focus:border-brown-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brown-400">
              Japanese Translation
            </label>
            <input
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              required
              className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 outline-none focus:border-brown-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brown-400">
              Pronunciation
            </label>
            <input
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              className="w-full rounded-xl bg-brown-900/80 border border-brown-800/50 px-3 py-2.5 text-sm text-brown-100 outline-none focus:border-brown-600"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-brown-900/80 border border-brown-800/50 px-4 py-2.5 text-sm font-medium text-brown-300 hover:bg-brown-800/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-brown-400 px-4 py-2.5 text-sm font-semibold text-brown-950 hover:bg-brown-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
