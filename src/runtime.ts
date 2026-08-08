import { Layer, ManagedRuntime } from "effect"
import { StorageLive } from "./services/storage"
import { FavoritesLive } from "./services/favorites"

const AppLayer = FavoritesLive.pipe(Layer.provide(StorageLive))

export const AppRuntime = ManagedRuntime.make(AppLayer)
