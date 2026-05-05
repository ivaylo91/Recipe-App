import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ChefHat } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' }}
      className="flex-1"
    >
      <LinearGradient
        colors={['rgba(26,13,4,0.4)', 'rgba(26,13,4,0.7)', '#1a0d04']}
        locations={[0, 0.5, 1]}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 px-6">
          <View className="flex-1 justify-between py-10">
            <View className="flex-row items-center gap-2 mt-4">
              <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(224,123,48,0.2)' }}>
                <ChefHat size={18} color="#E07B30" />
              </View>
              <Text className="text-white font-semibold text-sm">Вкусни Рецепти</Text>
            </View>

            <View className="mb-6">
              <Text className="text-white/60 text-base font-medium mb-2">Открий</Text>
              <Text className="text-white text-5xl font-bold leading-tight">
                Вкусни{'\n'}
                <Text className="text-accent">Рецепти</Text>
              </Text>
              <Text className="text-white/40 text-sm mt-4 leading-relaxed">
                Готви, споделяй и откривай нови{'\n'}кулинарни преживявания
              </Text>

              <View className="flex-row gap-3 mt-10">
                <TouchableOpacity
                  onPress={() => router.push(user ? '/(tabs)/home' : '/login')}
                  className="flex-1 py-4 rounded-2xl items-center"
                  style={{ backgroundColor: '#E07B30' }}
                >
                  <Text className="text-white font-semibold text-base">
                    {user ? 'Продължи' : 'Започни'}
                  </Text>
                </TouchableOpacity>
                {!user && (
                  <TouchableOpacity
                    onPress={() => router.push('/register')}
                    className="flex-1 py-4 rounded-2xl items-center border border-white/20"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <Text className="text-white font-semibold text-base">Регистрация</Text>
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
