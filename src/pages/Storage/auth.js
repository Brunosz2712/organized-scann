// src/pages/Storage/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_KEY = '@organizedscann:user';
const LEGACY_USER_KEY = '@user_data';
const SESSION_KEY = '@organizedscann:session'; // "1" = logado

export async function migrateLegacyUserIfNeeded() {
  try {
    const current = await AsyncStorage.getItem(USER_KEY);
    if (current) return JSON.parse(current);

    const legacy = await AsyncStorage.getItem(LEGACY_USER_KEY);
    if (!legacy) return null;

    // migra o formato antigo para o novo
    await AsyncStorage.setItem(USER_KEY, legacy);
    return JSON.parse(legacy);
  } catch {
    return null;
  }
}

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user || {}));
  // mantém compatibilidade com tela antiga (opcional)
  await AsyncStorage.setItem(LEGACY_USER_KEY, JSON.stringify(user || {}));
}

export async function login(user) {
  await saveUser(user);
  await AsyncStorage.setItem(SESSION_KEY, '1');
  return true;
}

export async function logout() {
  await AsyncStorage.multiRemove([SESSION_KEY]);
  return true;
}

export async function getUser() {
  try {
    // tenta novo, senão migra/pega antigo
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
    return await migrateLegacyUserIfNeeded();
  } catch {
    return null;
  }
}

export async function isLoggedIn() {
  const v = await AsyncStorage.getItem(SESSION_KEY);
  return v === '1';
}
