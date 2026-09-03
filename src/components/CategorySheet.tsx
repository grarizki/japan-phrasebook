import {
  CATEGORY_GROUPS,
  MY_PHRASES_ID,
  categories,
} from "../data"

function Row({
  label,
  selected,
  onSelect,
}: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
        selected
          ? "text-brown-100 bg-brown-800/60"
          : "text-brown-300 hover:bg-brown-900/60"
      }`}
    >
      <span className="font-medium">{label}</span>
    </button>
  )
}

export function CategorySheet({
  open,
  selected,
  hasMyPhrases,
  userCategories,
  onSelect,
  onClose,
}: {
  open: boolean
  selected: string
  hasMyPhrases: boolean
  userCategories: { name: string; count: number }[]
  onSelect: (id: string) => void
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 animate-fade-in" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-brown-950 border-t border-x sm:border border-brown-800/50 p-5 max-h-[80vh] overflow-y-auto animate-slide-up sm:animate-scale-in"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-brown-100">Categories</h2>
          <button
            onClick={onClose}
            className="text-brown-500 hover:text-brown-300 text-xl"
          >
            ✕
          </button>
        </div>

        {hasMyPhrases && (
          <div className="mb-2">
            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-amber-500/80">
              ✨ My Phrases
            </p>
            <Row
              label="✨ My Phrases"
              selected={selected === MY_PHRASES_ID}
              onSelect={() => onSelect(MY_PHRASES_ID)}
            />
          </div>
        )}

        {CATEGORY_GROUPS.map((group) => {
          const groupCats = categories.filter((c) => c.group === group.id)
          if (groupCats.length === 0) return null
          return (
            <div key={group.id} className="mb-2">
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-brown-500">
                {group.label}
              </p>
              <div className="overflow-hidden rounded-xl bg-brown-900/60 border border-brown-800/40">
                {groupCats.map((cat) => (
                  <Row
                    key={cat.id}
                    label={cat.name}
                    selected={selected === cat.id}
                    onSelect={() => onSelect(cat.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {userCategories.length > 0 && (
          <div className="mb-2">
            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-brown-500">
              📁 Custom
            </p>
            <div className="overflow-hidden rounded-xl bg-brown-900/60 border border-brown-800/40">
              {userCategories.map((uc) => (
                <Row
                  key={uc.name}
                  label={uc.name}
                  selected={selected === uc.name}
                  onSelect={() => onSelect(uc.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
