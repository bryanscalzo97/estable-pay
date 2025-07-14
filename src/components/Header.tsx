import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

type HeaderProps = {
  onFilterPress?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onFilterPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}>
        <Feather name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.logoText}>
          estAble
          <Text style={styles.logoAccent}>pay</Text>
        </Text>
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
          <Feather name="filter" size={22} color="#00d1b2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181A20',
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#23242b',
  },
  iconButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logoAccent: {
    color: '#00d1b2',
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
