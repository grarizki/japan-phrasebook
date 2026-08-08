import { useEffect, useState, useCallback } from "react"
import { userPhrases as userPhrasesSvc } from "../services/userPhrases"
import type { UserPhrase } from "../schema"

export function useUserPhrases() {
  const [phrases, setPhrases] = useState<UserPhrase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userPhrasesSvc.getAll().then((p) => {
      setPhrases(p)
      setLoading(false)
    })
  }, [])

  const add = useCallback(
    async (phrase: Omit<UserPhrase, "id" | "created_at">) => {
      await userPhrasesSvc.add(phrase)
      setPhrases(await userPhrasesSvc.getAll())
    },
    [],
  )

  const update = useCallback(
    async (
      id: string,
      updates: Partial<Omit<UserPhrase, "id" | "created_at">>,
    ) => {
      await userPhrasesSvc.update(id, updates)
      setPhrases(await userPhrasesSvc.getAll())
    },
    [],
  )

  const remove = useCallback(async (id: string) => {
    await userPhrasesSvc.remove(id)
    setPhrases(await userPhrasesSvc.getAll())
  }, [])

  return { phrases, add, update, remove, loading }
}
