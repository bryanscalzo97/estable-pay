import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/RQClientConfig';
import HomeScreen from './src/screens/HomeScreen';
import FilterModalScreen from './src/screens/FilterModalScreen';

export type RootStackParamList = {
  Home: undefined;
  FilterModal: {
    status: string[];
    crypto: string[];
    onApply: (filters: { status: string[]; crypto: string[] }) => void;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FilterModal"
            component={FilterModalScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
