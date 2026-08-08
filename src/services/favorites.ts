import { storage } from "./storage"

const FAVORITES_KEY = "favorites"

export const favorites = {
  get: async (): Promise<Set<string>> => {
    const ids = await storage.get<string[]>(FAVORITES_KEY)
    return new Set(ids ?? [])
  },

  add: async (id: string): Promise<void> => {
    const current = (await storage.get<string[]>(FAVORITES_KEY)) ?? []
    await storage.set(FAVORITES_KEY, [...new Set([...current, id])])
  },

  remove: async (id: string): Promise<void> => {
    const current = (await storage.get<string[]>(FAVORITES_KEY)) ?? []
    await storage.set(
      FAVORITES_KEY,
      current.filter((f) => f !== id),
    )
  },
}
