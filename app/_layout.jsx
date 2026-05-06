import '../global.css';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { RecipesProvider } from '../context/RecipesContext';
import { StatusBar } from 'expo-status-bar';

function AuthRedirect() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inTabs = segments[0] === '(tabs)';
    // Only redirect if already in the wrong place — never interrupt an in-progress navigation
    if (!user && inTabs) {
      router.replace('/login');
    }
  }, [user, loading]); // intentionally NOT including segments — avoids race condition

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <RecipesProvider>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }} />
            <AuthRedirect />
          </RecipesProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
