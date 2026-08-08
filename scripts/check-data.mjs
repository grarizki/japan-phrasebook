#!/usr/bin/env node
// Data integrity + syntax checks for src/data.ts
// Usage:
//   node scripts/check-data.mjs              # validate
//   node scripts/check-data.mjs --review-doc # also regenerate docs/japanese-review.md
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const src = readFileSync(join(root, "src/data.ts"), "utf8")

const errors = []
const warn = (msg) => console.log("  ⚠", msg)
const fail = (msg) => errors.push(msg)

// --- extract top-level { ... } objects from an array section ---
function extractObjects(section) {
  const objs = []
  let i = section.indexOf("{")
  while (i !== -1) {
    const open = section.indexOf("{", i)
    if (open === -1) break
    const close = section.indexOf("}", open)
    if (close === -1) break
    objs.push(section.slice(open, close + 1))
    i = close + 1
  }
  return objs
}

function field(obj, name) {
  const m = obj.match(new RegExp(name + `: "([^"]*)"`))
  return m ? m[1] : undefined
}
function fieldBool(obj, name) {
  const m = obj.match(new RegExp(name + `: (true|false)`))
  return m ? m[1] === "true" : undefined
}

const convSection = src.slice(
  src.indexOf("export const conversations"),
  src.indexOf("export const translations"),
)
const transSection = src.slice(src.indexOf("export const translations"))

const convs = extractObjects(convSection).map((o) => ({
  id: field(o, "id"),
  cat: field(o, "category_id"),
  content: field(o, "content"),
}))
const trans = extractObjects(transSection).map((o) => ({
  conversation_id: field(o, "conversation_id"),
  translation: field(o, "translation"),
  pronunciation: field(o, "pronunciation"),
  verified: fieldBool(o, "verified"),
  verified_by: field(o, "verified_by"),
  verified_at: field(o, "verified_at"),
}))

const JA_RE = /[\u3040-\u30ff\u4e00-\u9faf]/
const KANA_RE = /[\u3040-\u30ff\u4e00-\u9faf]/

// --- parity ---
const convIds = new Set(convs.map((c) => c.id))
const seen = new Map()
for (const t of trans) {
  if (seen.has(t.conversation_id))
    fail(`duplicate translation for conv ${t.conversation_id}`)
  seen.set(t.conversation_id, t)
}
for (const c of convs)
  if (!seen.has(c.id)) fail(`conversation ${c.id} has no translation`)
for (const [id] of seen)
  if (!convIds.has(id)) fail(`orphan translation for unknown conv ${id}`)

// --- field checks ---
for (const t of trans) {
  if (!t.translation) fail(`${t.conversation_id}: empty translation`)
  if (!t.pronunciation) fail(`${t.conversation_id}: empty pronunciation`)
  if (!JA_RE.test(t.translation))
    fail(
      `${t.conversation_id}: translation has no Japanese characters: "${t.translation}"`,
    )
  if (/[<>{}[\]]/.test(t.translation))
    fail(
      `${t.conversation_id}: translation contains forbidden chars: "${t.translation}"`,
    )
  if (KANA_RE.test(t.pronunciation))
    fail(
      `${t.conversation_id}: pronunciation contains Japanese chars: "${t.pronunciation}"`,
    )
  if (/\s{2,}/.test(t.pronunciation))
    warn(
      `${t.conversation_id}: double space in pronunciation "${t.pronunciation}"`,
    )
  if (t.verified === true) {
    if (!t.verified_by)
      fail(`${t.conversation_id}: verified but missing verified_by`)
    if (!t.verified_at)
      fail(`${t.conversation_id}: verified but missing verified_at`)
  } else if (t.verified_by || t.verified_at) {
    fail(
      `${t.conversation_id}: has verified_by/verified_at but verified is not true`,
    )
  }
}

// --- summary ---
const verifiedCount = trans.filter((t) => t.verified === true).length
console.log(
  `conversations: ${convs.length} | translations: ${trans.length} | verified: ${verifiedCount}`,
)

// --- review doc ---
if (process.argv.includes("--review-doc")) {
  const cats = extractObjects(
    src.slice(
      src.indexOf("export const categories"),
      src.indexOf("export const conversations"),
    ),
  )
  const catName = new Map(cats.map((c) => [field(c, "id"), field(c, "name")]))
  const byCat = new Map()
  for (const c of convs) {
    const t = seen.get(c.id)
    if (!byCat.has(c.cat)) byCat.set(c.cat, [])
    byCat.get(c.cat).push({ c, t })
  }
  let md = "# Japanese Phrase Review Checklist\n\n"
  md += "Review each phrase: correct Japanese? natural? romaji matches?\n"
  md +=
    "Tick the box once a **native speaker** confirms. Corrections go back into `src/data.ts`, then set `verified: true` + `verified_by` + `verified_at`.\n\n"
  md += `Total: **${convs.length} phrases** (${verifiedCount} verified)\n\n---\n\n`
  for (const [catId, list] of byCat) {
    md += `## ${catName.get(catId) ?? catId} (${list.length})\n\n`
    for (const { c, t } of list) {
      const mark = t.verified ? "x" : " "
      md += `- [${mark}] ${c.content} — ${t.translation} — ${t.pronunciation}\n`
    }
    md += "\n"
  }
  mkdirSync(join(root, "docs"), { recursive: true })
  writeFileSync(join(root, "docs/japanese-review.md"), md)
  console.log("wrote docs/japanese-review.md")
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} error(s):`)
  for (const e of errors) console.error("  ✗", e)
  process.exit(1)
}
console.log("✓ data check passed")
