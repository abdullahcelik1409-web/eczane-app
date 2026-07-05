import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { formatPhone, getMapUrl } from '../utils/helpers';

export default function PharmacyCard({ pharmacy }) {
  const handleCall = () => {
    const phone = formatPhone(pharmacy.phone);
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const handleCardPress = () => {
    const url = getMapUrl(pharmacy);
    if (url) Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Ionicons name="medical" size={18} color="#4A90D9" />
        <Text style={styles.name} numberOfLines={1}>
          {pharmacy.name}
        </Text>
      </View>

      {pharmacy.district ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{pharmacy.district}</Text>
        </View>
      ) : null}

      {pharmacy.address ? (
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.address} numberOfLines={2}>
            {pharmacy.address}
          </Text>
        </View>
      ) : null}

      {pharmacy.phone ? (
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={14} color="#6B7280" />
          <Text style={styles.phone}>{pharmacy.phone}</Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.callBtn]}
          onPress={handleCall}
          activeOpacity={0.7}
        >
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={styles.callBtnText}>Ara</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.mapBtn]}
          onPress={handleCardPress}
          activeOpacity={0.7}
        >
          <Ionicons name="map" size={16} color="#FFFFFF" />
          <Text style={styles.mapBtnText}>Yol Tarifi</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    flex: 1,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A90D9',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  address: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    lineHeight: 18,
  },
  phone: {
    fontSize: 13,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  callBtn: {
    backgroundColor: '#34C759',
  },
  mapBtn: {
    backgroundColor: '#007AFF',
  },
  callBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  mapBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
