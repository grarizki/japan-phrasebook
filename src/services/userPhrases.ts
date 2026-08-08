import { storage } from "./storage"
import type { UserPhrase } from "../schema"

const USER_PHRASES_KEY = "user_phrases"

export const userPhrases = {
  getAll: async (): Promise<UserPhrase[]> => {
    return (await storage.get<UserPhrase[]>(USER_PHRASES_KEY)) ?? []
  },

  add: async (
    phrase: Omit<UserPhrase, "id" | "created_at">,
  ): Promise<UserPhrase> => {
    const current = (await storage.get<UserPhrase[]>(USER_PHRASES_KEY)) ?? []
    const newPhrase: UserPhrase = {
      ...phrase,
      id: `up_${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    await storage.set(USER_PHRASES_KEY, [...current, newPhrase])
    return newPhrase
  },

  update: async (
    id: string,
    updates: Partial<Omit<UserPhrase, "id" | "created_at">>,
  ): Promise<UserPhrase> => {
    const current = (await storage.get<UserPhrase[]>(USER_PHRASES_KEY)) ?? []
    const idx = current.findIndex((p) => p.id === id)
    if (idx === -1) throw new Error(`Phrase "${id}" not found`)
    const updated = {
      ...current[idx],
      ...updates,
      id,
      created_at: current[idx].created_at,
    }
    current[idx] = updated
    await storage.set(USER_PHRASES_KEY, current)
    return updated
  },

  remove: async (id: string): Promise<void> => {
    const current = (await storage.get<UserPhrase[]>(USER_PHRASES_KEY)) ?? []
    await storage.set(
      USER_PHRASES_KEY,
      current.filter((p) => p.id !== id),
    )
  },
}
