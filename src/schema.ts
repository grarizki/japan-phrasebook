import { Schema } from "effect"

export const Category = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  description: Schema.String,
})
export type Category = Schema.Schema.Type<typeof Category>

export const Conversation = Schema.Struct({
  id: Schema.String,
  category_id: Schema.String,
  context: Schema.String,
  content: Schema.String,
  timestamp: Schema.String,
})
export type Conversation = Schema.Schema.Type<typeof Conversation>

export const Translation = Schema.Struct({
  conversation_id: Schema.String,
  translation: Schema.String,
  pronunciation: Schema.String,
})
export type Translation = Schema.Schema.Type<typeof Translation>

export const AppData = Schema.Struct({
  conversations: Schema.Array(Conversation),
  categories: Schema.Array(Category),
  translations: Schema.Array(Translation),
})
export type AppData = Schema.Schema.Type<typeof AppData>
