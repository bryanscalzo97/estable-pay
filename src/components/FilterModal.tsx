import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const STATUS_OPTIONS = ['CREATED', 'PENDING', 'COMPLETED', 'EXPIRED'];
const CRYPTO_OPTIONS = ['USDT-TRX', 'USDT-ETH', 'ETH', 'TRX'];

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { status: string[]; crypto: string[] }) => void;
  initialStatus?: string[];
  initialCrypto?: string[];
};

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  initialStatus = STATUS_OPTIONS,
  initialCrypto = CRYPTO_OPTIONS,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(initialStatus);
  const [selectedCrypto, setSelectedCrypto] = useState<string[]>(initialCrypto);

  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const toggleCrypto = (crypto: string) => {
    setSelectedCrypto((prev) =>
      prev.includes(crypto)
        ? prev.filter((c) => c !== crypto)
        : [...prev, crypto]
    );
  };

  const handleApply = () => {
    onApply({ status: selectedStatus, crypto: selectedCrypto });
    onClose();
  };

  const handleClear = () => {
    setSelectedStatus([]);
    setSelectedCrypto([]);
  };

  const renderStatusItem = ({ item }: { item: string }) => (
    <Pressable style={styles.optionRow} onPress={() => toggleStatus(item)}>
      <View
        style={[
          styles.checkbox,
          selectedStatus.includes(item) && styles.checkboxSelected,
        ]}
      >
        {selectedStatus.includes(item) && (
          <Ionicons name="checkmark" size={14} color="#fff" />
        )}
      </View>
      <Text style={styles.optionText}>{item}</Text>
    </Pressable>
  );

  const renderCryptoItem = ({ item }: { item: string }) => (
    <Pressable style={styles.optionRow} onPress={() => toggleCrypto(item)}>
      <View
        style={[
          styles.checkbox,
          selectedCrypto.includes(item) && styles.checkboxSelected,
        ]}
      >
        {selectedCrypto.includes(item) && (
          <Ionicons name="checkmark" size={14} color="#fff" />
        )}
      </View>
      <Text style={styles.optionText}>{item}</Text>
    </Pressable>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Filter Invoices</Text>
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Content (Scrollable) */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.optionsContainer}>
                {STATUS_OPTIONS.map((item) => (
                  <View key={item}>{renderStatusItem({ item })}</View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Crypto</Text>
              <View style={styles.optionsContainer}>
                {CRYPTO_OPTIONS.map((item) => (
                  <View key={item}>{renderCryptoItem({ item })}</View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#181A20',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '70%',
    maxHeight: '90%',
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
    maxHeight: 350,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#23242b',
    borderRadius: 6,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23242b',
  },
  checkboxSelected: {
    backgroundColor: '#00d1b2',
    borderColor: '#00d1b2',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
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
