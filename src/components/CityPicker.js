import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CITIES } from '../config';

export default function CityPicker({ visible, onClose, onSelect, currentValue }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Şehir Seçiniz</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close-circle" size={28} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={CITIES}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => {
            const isActive = item.value === currentValue;
            return (
              <TouchableOpacity
                style={[styles.cityItem, isActive && styles.cityItemActive]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Ionicons
                  name={isActive ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={isActive ? '#4A90D9' : '#9CA3AF'}
                />
                <Text style={[styles.cityLabel, isActive && styles.cityLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  closeBtn: {
    padding: 4,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  cityItemActive: {
    backgroundColor: '#F0F4FF',
  },
  cityLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
  },
  cityLabelActive: {
    color: '#4A90D9',
    fontWeight: '600',
  },
});
