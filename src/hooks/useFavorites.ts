import { useEffect, useState, useCallback } from "react"
import { favorites } from "../services/favorites"

export function useFavorites() {
  const [set, setSet] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    favorites.get().then((s) => {
      setSet(s)
      setLoading(false)
    })
  }, [])

  const toggle = useCallback(
    async (id: string) => {
      if (set.has(id)) {
        await favorites.remove(id)
      } else {
        await favorites.add(id)
      }
      setSet(await favorites.get())
    },
    [set],
  )

  const isFavorite = useCallback((id: string) => set.has(id), [set])

  return { favorites: set, toggle, isFavorite, loading }
}
