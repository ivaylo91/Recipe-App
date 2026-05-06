import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ChefHat } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Splash() {
  const router = useRouter();
  const { user } = useAuth();

  const goHome = () => {
    try {
      if (user) {
        router.replace('/(tabs)/home');
      } else {
        router.push('/login');
      }
    } catch (_) {
      router.push('/login');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' }}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['rgba(26,13,4,0.4)', 'rgba(26,13,4,0.7)', '#1a0d04']}
        locations={[0, 0.5, 1]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 24 }}>
          <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 40 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 }}>
              <View style={{ width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(224,123,48,0.2)' }}>
                <ChefHat size={18} color="#E07B30" />
              </View>
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>Вкусни Рецепти</Text>
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: '500', marginBottom: 8 }}>Открий</Text>
              <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold', lineHeight: 56 }}>
                Вкусни{'\n'}<Text style={{ color: '#E07B30' }}>Рецепти</Text>
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 16, lineHeight: 22 }}>
                Готви, споделяй и откривай нови{'\n'}кулинарни преживявания
              </Text>

              <View style={{ flexDirection: 'row', gap: 12, marginTop: 40 }}>
                <TouchableOpacity
                  onPress={goHome}
                  style={{ flex: 1, paddingVertical: 16, borderRadius: 16, alignItems: 'center', backgroundColor: '#E07B30' }}
                >
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                    {user ? 'Продължи' : 'Започни'}
                  </Text>
                </TouchableOpacity>

                {!user && (
                  <TouchableOpacity
                    onPress={() => router.push('/register')}
                    style={{ flex: 1, paddingVertical: 16, borderRadius: 16, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Регистрация</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}
