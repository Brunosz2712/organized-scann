// src/pages/Storage/motorcycles.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@organizedscann:motorcycles';

// 🔥 Cache em memória síncrono
let memoryCache = [];

/** Retorna imediatamente o cache em memória (sem await). */
export function getMemory() {
  return memoryCache;
}

/** Carrega do AsyncStorage para memória (não bloqueia primeira pintura). */
export async function hydrateFromStorage() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    memoryCache = Array.isArray(parsed) ? parsed : [];
    return memoryCache;
  } catch (e) {
    console.warn('hydrateFromStorage error', e);
    return memoryCache;
  }
}

/** Persiste em background (não bloqueia UI). */
export function saveMotorcycles(list) {
  const arr = Array.isArray(list) ? list : [];
  memoryCache = arr;
  // dispara persistência sem await
  setTimeout(async () => {
    try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
    catch (e) { console.warn('saveMotorcycles error', e); }
  }, 0);
}

/** Lê (com fallback para memória). */
export async function loadMotorcycles() {
  if (Array.isArray(memoryCache) && memoryCache.length) return memoryCache;
  return hydrateFromStorage();
}

/** Add no topo e persiste em background. */
export function addMotorcycle(m) {
  const next = [m, ...memoryCache.filter(x => String(x.id) !== String(m.id))];
  saveMotorcycles(next);
  return next;
}

/** Delete local por id. */
export function deleteMotorcycleLocal(id) {
  const next = memoryCache.filter(m => String(m.id) !== String(id));
  saveMotorcycles(next);
  return next;
}

/** Update local por id. */
export function updateMotorcycleLocal(id, payload) {
  const next = memoryCache.map(m => String(m.id) === String(id) ? { ...m, ...payload } : m);
  saveMotorcycles(next);
  return next;
}
