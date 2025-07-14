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
import { useGetInvoicesInfinite } from '../api/invoicesApi';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

const STATUS_OPTIONS = ['CREATED', 'PENDING', 'COMPLETED', 'EXPIRED'];
const CRYPTO_OPTIONS = ['USDT-TRX', 'USDT-ETH', 'ETH', 'TRX'];

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [filters, setFilters] = React.useState<{
    status: string[];
    crypto: string[];
  }>({
    status: STATUS_OPTIONS,
    crypto: CRYPTO_OPTIONS,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInvoicesInfinite({
    pageSize: 5,
    status: filters.status,
    crypto: filters.crypto,
  });

  const allInvoices = data?.pages.flatMap((page) => page.invoices) ?? [];

  const renderInvoice = ({ item }: { item: any }) => (
    <View style={styles.invoiceItem}>
      <Text style={styles.invoiceId}>ID: {item.id}</Text>
      <Text style={styles.invoiceStatus}>Status: {item.status}</Text>
      <Text style={styles.invoiceAmount}>
        Amount: {item.amount} {item.currency}
      </Text>
      <Text style={styles.invoiceCustomer}>
        Customer: {item.customerInfo.fullName}
      </Text>
      <Text style={styles.invoicePayment}>
        Payment: {item.payment.amount} {item.payment.currency}
      </Text>
    </View>
  );

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
    } as any);
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
      {allInvoices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No invoices found. Try adjusting your filters or check back later.
          </Text>
        </View>
      ) : (
        <FlatList
          data={allInvoices}
          renderItem={renderInvoice}
          keyExtractor={(item) => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          ListFooterComponent={
            hasNextPage ? (
              <View style={styles.loadingMore}>
                <ActivityIndicator size="small" color="#00d1b2" />
                <Text style={styles.loadingMoreText}>Loading more...</Text>
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
  invoiceItem: {
    backgroundColor: '#23242b',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#23242b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  invoiceId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  invoiceStatus: {
    fontSize: 14,
    color: '#00d1b2',
    marginBottom: 4,
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d1b2',
    marginBottom: 4,
  },
  invoiceCustomer: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  invoicePayment: {
    fontSize: 14,
    color: '#fff',
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
  loadingMoreText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6c757d',
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
