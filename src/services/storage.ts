import { Context, Effect, Layer } from "effect"
import localforage from "localforage"

export class StorageError {
  readonly _tag = "StorageError" as const
  constructor(readonly message: string, readonly cause?: unknown) {}
}

export interface StorageImpl {
  readonly get: <T>(key: string) => Effect.Effect<T | null, StorageError>
  readonly set: <T>(key: string, value: T) => Effect.Effect<void, StorageError>
  readonly remove: (key: string) => Effect.Effect<void, StorageError>
}

export class StorageService extends Context.Tag("StorageService")<
  StorageService,
  StorageImpl
>() {}

const store = localforage.createInstance({
  name: "japan-phrasebook",
  storeName: "app_data",
})

export const StorageLive = Layer.succeed(StorageService, {
  get: (key) =>
    Effect.tryPromise({
      try: () => store.getItem(key),
      catch: (e) => new StorageError(`Failed to get "${key}"`, e),
    }),
  set: (key, value) =>
    Effect.tryPromise({
      try: () => store.setItem(key, value).then(() => undefined),
      catch: (e) => new StorageError(`Failed to set "${key}"`, e),
    }),
  remove: (key) =>
    Effect.tryPromise({
      try: () => store.removeItem(key).then(() => undefined),
      catch: (e) => new StorageError(`Failed to remove "${key}"`, e),
    }),
})
