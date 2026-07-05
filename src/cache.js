import AsyncStorage from '@react-native-async-storage/async-storage';
import { CACHE_TTL_MS } from './config';

const CITY_KEY = '@selected_city';

export async function getCachedData(city) {
  try {
    const raw = await AsyncStorage.getItem(`@pharmacy_${city}`);
    if (!raw) return null;

    const { timestamp, data } = JSON.parse(raw);
    const age = Date.now() - new Date(timestamp).getTime();

    return { data, expired: age > CACHE_TTL_MS, timestamp };
  } catch {
    return null;
  }
}

export async function setCachedData(city, data) {
  const entry = { timestamp: new Date().toISOString(), data };
  await AsyncStorage.setItem(`@pharmacy_${city}`, JSON.stringify(entry));
}

export async function getSavedCity() {
  try {
    const raw = await AsyncStorage.getItem(CITY_KEY);
    return raw || null;
  } catch {
    return null;
  }
}

export async function saveCity(cityValue) {
  await AsyncStorage.setItem(CITY_KEY, cityValue);
}
