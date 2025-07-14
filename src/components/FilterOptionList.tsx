import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterOptionListProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  label: string;
}

export const FilterOptionList: React.FC<FilterOptionListProps> = ({
  options,
  selected,
  onToggle,
  label,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{label}</Text>
    <View style={styles.optionsContainer}>
      {options.map((item) => (
        <Pressable
          key={item}
          style={styles.optionRow}
          onPress={() => onToggle(item)}
        >
          <View
            style={[
              styles.checkbox,
              selected.includes(item) && styles.checkboxSelected,
            ]}
          >
            {selected.includes(item) && (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </View>
          <Text style={styles.optionText}>{item}</Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});
