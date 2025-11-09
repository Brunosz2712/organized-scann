import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@organizedscann:motorcycles';


let memoryCache = [];
let hydrated = false;

const toId = (v) => (v == null ? '' : String(v));


async function readPersisted() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function writePersisted(arr) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {}
}

function dedupeAndSort(list) {
  const map = new Map();
  for (const it of Array.isArray(list) ? list : []) {
    if (!it) continue;
    const id = toId(it.id);
    if (!id) continue;
    map.set(id, { ...it, id });
  }
  return Array.from(map.values());
}

export async function loadMotorcycles() {
  if (!hydrated) {
    memoryCache = dedupeAndSort(await readPersisted());
    hydrated = true;
  }
  return memoryCache;
}

export async function saveMotorcycles(list) {
  const arr = dedupeAndSort(list);
  memoryCache = arr;
  await writePersisted(arr);
  return arr;
}

export function addMotorcycle(m) {
  const id = toId(m?.id) || String(Date.now());
  const next = dedupeAndSort([{ ...m, id }, ...memoryCache.filter(x => toId(x.id) !== id)]);
  memoryCache = next;
  writePersisted(next);
  return next;
}

export function updateMotorcycleLocal(id, payload) {
  const _id = toId(id);
  let updated = null;
  const next = memoryCache.map(m => {
    if (toId(m.id) === _id) {
      updated = { ...m, ...payload, id: _id };
      return updated;
    }
    return m;
  });
  memoryCache = next;
  writePersisted(next);
  return updated;
}

export function deleteMotorcycleLocal(id) {
  const _id = toId(id);
  const next = memoryCache.filter(m => toId(m.id) !== _id);
  memoryCache = next;
  writePersisted(next);
  return next;
}

export async function clearMotorcycles() {
  memoryCache = [];
  hydrated = true;
  try { await AsyncStorage.removeItem(STORAGE_KEY); } catch {}
  return [];
}

export function getMotorcycleById(id) {
  const _id = toId(id);
  return memoryCache.find(m => toId(m.id) === _id) || null;
}
