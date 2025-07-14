import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import {
  useFilterModalState,
  STATUS_OPTIONS,
  CRYPTO_OPTIONS,
} from '../hooks/useFilterModalState';
import { FilterOptionList } from '../components/FilterOptionList';

type FilterModalScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FilterModal'
>;
type FilterModalScreenRouteProp = RouteProp<RootStackParamList, 'FilterModal'>;

type OnApplyType = (filters: { status: string[]; crypto: string[] }) => void;

type FilterModalParams = {
  status?: string[];
  crypto?: string[];
  onApply?: OnApplyType;
};

export default function FilterModalScreen() {
  const navigation = useNavigation<FilterModalScreenNavigationProp>();
  const route = useRoute<FilterModalScreenRouteProp>();
  const {
    status: initialStatus = STATUS_OPTIONS,
    crypto: initialCrypto = CRYPTO_OPTIONS,
    onApply,
  } = (route.params as FilterModalParams) || {};

  const {
    selectedStatus,
    selectedCrypto,
    toggleStatus,
    toggleCrypto,
    handleClear,
  } = useFilterModalState(initialStatus, initialCrypto);

  const handleApply = () => {
    if (onApply) {
      onApply({ status: selectedStatus, crypto: selectedCrypto });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Filter Invoices</Text>
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          <FilterOptionList
            options={STATUS_OPTIONS}
            selected={selectedStatus}
            onToggle={toggleStatus}
            label="Status"
          />
          <FilterOptionList
            options={CRYPTO_OPTIONS}
            selected={selectedCrypto}
            onToggle={toggleCrypto}
            label="Crypto"
          />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#23242b',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: '#00d1b2',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#23242b',
    backgroundColor: '#181A20',
  },
  applyButton: {
    backgroundColor: '#00d1b2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
