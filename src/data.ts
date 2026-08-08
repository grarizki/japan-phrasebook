import type { Category, Conversation, Translation } from "./schema"

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Convenience Store",
    description: "Common phrases used in convenience stores.",
  },
  {
    id: "cat2",
    name: "Restaurant",
    description: "Common phrases used in restaurants.",
  },
  {
    id: "cat3",
    name: "Shop",
    description: "Common phrases used in shops.",
  },
]

export const conversations: Conversation[] = [
  {
    id: "conv1",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Excuse me, where can I find the snacks?",
    timestamp: "2023-10-01T10:00:00Z",
  },
  {
    id: "conv2",
    category_id: "cat1",
    context: "At a convenience store",
    content: "How much is this drink?",
    timestamp: "2023-10-01T10:05:00Z",
  },
  {
    id: "conv3",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Can I see the menu, please?",
    timestamp: "2023-10-01T11:00:00Z",
  },
  {
    id: "conv4",
    category_id: "cat2",
    context: "At a restaurant",
    content: "I would like to order sushi.",
    timestamp: "2023-10-01T11:05:00Z",
  },
  {
    id: "conv5",
    category_id: "cat3",
    context: "At a shop",
    content: "Do you have this in a larger size?",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: "conv6",
    category_id: "cat3",
    context: "At a shop",
    content: "Can I try this on?",
    timestamp: "2023-10-01T12:05:00Z",
  },
  {
    id: "conv7",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Where is the restroom?",
    timestamp: "2023-10-01T10:10:00Z",
  },
  {
    id: "conv8",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Can I get the bill, please?",
    timestamp: "2023-10-01T11:10:00Z",
  },
]

export const translations: Translation[] = [
  {
    conversation_id: "conv1",
    translation: "すみません、スナックはどこにありますか？",
    pronunciation: "Sumimasen, sunakku wa doko ni arimasu ka?",
  },
  {
    conversation_id: "conv2",
    translation: "この飲み物はいくらですか？",
    pronunciation: "Kono nomimono wa ikura desu ka?",
  },
  {
    conversation_id: "conv3",
    translation: "メニューを見せていただけますか？",
    pronunciation: "Menyuu o misete itadakemasu ka?",
  },
  {
    conversation_id: "conv4",
    translation: "寿司を注文したいです。",
    pronunciation: "Sushi o chuumon shitai desu.",
  },
  {
    conversation_id: "conv5",
    translation: "これの大きいサイズはありますか？",
    pronunciation: "Kore no ookii saizu wa arimasu ka?",
  },
  {
    conversation_id: "conv6",
    translation: "これを試着してもいいですか？",
    pronunciation: "Kore o shichaku shite mo ii desu ka?",
  },
  {
    conversation_id: "conv7",
    translation: "トイレはどこですか？",
    pronunciation: "Toire wa doko desu ka?",
  },
  {
    conversation_id: "conv8",
    translation: "お会計をお願いします。",
    pronunciation: "Okaikei o onegaishimasu.",
  },
]
