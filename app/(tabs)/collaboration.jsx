import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Users, ChefHat, Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import GlassView from '../../components/GlassView';

const chefs = [
  { id: 1, name: 'Мария Чен',     specialty: 'Азиатска Кухня',      recipes: 48, followers: '12.4 хил.', avatar: 'https://i.pravatar.cc/80?img=47' },
  { id: 2, name: 'Карлос Ривера', specialty: 'Латинска Кухня',      recipes: 62, followers: '8.9 хил.',  avatar: 'https://i.pravatar.cc/80?img=12' },
  { id: 3, name: 'София Патeл',   specialty: 'Индийски Подправки',  recipes: 35, followers: '21.1 хил.', avatar: 'https://i.pravatar.cc/80?img=32' },
  { id: 4, name: 'Джеймс Ким',   specialty: 'Корейско Барбекю',    recipes: 29, followers: '6.3 хил.',  avatar: 'https://i.pravatar.cc/80?img=8'  },
  { id: 5, name: 'Айша Мохамед', specialty: 'Близкоизточна Кухня', recipes: 41, followers: '15.7 хил.', avatar: 'https://i.pravatar.cc/80?img=45' },
];

const stats = [
  { icon: Users,   value: '24 хил.+', label: 'Членове'  },
  { icon: ChefHat, value: '1.2 хил.', label: 'Готвачи'  },
  { icon: Heart,   value: '89 хил.+', label: 'Рецепти'  },
];

export default function Collaboration() {
  return (
    <View className="flex-1 bg-brown-950">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero */}
        <View className="h-64 overflow-hidden">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(26,13,4,0.7)', 'transparent', '#1a0d04']}
            locations={[0, 0.4, 1]}
            className="absolute inset-0"
          />
          <SafeAreaView edges={['top']} className="flex-1 justify-end px-5 pb-6">
            <Text className="text-accent text-xs font-semibold uppercase tracking-widest">Общност</Text>
            <Text className="text-white text-3xl font-bold mt-1 leading-tight">
              Готвим Заедно,{'\n'}Растем Заедно
            </Text>
          </SafeAreaView>
        </View>

        {/* Stats */}
        <View className="px-5 -mt-2 mb-6">
          <GlassView className="flex-row justify-around p-4 rounded-3xl">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <View key={label} className={`items-center gap-1 ${i > 0 ? 'border-l border-white/10 pl-4' : ''}`}>
                <Icon size={20} color="#E07B30" />
                <Text className="text-white font-bold text-base">{value}</Text>
                <Text className="text-white/40 text-xs">{label}</Text>
              </View>
            ))}
          </GlassView>
        </View>

        {/* Join CTA */}
        <View className="px-5 mb-6">
          <View className="rounded-3xl p-6 overflow-hidden" style={{ backgroundColor: '#E07B30' }}>
            <View className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: 'white', transform: [{ translateX: 30 }, { translateY: -30 }] }} />
            <Text className="text-white/80 text-sm mb-1">Готов ли си да споделиш рецептите си?</Text>
            <Text className="text-white text-xl font-bold mb-4">Присъедини се към Общността</Text>
            <TouchableOpacity className="px-6 py-2.5 rounded-xl self-start" style={{ backgroundColor: 'white' }}>
              <Text className="text-accent font-semibold text-sm">Присъедини се</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Chefs */}
        <View className="px-5">
          <Text className="text-white font-semibold text-base mb-4">Топ Готвачи за Следване</Text>
          {chefs.map((chef) => (
            <GlassView key={chef.id} className="flex-row items-center gap-4 p-3 rounded-2xl mb-3">
              <Image source={{ uri: chef.avatar }} className="w-12 h-12 rounded-full" style={{ borderWidth: 2, borderColor: 'rgba(224,123,48,0.3)' }} />
              <View className="flex-1 min-w-0">
                <Text className="text-white text-sm font-semibold" numberOfLines={1}>{chef.name}</Text>
                <Text className="text-white/40 text-xs">{chef.specialty}</Text>
                <View className="flex-row gap-3 mt-0.5">
                  <Text className="text-white/30 text-xs">{chef.recipes} рецепти</Text>
                  <Text className="text-white/30 text-xs">{chef.followers} последователи</Text>
                </View>
              </View>
              <TouchableOpacity className="px-3 py-1.5 rounded-xl shrink-0" style={{ backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
                <Text className="text-accent text-xs font-medium">Следвай</Text>
              </TouchableOpacity>
            </GlassView>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
