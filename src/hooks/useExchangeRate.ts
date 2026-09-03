import { useState, useEffect } from "react"

export function useExchangeRate(intervalMs = 60_000) {
  const [rate, setRate] = useState<number | null>(null)
  const [error, setError] = useState(false)

  const fetchRate = () => {
    fetch("https://open.er-api.com/v6/latest/JPY")
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
  }

  useEffect(() => {
    fetchRate()
    const id = setInterval(fetchRate, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return { rate, error }
}
