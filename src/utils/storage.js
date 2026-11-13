const store = (kind) => {
  try {
    return globalThis[kind] ?? null
  } catch {
    return null
  }
}

export function read(key, fallback = null, kind = 'localStorage') {
  try {
    const raw = store(kind)?.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function write(key, value, kind = 'localStorage') {
  try {
    store(kind)?.setItem(key, JSON.stringify(value))
  } catch {
    
  }
}

export function remove(key, kind = 'localStorage') {
  try {
    store(kind)?.removeItem(key)
  } catch {
   
  }
}
