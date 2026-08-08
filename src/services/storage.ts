import localforage from "localforage"

const store = localforage.createInstance({
  name: "japan-phrasebook",
  storeName: "app_data",
})

export const storage = {
  get: <T>(key: string): Promise<T | null> => store.getItem<T>(key),
  set: <T>(key: string, value: T): Promise<void> =>
    store.setItem(key, value).then(() => undefined),
  remove: (key: string): Promise<void> => store.removeItem(key),
}
