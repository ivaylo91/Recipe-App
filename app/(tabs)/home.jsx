import { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, Clock, Flame, Star, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useRecipes } from '../../context/RecipesContext';
import GlassView from '../../components/GlassView';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const { recipes, categories } = useRecipes();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Всички');

  const allCategories = ['Всички', ...categories.map((c) => c.name ?? c)];
  const filtered = recipes.filter((r) => {
    const matchCat = activeCategory === 'Всички' || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const featured = recipes.filter((r) => r.featured).slice(0, 5);

  return (
    <View className="flex-1 bg-brown-950">
      <SafeAreaView edges={['top']} className="bg-brown-950">
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center justify-between mb-5">
            <View>
              <Text className="text-white/40 text-sm">Добро утро,</Text>
              <Text className="text-white text-xl font-bold">{user?.name?.split(' ')[0] || 'Готвач'} 👨‍🍳</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <Bell size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>

          <GlassView className="flex-row items-center px-4 py-3 rounded-2xl">
            <Search size={18} color="rgba(255,255,255,0.3)" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Търси рецепти..."
              placeholderTextColor="rgba(255,255,255,0.2)"
              className="flex-1 text-white text-sm ml-3"
            />
          </GlassView>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Daily Menu Banner */}
        <TouchableOpacity onPress={() => router.push('/daily-menu')} className="mx-5 mb-5">
          <View className="rounded-3xl overflow-hidden h-32">
            <Image source={{ uri: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80' }} className="absolute inset-0 w-full h-full" resizeMode="cover" />
            <View className="absolute inset-0" style={{ backgroundColor: 'rgba(26,13,4,0.55)' }} />
            <View className="flex-1 p-4 justify-between">
              <Text className="text-accent text-xs font-semibold uppercase tracking-widest">Днес</Text>
              <View>
                <Text className="text-white text-lg font-bold">Меню за деня</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Text className="text-white/60 text-xs">Виж препоръките</Text>
                  <ChevronRight size={12} color="rgba(255,255,255,0.6)" />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5 pl-5">
          {allCategories.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => setActiveCategory(cat)} className="mr-2">
              <View className="px-4 py-2 rounded-2xl" style={{
                backgroundColor: activeCategory === cat ? '#E07B30' : 'rgba(255,255,255,0.05)',
                borderWidth: 1,
                borderColor: activeCategory === cat ? '#E07B30' : 'rgba(255,255,255,0.1)',
              }}>
                <Text className="text-sm font-medium" style={{ color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.5)' }}>{cat}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View className="w-5" />
        </ScrollView>

        {/* Featured */}
        {featured.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between px-5 mb-3">
              <Text className="text-white font-semibold text-base">Препоръчани</Text>
              <Text className="text-accent text-xs font-medium">Виж всички</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5">
              {featured.map((r) => (
                <TouchableOpacity key={r.id} onPress={() => router.push(`/recipe/${r.id}`)} className="mr-3 w-48">
                  <Image source={{ uri: r.image }} className="w-full h-32 rounded-2xl mb-2" resizeMode="cover" />
                  <Text className="text-white text-xs font-semibold leading-snug" numberOfLines={1}>{r.title}</Text>
                  <View className="flex-row items-center gap-2 mt-1">
                    <View className="flex-row items-center gap-1">
                      <Clock size={10} color="rgba(255,255,255,0.4)" />
                      <Text className="text-white/40 text-xs">{r.time}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Star size={10} color="#E07B30" fill="#E07B30" />
                      <Text className="text-white/40 text-xs">{r.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              <View className="w-5" />
            </ScrollView>
          </View>
        )}

        {/* Recipe List */}
        <View className="px-5 pb-28">
          <Text className="text-white font-semibold text-base mb-3">
            {activeCategory === 'Всички' ? 'Всички Рецепти' : activeCategory}
          </Text>
          {filtered.map((r) => (
            <TouchableOpacity key={r.id} onPress={() => router.push(`/recipe/${r.id}`)} className="mb-3">
              <GlassView className="flex-row gap-3 p-3 rounded-2xl overflow-hidden">
                <Image source={{ uri: r.image }} className="w-20 h-20 rounded-xl" resizeMode="cover"
                  onError={(e) => e.target} />
                <View className="flex-1 justify-center gap-1">
                  <Text className="text-white text-sm font-semibold" numberOfLines={2}>{r.title}</Text>
                  <Text className="text-white/40 text-xs">{r.chef}</Text>
                  <View className="flex-row items-center gap-3 mt-1">
                    <View className="flex-row items-center gap-1">
                      <Clock size={11} color="rgba(255,255,255,0.4)" />
                      <Text className="text-white/40 text-xs">{r.time}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Flame size={11} color="rgba(255,255,255,0.4)" />
                      <Text className="text-white/40 text-xs">{r.calories} ккал</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Star size={11} color="#E07B30" fill="#E07B30" />
                      <Text className="text-white/40 text-xs">{r.rating}</Text>
                    </View>
                  </View>
                </View>
              </GlassView>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
