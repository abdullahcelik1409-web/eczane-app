import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ currentCity, onCityPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Ionicons name="medical" size={28} color="#4A90D9" />
        <Text style={styles.title}>Nöbetçi Eczaneler</Text>
      </View>
      <TouchableOpacity style={styles.cityButton} onPress={onCityPress}>
        <Ionicons name="location" size={18} color="#4A90D9" />
        <Text style={styles.cityText}>{currentCity}</Text>
        <Ionicons name="chevron-down" size={16} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  cityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  cityText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4A90D9',
  },
});
