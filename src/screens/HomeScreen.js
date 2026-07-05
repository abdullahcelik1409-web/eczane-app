import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CityPicker from '../components/CityPicker';
import DistrictChips from '../components/DistrictChips';
import SearchBar from '../components/SearchBar';
import PharmacyList from '../components/PharmacyList';
import { fetchPharmacies } from '../api';
import { getCachedData, setCachedData, getSavedCity, saveCity } from '../cache';
import { extractDistricts, filterPharmacies } from '../utils/helpers';
import { CITIES, DEFAULT_CITY } from '../config';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [pharmacies, setPharmacies] = useState([]);
  const [districts, setDistricts] = useState(['Tümü']);
  const [selectedDistrict, setSelectedDistrict] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(
    async (forceRefresh = false) => {
      const city = selectedCity.value;
      setError(null);

      if (!forceRefresh) {
        const cached = await getCachedData(city);
        if (cached && !cached.expired) {
          setPharmacies(cached.data);
          setDistricts(extractDistricts(cached.data));
          setLoading(false);
          return;
        }

        if (cached && cached.expired) {
          setPharmacies(cached.data);
          setDistricts(extractDistricts(cached.data));
        }
      }

      try {
        const data = await fetchPharmacies(city);
        await setCachedData(city, data);
        setPharmacies(data);
        setDistricts(extractDistricts(data));
      } catch (err) {
        setError(err.message || 'Veriler yüklenirken hata oluştu');
        if (pharmacies.length === 0) {
          const cached = await getCachedData(city);
          if (cached) {
            setPharmacies(cached.data);
            setDistricts(extractDistricts(cached.data));
          }
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedCity.value]
  );

  useEffect(() => {
    (async () => {
      const saved = await getSavedCity();
      if (saved) {
        const found = CITIES.find((c) => c.value === saved);
        if (found) setSelectedCity(found);
      }
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    setSelectedDistrict('Tümü');
    setSearchQuery('');
    loadData();
  }, [selectedCity.value]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    await saveCity(city.value);
  };

  const filtered = filterPharmacies(pharmacies, searchQuery, selectedDistrict);

  return (
    <View style={styles.container}>
      <Header
        currentCity={selectedCity.label}
        onCityPress={() => setShowCityPicker(true)}
      />

      <DistrictChips
        districts={districts}
        selected={selectedDistrict}
        onSelect={setSelectedDistrict}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={`${selectedCity.label} eczanesi ara...`}
      />

      <PharmacyList
        data={filtered}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        error={error}
      />

      <CityPicker
        visible={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        onSelect={handleCitySelect}
        currentValue={selectedCity.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});
