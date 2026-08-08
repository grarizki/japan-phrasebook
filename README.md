# 🇯🇵 Japan Phrasebook

> 日本語フレーズブック — An offline-ready Japanese phrasebook for travelers in Japan.

Browse essential travel phrases by category, save your favorites, and copy Japanese text to clipboard — all from your phone. Works offline as a PWA.

---

## ✨ Features

- 📚 **Category browsing** — Phrases organized by scenario (Convenience Store, Restaurant, Shop)
- 🇯🇵 **Japanese translations** — Full kanji/kana with romaji pronunciation guides
- ❤️ **Save favorites** — Heart any phrase for quick access later
- 📋 **Copy to clipboard** — One-tap copy of Japanese text
- ✏️ **Add your own phrases** — Custom phrases with translations and pronunciations
- 📱 **Mobile-first UI** — Bottom tab bar, scrollable category pills, touch-friendly cards
- 🖥️ **Desktop responsive** — Sidebar nav, 2-column grid on large screens
- 🌗 **Offline PWA** — Installable on Android/iOS, works without internet
- ✨ **Smooth animations** — Framer Motion spring transitions and layout animations
- 🎨 **Warm dark theme** — Stone/brown palette, `#1a1209` background

---

## 🛠 Tech Stack

| Layer        | Tool                    |
| ------------ | ----------------------- |
| ⚛️ Framework | React 19                |
| 🔷 Language  | TypeScript              |
| ⚡ Bundler   | Vite 8                  |
| 🎨 Styling   | Tailwind CSS 4          |
| 🎬 Animation | Framer Motion           |
| 💾 Storage   | localforage (IndexedDB) |
| 📦 PWA       | vite-plugin-pwa         |
| 🧹 Linting   | oxlint                  |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 8 (recommended) or npm

### Install

```bash
git clone https://github.com/grarizki/japan-phrasebook.git
cd japan-phrasebook
pnpm install
```

### Run

```bash
pnpm dev           # 🔥 Dev server at http://localhost:5173
pnpm build         # 📦 Production build → dist/
pnpm preview       # 👀 Preview production build locally
pnpm lint          # 🧹 Lint with oxlint
pnpm format        # ✨ Format with prettier
```

<details>
<summary>npm equivalents</summary>

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

</details>

---

## 📁 Project Structure

```
japan-phrasebook/
├── public/                # Static assets (favicon, etc.)
├── src/
│   ├── App.tsx            # Main app — cards, tabs, category nav
│   ├── data.ts            # Phrase data (categories, conversations, translations)
│   ├── schema.ts          # TypeScript interfaces
│   ├── main.tsx           # Entry point
│   ├── index.css          # Tailwind imports + custom theme
│   ├── components/
│   │   ├── ConversationCard.tsx   # Expandable phrase card
│   │   ├── AddPhraseForm.tsx      # Add phrase form (lazy loaded)
│   │   └── EditPhraseModal.tsx    # Edit phrase modal (lazy loaded)
│   ├── hooks/
│   │   ├── useFavorites.ts        # Favorites hook
│   │   └── useUserPhrases.ts      # User phrases hook
│   └── services/
│       ├── storage.ts       # IndexedDB wrapper (localforage)
│       ├── favorites.ts     # Favorites CRUD
│       └── userPhrases.ts   # User phrases CRUD
├── index.html             # HTML shell (lang="ja")
├── vite.config.ts         # Vite + React + Tailwind + PWA + code splitting
├── tsconfig.json          # TypeScript config
├── LICENSE                # PolyForm Noncommercial 1.0.0
└── package.json
```

---

## 📖 Adding Phrases

Edit `src/data.ts` to add new phrases. Each phrase has three parts:

```ts
// 1. Add to categories array
{ id: "cat4", name: "Train Station", description: "..." }

// 2. Add to conversations array
{ id: "conv9", category_id: "cat4", context: "At a train station", content: "Where is platform 3?", timestamp: "..." }

// 3. Add to translations array
{ conversation_id: "conv9", translation: "3番ホームはどこですか？", pronunciation: "San-ban hoomu wa doko desu ka?" }
```

Or use the **➕ Add** tab in the app to add phrases directly — they persist in IndexedDB.

---

## 🧩 Architecture

Plain async services backed by IndexedDB via `localforage`:

- **`storage.ts`** → `get`, `set`, `remove` wrappers around localforage
- **`favorites.ts`** → manages a `Set<string>` of favorited phrase IDs
- **`userPhrases.ts`** → CRUD for user-created phrases with auto-generated IDs

Heavy components (`AddPhraseForm`, `EditPhraseModal`) are **lazy loaded** via `React.lazy`. Vendor libraries are **code split** into separate cacheable chunks.

---

## 📄 License

[PolyForm Noncommercial 1.0.0](./LICENSE) — Personal, educational, and nonprofit use only. Commercial/corporate use requires permission from the copyright holder.
