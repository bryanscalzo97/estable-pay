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
  TouchableOpacity,
} from 'react-native';
import { useGetInvoicesInfinite } from '../api/invoicesApi';
import { FilterModal } from '../components/FilterModal';

const HomeScreen: React.FC = () => {
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);
  const [filters, setFilters] = React.useState<{
    status: string[];
    crypto: string[];
  }>({
    status: [],
    crypto: [],
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <Text style={styles.title}>Estable Pay</Text>
          <Text style={styles.subtitle}>Invoice Management</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading invoices...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.header}>
          <Text style={styles.title}>Estable Pay</Text>
          <Text style={styles.subtitle}>Invoice Management</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading invoices</Text>
          <Text style={styles.errorDetails}>{error?.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Text style={styles.title}>Estable Pay</Text>
        <Text style={styles.subtitle}>Invoice Management</Text>
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>
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
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingMoreText}>Loading more...</Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContainer}
      />
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        initialStatus={filters.status}
        initialCrypto={filters.crypto}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  filterButton: {
    alignSelf: 'flex-end',
    margin: 16,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  invoiceItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
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
    color: '#212529',
    marginBottom: 4,
  },
  invoiceStatus: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 4,
  },
  invoiceCustomer: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  invoicePayment: {
    fontSize: 14,
    color: '#6c757d',
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
});

export default HomeScreen;
