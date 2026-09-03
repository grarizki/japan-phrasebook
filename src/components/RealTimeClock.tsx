import { useState, useEffect } from "react"
import { useExchangeRate } from "../hooks/useExchangeRate"

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

function CityTime({
  label,
  flag,
  timeZone,
  now,
}: {
  label: string
  flag: string
  timeZone: string
  now: Date
}) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now)
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm">{flag}</span>
      <div className="leading-tight">
        <p className="text-[9px] uppercase tracking-wide text-brown-500">
          {label}
        </p>
        <p className="text-xs font-semibold text-brown-100 tabular-nums">
          {time}
        </p>
      </div>
    </div>
  )
}

export function RealTimeClock() {
  const now = useNow()
  const { rate, error } = useExchangeRate()
  return (
    <div className="flex items-center gap-3 rounded-xl bg-brown-900/70 border border-brown-800/50 px-3 py-2">
      <CityTime label="東京" flag="🇯🇵" timeZone="Asia/Tokyo" now={now} />
      <div className="w-px h-6 bg-brown-800/60" />
      <CityTime
        label="ジャカルタ"
        flag="🇮🇩"
        timeZone="Asia/Jakarta"
        now={now}
      />
      <div className="w-px h-6 bg-brown-800/60" />
      <div className="leading-tight">
        <p className="text-[9px] uppercase tracking-wide text-brown-500">
          1 JPY
        </p>
        <p className="text-xs font-semibold text-brown-100 tabular-nums">
          {error
            ? "—"
            : rate
              ? `${rate.toLocaleString("id-ID", { maximumFractionDigits: 2 })} IDR`
              : "…"}
        </p>
      </div>
    </div>
  )
}
