import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ChefHat, Mail, AlertCircle, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import GlassView from '../components/GlassView';

export default function ForgotPassword() {
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState('');
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email) { setError('Въведи имейл адрес.'); return; }
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'vkusnirecepti://reset-password',
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSent(true);
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
                <Text className="text-white text-2xl font-bold">Забравена парола</Text>
                <Text className="text-white/40 text-sm mt-1 text-center">Ще ти изпратим линк за възстановяване</Text>
              </View>

              {sent ? (
                <View className="items-center gap-4">
                  <View className="w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' }}>
                    <CheckCircle size={32} color="#4ade80" />
                  </View>
                  <Text className="text-white font-semibold text-center">Провери имейла си!</Text>
                  <Text className="text-white/40 text-sm text-center">
                    Изпратихме линк за смяна на паролата на{' '}
                    <Text className="text-white/70">{email}</Text>
                  </Text>
                  <Link href="/login" className="mt-4">
                    <Text className="text-accent font-semibold text-sm">Обратно към вход</Text>
                  </Link>
                </View>
              ) : (
                <View className="gap-4">
                  {!!error && (
                    <View className="flex-row items-center gap-2 rounded-2xl px-4 py-3" style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)' }}>
                      <AlertCircle size={16} color="#f87171" />
                      <Text className="text-red-400 text-sm flex-1">{error}</Text>
                    </View>
                  )}

                  <View className="gap-1.5">
                    <Text className="text-white/50 text-xs font-medium pl-1">Имейл</Text>
                    <GlassView className="flex-row items-center px-4 py-3.5 rounded-2xl">
                      <Mail size={18} color="rgba(255,255,255,0.3)" />
                      <TextInput value={email} onChangeText={setEmail}
                        placeholder="твоят@имейл.com" placeholderTextColor="rgba(255,255,255,0.2)"
                        keyboardType="email-address" autoCapitalize="none"
                        className="flex-1 text-white text-sm ml-3" />
                    </GlassView>
                  </View>

                  <TouchableOpacity onPress={handleSubmit} disabled={loading}
                    className="w-full py-4 rounded-2xl items-center mt-2"
                    style={{ backgroundColor: '#E07B30', opacity: loading ? 0.6 : 1 }}>
                    <Text className="text-white font-semibold text-base">{loading ? 'Изпращане...' : 'Изпрати линк'}</Text>
                  </TouchableOpacity>

                  <Text className="text-white/40 text-sm text-center mt-4">
                    Спомни си?{' '}
                    <Link href="/login">
                      <Text className="text-accent font-semibold">Влез</Text>
                    </Link>
                  </Text>
                </View>
              )}

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
