import { useState } from 'react';
import { useGetInvoicesInfinite } from '../api/invoicesApi';

const STATUS_OPTIONS = ['CREATED', 'PENDING', 'COMPLETED', 'EXPIRED'];
const CRYPTO_OPTIONS = ['USDT-TRX', 'USDT-ETH', 'ETH', 'TRX'];

export type Invoice = {
  id: string;
  amount: string;
  currency: string;
  status: 'CREATED' | 'PENDING' | 'COMPLETED' | 'EXPIRED';
  customerInfo: {
    fullName: string;
  };
};

export function useInvoices() {
  const [filters, setFilters] = useState<{
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

  const allInvoices: Invoice[] = (data?.pages.flatMap(
    (page) => page.invoices
  ) ?? []) as Invoice[];

  return {
    invoices: allInvoices,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
    filters,
    setFilters,
  };
}
