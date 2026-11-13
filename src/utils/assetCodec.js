import * as assets from '../assets'

const entries = Object.entries(assets).filter(([, value]) => typeof value === 'string')
const byUrl = new Map(entries.map(([key, url]) => [url, key]))
const byKey = new Map(entries)

export const encodeAssets = (data) =>
  JSON.parse(JSON.stringify(data, (_, v) => (typeof v === 'string' && byUrl.has(v) ? `@asset:${byUrl.get(v)}` : v)))

export const decodeAssets = (data) =>
  JSON.parse(JSON.stringify(data), (_, v) =>
    typeof v === 'string' && v.startsWith('@asset:') ? (byKey.get(v.slice(7)) ?? v) : v,
  )
