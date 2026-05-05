import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ChefHat, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import GlassView from '../components/GlassView';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!form.email || !form.password) { setError('Попълни всички полета.'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      router.replace('/(tabs)/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1495546968767-f0573cca821e?w=800&q=80' }}
      className="flex-1"
    >
      <LinearGradient colors={['rgba(26,13,4,0.8)', 'rgba(26,13,4,0.6)', '#1a0d04']} className="flex-1">
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 py-12" keyboardShouldPersistTaps="handled">

              <View className="items-center mb-10">
                <View className="w-14 h-14 rounded-2xl items-center justify-center mb-3" style={{ backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
                  <ChefHat size={28} color="#E07B30" />
                </View>
                <Text className="text-white text-2xl font-bold">Вкусни Рецепти</Text>
                <Text className="text-white/40 text-sm mt-1">Влез в акаунта си</Text>
              </View>

              <View className="gap-4">
                {!!error && (
                  <View className="flex-row items-center gap-2 rounded-2xl px-4 py-3" style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)' }}>
                    <AlertCircle size={16} color="#f87171" />
                    <Text className="text-red-400 text-sm flex-1">{error}</Text>
                  </View>
                )}

                <Field label="Имейл">
                  <Mail size={18} color="rgba(255,255,255,0.3)" />
                  <TextInput
                    value={form.email}
                    onChangeText={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="твоят@имейл.com"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 text-white text-sm ml-3"
                  />
                </Field>

                <Field label="Парола">
                  <Lock size={18} color="rgba(255,255,255,0.3)" />
                  <TextInput
                    value={form.password}
                    onChangeText={(v) => setForm((f) => ({ ...f, password: v }))}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-white text-sm ml-3"
                  />
                  <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
                    {showPassword ? <EyeOff size={16} color="rgba(255,255,255,0.3)" /> : <Eye size={16} color="rgba(255,255,255,0.3)" />}
                  </TouchableOpacity>
                </Field>

                <View className="items-end -mt-1">
                  <Link href="/forgot-password">
                    <Text className="text-accent/70 text-xs">Забравена парола?</Text>
                  </Link>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl items-center mt-2"
                  style={{ backgroundColor: '#E07B30', opacity: loading ? 0.6 : 1 }}
                >
                  <Text className="text-white font-semibold text-base">{loading ? 'Влизане...' : 'Влез'}</Text>
                </TouchableOpacity>
              </View>

              <Text className="text-white/40 text-sm text-center mt-8">
                Нямаш акаунт?{' '}
                <Link href="/register">
                  <Text className="text-accent font-semibold">Регистрирай се</Text>
                </Link>
              </Text>

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

function Field({ label, children }) {
  return (
    <View className="gap-1.5">
      <Text className="text-white/50 text-xs font-medium pl-1">{label}</Text>
      <GlassView className="flex-row items-center px-4 py-3.5 rounded-2xl">
        {children}
      </GlassView>
    </View>
  );
}
