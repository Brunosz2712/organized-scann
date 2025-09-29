import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = '@organizedscann:motorcycles';

// cache simples em memória
let memoryCache = [];

export async function loadMotorcycles() {
  if (memoryCache.length) return memoryCache;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    memoryCache = raw ? JSON.parse(raw) : [];
    return memoryCache;
  } catch {
    return memoryCache;
  }
}

export async function saveMotorcycles(list) {
  const arr = Array.isArray(list) ? list : [];
  memoryCache = arr;
  try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch {}
}

export function addMotorcycle(m) {
  const next = [m, ...memoryCache.filter(x => String(x.id) !== String(m.id))];
  saveMotorcycles(next);
  return next;
}

export function updateMotorcycleLocal(id, payload) {
  const next = memoryCache.map(m => String(m.id) === String(id) ? { ...m, ...payload } : m);
  saveMotorcycles(next);
  return next.find(m => String(m.id) === String(id));
}

export function deleteMotorcycleLocal(id) {
  const next = memoryCache.filter(m => String(m.id) !== String(id));
  saveMotorcycles(next);
  return next;
}
