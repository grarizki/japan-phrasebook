import { useState, useEffect } from "react"

export function useExchangeRate(intervalMs = 60_000) {
  const [rate, setRate] = useState<number | null>(null)
  const [error, setError] = useState(false)

  const fetchRate = () => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    fetch("https://open.er-api.com/v6/latest/JPY", {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data) => {
        if (data.rates?.IDR) {
          setRate(data.rates.IDR)
          setError(false)
        }
      })
      .catch(() => setError(true))
      .finally(() => clearTimeout(timeout))
  }

  useEffect(() => {
    fetchRate()
    const id = setInterval(fetchRate, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return { rate, error }
}
