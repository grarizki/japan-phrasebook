export interface Category {
  id: string
  name: string
  description: string
  group: string
}

export interface Conversation {
  id: string
  category_id: string
  context: string
  content: string
  timestamp: string
}

export interface Translation {
  conversation_id: string
  translation: string
  pronunciation: string
  verified?: boolean
  verified_by?: string
  verified_at?: string
}

export interface UserPhrase {
  id: string
  category_id: string
  category_name: string
  content: string
  context: string
  translation: string
  pronunciation: string
  created_at: string
}

export interface AppData {
  conversations: Conversation[]
  categories: Category[]
  translations: Translation[]
}
