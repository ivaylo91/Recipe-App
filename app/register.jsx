import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChefHat, User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import GlassView from '../components/GlassView';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirm) { setError('Попълни всички полета.'); return; }
    if (form.password.length < 6) { setError('Паролата трябва да е поне 6 символа.'); return; }
    if (form.password !== form.confirm) { setError('Паролите не съвпадат.'); return; }
    setLoading(true);
    try {
      const { requiresConfirmation } = await register(form.name, form.email, form.password);
      if (requiresConfirmation) {
        Alert.alert(
          'Провери имейла си',
          'Изпратихме ти линк за потвърждение. Потвърди акаунта и след това влез.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      setError(err.message || 'Грешка при регистрация.');
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' }}
      style={{ flex: 1 }}
    >
      <LinearGradient colors={['rgba(26,13,4,0.8)', 'rgba(26,13,4,0.6)', '#1a0d04']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }} keyboardShouldPersistTaps="handled">

              <View style={{ alignItems: 'center', marginBottom: 32 }}>
                <View style={{ width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
                  <ChefHat size={28} color="#E07B30" />
                </View>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Вкусни Рецепти</Text>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 4 }}>Създай акаунт и се присъедини</Text>
              </View>

              <View style={{ gap: 16 }}>
                {!!error && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 }}>
                    <AlertCircle size={16} color="#f87171" />
                    <Text style={{ color: '#f87171', fontSize: 14, flex: 1 }}>{error}</Text>
                  </View>
                )}

                <Field label="Име">
                  <User size={18} color="rgba(255,255,255,0.3)" />
                  <TextInput value={form.name} onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Твоето ime" placeholderTextColor="rgba(255,255,255,0.2)"
                    autoCapitalize="words" style={{ flex: 1, color: 'white', fontSize: 14, marginLeft: 12 }} />
                </Field>

                <Field label="Имейл">
                  <Mail size={18} color="rgba(255,255,255,0.3)" />
                  <TextInput value={form.email} onChangeText={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="твоят@имейл.com" placeholderTextColor="rgba(255,255,255,0.2)"
                    keyboardType="email-address" autoCapitalize="none"
                    style={{ flex: 1, color: 'white', fontSize: 14, marginLeft: 12 }} />
                </Field>

                <Field label="Парола">
                  <Lock size={18} color="rgba(255,255,255,0.3)" />
                  <TextInput value={form.password} onChangeText={(v) => setForm((f) => ({ ...f, password: v }))}
                    placeholder="Мин. 6 символа" placeholderTextColor="rgba(255,255,255,0.2)"
                    secureTextEntry={!showPassword}
                    style={{ flex: 1, color: 'white', fontSize: 14, marginLeft: 12 }} />
                  <TouchableOpacity onPress={() => setShowPassword((s) => !s)}>
                    {showPassword ? <EyeOff size={16} color="rgba(255,255,255,0.3)" /> : <Eye size={16} color="rgba(255,255,255,0.3)" />}
                  </TouchableOpacity>
                </Field>

                <Field label="Потвърди паролата">
                  <Lock size={18} color="rgba(255,255,255,0.3)" />
                  <TextInput value={form.confirm} onChangeText={(v) => setForm((f) => ({ ...f, confirm: v }))}
                    placeholder="Повтори паролата" placeholderTextColor="rgba(255,255,255,0.2)"
                    secureTextEntry={!showPassword}
                    style={{ flex: 1, color: 'white', fontSize: 14, marginLeft: 12 }} />
                </Field>

                <TouchableOpacity onPress={handleSubmit} disabled={loading}
                  style={{ backgroundColor: '#E07B30', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginTop: 8, opacity: loading ? 0.6 : 1 }}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>{loading ? 'Регистрация...' : 'Регистрирай се'}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Вече имаш акаунт? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={{ color: '#E07B30', fontWeight: '600', fontSize: 14 }}>Влез</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

function Field({ label, children }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '500', paddingLeft: 4 }}>{label}</Text>
      <GlassView style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 }}>
        {children}
      </GlassView>
    </View>
  );
}
