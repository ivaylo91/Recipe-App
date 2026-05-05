import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Flame } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRecipes } from '../context/RecipesContext';
import GlassView from '../components/GlassView';

const mealGradients = {
  'Закуска': ['#431a04', '#2a1508'],
  'Обяд':    ['#3d2204', '#2a1508'],
  'Вечеря':  ['#2a1508', '#1a0d04'],
};

export default function DailyMenu() {
  const router = useRouter();
  const { dailyMenu, recipes } = useRecipes();
  const totalCalories = dailyMenu.reduce((s, m) => s + m.calories, 0);

  return (
    <View className="flex-1 bg-brown-950">
      <SafeAreaView edges={['top']} className="bg-brown-950">
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center gap-4 mb-5">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <ArrowLeft size={18} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Меню за деня</Text>
          </View>

          <GlassView className="flex-row items-center justify-between p-5 rounded-3xl">
            <View>
              <Text className="text-white/40 text-xs mb-1">Общо Калории Днес</Text>
              <Text className="text-white text-3xl font-bold">
                {totalCalories}
                <Text className="text-white/40 text-sm font-normal"> ккал</Text>
              </Text>
            </View>
            <View className="w-16 h-16 rounded-2xl items-center justify-center" style={{ backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
              <Flame size={24} color="#E07B30" />
              <Text className="text-accent text-xs font-medium mt-0.5">Цел</Text>
            </View>
          </GlassView>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        <View className="gap-4 mb-8">
          {dailyMenu.map((meal) => {
            const recipe = recipes.find((r) => r.title === meal.name);
            return (
              <TouchableOpacity key={meal.id} onPress={() => recipe && router.push(`/recipe/${recipe.id}`)}>
                <View className="rounded-3xl overflow-hidden" style={{ backgroundColor: mealGradients[meal.meal]?.[0] || '#2a1508' }}>
                  <View className="flex-row gap-4 p-4">
                    {recipe && (
                      <Image source={{ uri: recipe.image }} className="w-24 h-24 rounded-2xl" resizeMode="cover" />
                    )}
                    <View className="flex-1 justify-center gap-1.5">
                      <Text className="text-accent text-xs font-semibold uppercase tracking-widest">{meal.meal}</Text>
                      <Text className="text-white text-base font-bold leading-snug" numberOfLines={2}>{meal.name}</Text>
                      <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center gap-1">
                          <Clock size={11} color="rgba(255,255,255,0.5)" />
                          <Text className="text-white/50 text-xs">{meal.time}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Flame size={11} color="rgba(255,255,255,0.5)" />
                          <Text className="text-white/50 text-xs">{meal.calories} ккал</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Suggestion */}
        <Text className="text-white font-semibold text-base mb-4">Добави Закуска?</Text>
        <GlassView className="flex-row items-center gap-4 p-4 rounded-2xl">
          <Image source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=120&q=80' }} className="w-14 h-14 rounded-xl" resizeMode="cover" />
          <View className="flex-1">
            <Text className="text-white text-sm font-semibold">Пудинг с Горски Плодове и Чиа</Text>
            <Text className="text-white/40 text-xs mt-0.5">220 ккал · 5 мин</Text>
          </View>
          <TouchableOpacity className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: '#E07B30' }}>
            <Text className="text-white text-xs font-semibold">Добави</Text>
          </TouchableOpacity>
        </GlassView>
      </ScrollView>
    </View>
  );
}
