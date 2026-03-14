import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '../src/contexts/AuthContext';
import { VinylsProvider } from '../src/contexts/VinylsContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <VinylsProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="products" />
            <Stack.Screen name="product/[id]" />
            <Stack.Screen name="add-product" />
            <Stack.Screen name="edit-product/[id]" />
            <Stack.Screen name="settings" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </VinylsProvider>
    </AuthProvider>
  );
}
