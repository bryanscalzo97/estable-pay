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

type GetInvoicesParams = {
  pageSize?: number;
  status?: string[];
  crypto?: string[];
};

// Function to fetch invoices with dynamic filters
const getInvoices = async (
  page: number = 1,
  { pageSize = 5, status, crypto }: GetInvoicesParams = {}
): Promise<InvoicesResponse> => {
  try {
    const response = await axiosInstance.post('/invoices', {
      page,
      pageSize,
      status,
      crypto,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw new Error('Failed to fetch invoices');
  }
};

// Hook with infinite query and dynamic filters
export const useGetInvoicesInfinite = (params: GetInvoicesParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['invoices', 'infinite', params],
    queryFn: async ({ pageParam = 0 }) => {
      const page = pageParam + 1;
      const response = await getInvoices(page, params);
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
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 0, // Always consider data stale for polling
    retry: 2, // Retry 2 times if the request fails
  });
};

export type { Invoice, InvoicesResponse };
