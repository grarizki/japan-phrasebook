import { useEffect, useRef } from "react"

export function AdUnit({
  slot,
  className = "",
}: {
  slot: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.dataset.pushed) return
    el.dataset.pushed = "true"
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // ad script unavailable (offline or blocked) — ins stays empty
    }
  }, [slot])

  return (
    <div ref={ref} className={`min-h-24 ${className}`}>
      <div className="flex items-center justify-center rounded-xl bg-brown-900/30 px-4 py-2">
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4573953451597896"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
