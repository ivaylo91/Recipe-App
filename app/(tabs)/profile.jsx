import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Star, BookOpen, Heart, ChevronRight, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { useRecipes } from '../../context/RecipesContext';
import GlassView from '../../components/GlassView';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { recipes } = useRecipes();
  const myRecipes   = recipes.filter((r) => r.userId === user?.id);
  const savedPreview = recipes.slice(0, 3);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const menuItems = [
    { icon: BookOpen, label: 'Моите Рецепти', action: () => router.push('/(tabs)/home') },
    { icon: Heart,    label: 'Любими',         action: () => {} },
    { icon: Star,     label: 'Ревюта',         action: () => {} },
    { icon: Settings, label: 'Настройки',      action: () => {} },
  ];

  return (
    <View className="flex-1 bg-brown-950">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="h-56 overflow-hidden">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1495546968767-f0573cca821e?w=800&q=80' }}
            className="absolute w-full h-full opacity-20"
            resizeMode="cover"
          />
          <LinearGradient colors={['transparent', '#1a0d04']} locations={[0.4, 1]} className="absolute inset-0" />
          <SafeAreaView edges={['top']} className="px-5 pt-2">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-white text-xl font-bold">Профил</Text>
              <TouchableOpacity className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
                <Settings size={16} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View className="items-center pb-4">
            <View>
              <Image
                source={{ uri: user?.avatar || 'https://i.pravatar.cc/96?img=20' }}
                className="w-24 h-24 rounded-full"
                style={{ borderWidth: 4, borderColor: 'rgba(224,123,48,0.5)' }}
              />
              <View className="absolute bottom-0 right-0 w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: '#E07B30', borderWidth: 2, borderColor: '#1a0d04' }}>
                <Star size={12} color="white" fill="white" />
              </View>
            </View>
            <Text className="text-white text-xl font-bold mt-3">{user?.name || 'Потребител'}</Text>
            <Text className="text-white/40 text-sm">Домашен Готвач · {user?.location || 'България'}</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="px-5 -mt-4 mb-6">
          <GlassView className="flex-row justify-around p-4 rounded-3xl">
            <StatItem value={myRecipes.length} label="Рецепти" />
            <View className="w-px bg-white/10" />
            <StatItem value="0" label="Последователи" />
            <View className="w-px bg-white/10" />
            <StatItem value="0" label="Харесвания" />
          </GlassView>
        </View>

        {/* My Recipes */}
        {myRecipes.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between px-5 mb-3">
              <Text className="text-white font-semibold text-base">Моите Рецепти</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
                <Text className="text-accent text-xs font-medium">Виж всички</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
              {myRecipes.map((r) => (
                <TouchableOpacity key={r.id} onPress={() => router.push(`/recipe/${r.id}`)} className="mr-3 w-36">
                  <Image source={{ uri: r.image }} className="w-full h-24 rounded-2xl mb-2" resizeMode="cover" />
                  <Text className="text-white text-xs font-semibold leading-snug" numberOfLines={1}>{r.title}</Text>
                  <Text className="text-white/40 text-xs">{r.time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Saved Recipes */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-5 mb-3">
            <Text className="text-white font-semibold text-base">Запазени Рецепти</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
              <Text className="text-accent text-xs font-medium">Виж всички</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
            {savedPreview.map((r) => (
              <TouchableOpacity key={r.id} onPress={() => router.push(`/recipe/${r.id}`)} className="mr-3 w-36">
                <Image source={{ uri: r.image }} className="w-full h-24 rounded-2xl mb-2" resizeMode="cover" />
                <Text className="text-white text-xs font-semibold leading-snug" numberOfLines={1}>{r.title}</Text>
                <Text className="text-white/40 text-xs">{r.time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu */}
        <View className="px-5 gap-2">
          {menuItems.map(({ icon: Icon, label, action }) => (
            <TouchableOpacity key={label} onPress={action}>
              <GlassView className="flex-row items-center gap-4 px-4 py-4 rounded-2xl">
                <Icon size={18} color="#E07B30" />
                <Text className="text-white text-sm font-medium flex-1">{label}</Text>
                <ChevronRight size={16} color="rgba(255,255,255,0.3)" />
              </GlassView>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleLogout} className="mt-2">
            <GlassView className="flex-row items-center gap-4 px-4 py-4 rounded-2xl">
              <LogOut size={18} color="#f87171" />
              <Text className="text-red-400 text-sm font-medium flex-1">Изход</Text>
            </GlassView>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function StatItem({ value, label }) {
  return (
    <View className="items-center gap-0.5">
      <Text className="text-white font-bold text-lg">{value}</Text>
      <Text className="text-white/40 text-xs">{label}</Text>
    </View>
  );
}
