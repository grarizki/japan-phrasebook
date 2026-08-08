import { useEffect, useState, useCallback } from "react"
import { Effect } from "effect"
import { AppRuntime } from "../runtime"
import { FavoritesService } from "../services/favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const program = Effect.gen(function* () {
      const svc = yield* FavoritesService
      return yield* svc.getFavorites()
    }).pipe(Effect.catchAll(() => Effect.succeed(new Set<string>())))

    AppRuntime.runPromise(program).then((set) => {
      setFavorites(set)
      setLoading(false)
    })
  }, [])

  const toggle = useCallback((id: string) => {
    const program = Effect.gen(function* () {
      const svc = yield* FavoritesService
      const current = yield* svc.getFavorites()
      if (current.has(id)) {
        yield* svc.removeFavorite(id)
      } else {
        yield* svc.addFavorite(id)
      }
      return yield* svc.getFavorites()
    }).pipe(Effect.catchAll(() => Effect.succeed(new Set<string>())))

    AppRuntime.runPromise(program).then(setFavorites)
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites],
  )

  return { favorites, toggle, isFavorite, loading }
}
