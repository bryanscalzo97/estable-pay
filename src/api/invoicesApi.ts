import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/APIClient';

// TypeScript types for the response
type CustomerInfo = {
  fullName: string;
};

type Payment = {
  createdAt: number;
  currency: string;
  amount: string;
};

type Invoice = {
  id: string;
  status: 'CREATED' | 'PENDING' | 'COMPLETED' | 'EXPIRED';
  amount: string;
  currency: string;
  createdAt: number;
  customerInfo: CustomerInfo;
  payment: Payment;
};

type InvoicesResponse = {
  success: boolean;
  data: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    items: Invoice[];
  };
};

// Function to fetch invoices
const getInvoices = async (page: number = 1): Promise<InvoicesResponse> => {
  try {
    const response = await axiosInstance.post('/invoices', {
      page,
      pageSize: 5,
      status: ['COMPLETED'],
      crypto: ['USDT-ETH'],
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to fetch invoices');
  }
};

// Hook with infinite query
export const useGetInvoicesInfinite = (params?: { pageSize?: number }) => {
  return useInfiniteQuery({
    queryKey: ['invoices', 'infinite', params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getInvoices(pageParam + 1);
      return {
        invoices: response.data.items,
        nextPage:
          response.data.page < response.data.totalPages
            ? pageParam + 1
            : undefined,
        currentPage: pageParam,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.currentPage - 1,
    refetchInterval: 300000, // Poll every 5 minutes
    staleTime: 0, // Always consider data stale for polling
    retry: 2, // Retry 2 times if the request fails
  });
};

export type { Invoice, InvoicesResponse };
