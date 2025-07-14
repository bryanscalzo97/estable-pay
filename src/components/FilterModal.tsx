import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

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

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Filter Invoices</Text>

          <Text style={styles.sectionTitle}>Status</Text>
          <FlatList
            data={STATUS_OPTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={styles.optionRow}
                onPress={() => toggleStatus(item)}
              >
                <View style={styles.checkbox}>
                  {selectedStatus.includes(item) && (
                    <View style={styles.checked} />
                  )}
                </View>
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
          />

          <Text style={styles.sectionTitle}>Crypto</Text>
          <FlatList
            data={CRYPTO_OPTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={styles.optionRow}
                onPress={() => toggleCrypto(item)}
              >
                <View style={styles.checkbox}>
                  {selectedCrypto.includes(item) && (
                    <View style={styles.checked} />
                  )}
                </View>
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  optionText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  clearButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#6c757d',
    fontSize: 16,
  },
});
