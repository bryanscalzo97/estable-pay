import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useInvoices, Invoice } from '../hooks/useInvoices';
import { InvoiceCard } from '../components/InvoiceCard';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {
    invoices,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
    filters,
    setFilters,
  } = useInvoices();

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const openFilterModal = () => {
    navigation.navigate('FilterModal', {
      status: filters.status,
      crypto: filters.crypto,
      onApply: (newFilters: { status: string[]; crypto: string[] }) =>
        setFilters(newFilters),
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#181A20" />
        <Header onFilterPress={openFilterModal} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00d1b2" />
          <Text style={styles.loadingText}>Loading invoices...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#181A20" />
        <Header onFilterPress={openFilterModal} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading invoices</Text>
          <Text style={styles.errorDetails}>{error?.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      <Header onFilterPress={openFilterModal} />
      {invoices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No invoices found. Try adjusting your filters or check back later.
          </Text>
        </View>
      ) : (
        <FlatList<Invoice>
          data={invoices}
          renderItem={({ item }) => <InvoiceCard invoice={item} />}
          keyExtractor={(item) => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              colors={['#00d1b2']} // Android
              tintColor="#00d1b2" // iOS
            />
          }
          ListFooterComponent={
            hasNextPage ? (
              <View style={styles.loadingMore}>
                <ActivityIndicator size="small" color="#00d1b2" />
              </View>
            ) : null
          }
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 8,
  },
  errorDetails: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  loadingMore: {
    padding: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default HomeScreen;
