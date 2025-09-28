import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@organizedscann:motorcycles';

export async function loadMotorcycles() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('loadMotorcycles error', e);
    return [];
  }
}

export async function saveMotorcycles(list) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('saveMotorcycles error', e);
  }
}

export async function addMotorcycle(m) {
  const list = await loadMotorcycles();
  list.unshift(m);
  await saveMotorcycles(list);
  return list;
}
