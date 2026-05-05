import '../global.css';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { RecipesProvider } from '../context/RecipesContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RecipesProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </RecipesProvider>
    </AuthProvider>
  );
}
