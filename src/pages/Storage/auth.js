import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_KEY  = '@organizedscann:auth';
export const USER_KEY  = '@organizedscann:user';
const SESSION_KEY      = '@organizedscann:session';

const LEGACY_USER_KEY  = '@user_data';

async function safeGet(key) {
  try { const raw = await AsyncStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
async function safeSet(key, val) {
  try { if (val === undefined) return; await AsyncStorage.setItem(key, JSON.stringify(val)); } catch {}
}
async function safeRemove(keys) {
  try { await AsyncStorage.multiRemove(Array.isArray(keys) ? keys : [keys]); } catch {}
}

export async function migrateLegacyUserIfNeeded() {
  const auth = await safeGet(AUTH_KEY);
  if (auth && (auth.user || auth.token)) return auth.user || null;

  const current = await safeGet(USER_KEY);
  if (current) return current;

  try {
    const legacyRaw = await AsyncStorage.getItem(LEGACY_USER_KEY);
    if (!legacyRaw) return null;
    await AsyncStorage.setItem(USER_KEY, legacyRaw);
    return JSON.parse(legacyRaw);
  } catch {
    return null;
  }
}

export async function setAuth({ user = null, token = null } = {}) {
  const payload = { user, token, loggedAt: new Date().toISOString() };
  await safeSet(AUTH_KEY, payload);
  await safeSet(USER_KEY, user || {});
  await AsyncStorage.setItem(SESSION_KEY, token ? '1' : '0');
  return payload;
}

export async function getAuth() {
  const auth = await safeGet(AUTH_KEY);
  if (auth && (auth.user || auth.token)) return auth;

  const user = await safeGet(USER_KEY) || await migrateLegacyUserIfNeeded();
  if (user) return { user, token: null, loggedAt: null };

  return { user: null, token: null, loggedAt: null };
}

export async function getToken() {
  const { token } = await getAuth();
  return token || null;
}

export async function getUser() {
  const { user } = await getAuth();
  return user || null;
}

export async function saveUser(user) {
  const auth = await getAuth();
  const next = { ...auth, user: user || null };
  await safeSet(AUTH_KEY, next);
  await safeSet(USER_KEY, user || {});
  return true;
}

export async function login(user, token = null) {
  await setAuth({ user: user || null, token });
  return true;
}

export async function logout() {
  await safeRemove([AUTH_KEY, USER_KEY, SESSION_KEY]);
  return true;
}

export async function isLoggedIn() {
  const token = await getToken();
  if (token) return true;
  try {
    const v = await AsyncStorage.getItem(SESSION_KEY);
    return v === '1';
  } catch {
    return false;
  }
}
