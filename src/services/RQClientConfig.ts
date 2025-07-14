import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes before refetching
    },
  },
});

export { queryClient };
