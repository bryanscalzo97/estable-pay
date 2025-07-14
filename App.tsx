import HomeScreen from './src/screens/HomeScreen';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/RQClientConfig';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />;
    </QueryClientProvider>
  );
}
