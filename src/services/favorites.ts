import { Context, Effect, Layer } from "effect"
import { StorageService, StorageError } from "./storage"

const FAVORITES_KEY = "favorites"

export interface FavoritesImpl {
  readonly getFavorites: () => Effect.Effect<Set<string>, StorageError>
  readonly addFavorite: (id: string) => Effect.Effect<void, StorageError>
  readonly removeFavorite: (id: string) => Effect.Effect<void, StorageError>
  readonly isFavorite: (id: string) => Effect.Effect<boolean, StorageError>
}

export class FavoritesService extends Context.Tag("FavoritesService")<
  FavoritesService,
  FavoritesImpl
>() {}

export const FavoritesLive = Layer.effect(
  FavoritesService,
  Effect.gen(function* () {
    const storage = yield* StorageService

    return {
      getFavorites: () =>
        storage.get<string[]>(FAVORITES_KEY).pipe(
          Effect.map((ids) => new Set(ids ?? [])),
        ),
      addFavorite: (id) =>
        Effect.gen(function* () {
          const current = yield* storage.get<string[]>(FAVORITES_KEY)
          const next = new Set(current ?? [])
          next.add(id)
          yield* storage.set(FAVORITES_KEY, [...next])
        }),
      removeFavorite: (id) =>
        Effect.gen(function* () {
          const current = yield* storage.get<string[]>(FAVORITES_KEY)
          const next = new Set(current ?? [])
          next.delete(id)
          yield* storage.set(FAVORITES_KEY, [...next])
        }),
      isFavorite: (id) =>
        storage.get<string[]>(FAVORITES_KEY).pipe(
          Effect.map((ids) => new Set(ids ?? []).has(id)),
        ),
    }
  }),
)
