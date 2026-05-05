import { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2, Clock, Flame, Star, ChefHat } from 'lucide-react-native';
import { useRecipes } from '../../context/RecipesContext';
import GlassView from '../../components/GlassView';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const router  = useRouter();
  const { recipes } = useRecipes();
  const recipe  = recipes.find((r) => String(r.id) === String(id));
  const [liked, setLiked]   = useState(false);
  const [activeTab, setTab] = useState('ingredients');

  if (!recipe) {
    return (
      <View className="flex-1 bg-brown-950 items-center justify-center">
        <Text className="text-white/40">Рецептата не е намерена</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-accent">Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brown-950">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero */}
        <View className="h-72 relative">
          <Image source={{ uri: recipe.image }} className="w-full h-full" resizeMode="cover" />
          <View className="absolute inset-0" style={{ backgroundColor: 'rgba(26,13,4,0.3)' }} />

          {/* Top buttons */}
          <View className="absolute top-12 left-5 right-5 flex-row justify-between">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(26,13,4,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
              <ArrowLeft size={18} color="white" />
            </TouchableOpacity>
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={() => setLiked((l) => !l)} className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(26,13,4,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
                <Heart size={18} color={liked ? '#f87171' : 'white'} fill={liked ? '#f87171' : 'none'} />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(26,13,4,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
                <Share2 size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Difficulty badge */}
          <View className="absolute bottom-4 left-5">
            <View className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'rgba(224,123,48,0.3)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.4)' }}>
              <Text className="text-accent text-xs font-semibold">{recipe.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Info */}
        <View className="px-5 pt-5">
          <Text className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">{recipe.category}</Text>
          <Text className="text-white text-2xl font-bold mb-4">{recipe.title}</Text>

          {/* Stats */}
          <GlassView className="flex-row justify-around p-4 rounded-2xl mb-5">
            <StatBadge icon={Clock} value={recipe.time} label="Време" />
            <View className="w-px bg-white/10" />
            <StatBadge icon={Flame} value={`${recipe.calories}`} label="ккал" />
            <View className="w-px bg-white/10" />
            <StatBadge icon={Star} value={String(recipe.rating)} label="Рейтинг" accent />
          </GlassView>

          {/* Description */}
          {!!recipe.description && (
            <Text className="text-white/60 text-sm leading-relaxed mb-5">{recipe.description}</Text>
          )}

          {/* Chef */}
          <GlassView className="flex-row items-center gap-3 p-3 rounded-2xl mb-6">
            <Image source={{ uri: recipe.chefAvatar || 'https://i.pravatar.cc/48?img=20' }} className="w-11 h-11 rounded-full" style={{ borderWidth: 2, borderColor: 'rgba(224,123,48,0.3)' }} />
            <View className="flex-1">
              <Text className="text-white/40 text-xs">Рецепта от</Text>
              <Text className="text-white text-sm font-semibold">{recipe.chef}</Text>
            </View>
            <View className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
              <Text className="text-accent text-xs font-medium">Следвай</Text>
            </View>
          </GlassView>

          {/* Tabs */}
          <GlassView className="flex-row p-1 rounded-2xl mb-5">
            {['ingredients', 'steps'].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setTab(tab)} className="flex-1 py-2.5 rounded-xl items-center"
                style={{ backgroundColor: activeTab === tab ? '#E07B30' : 'transparent' }}>
                <Text className="text-sm font-semibold" style={{ color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.4)' }}>
                  {tab === 'ingredients' ? `Съставки (${recipe.ingredients.length})` : `Стъпки (${recipe.steps.length})`}
                </Text>
              </TouchableOpacity>
            ))}
          </GlassView>

          {/* Ingredients */}
          {activeTab === 'ingredients' && (
            <View className="gap-2 mb-6">
              {recipe.ingredients.map((ing, i) => (
                <GlassView key={i} className="flex-row items-center gap-3 px-4 py-3 rounded-xl">
                  <View className="w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
                    <Text className="text-accent text-xs font-bold">{i + 1}</Text>
                  </View>
                  <Text className="text-white/80 text-sm flex-1">{ing}</Text>
                </GlassView>
              ))}
            </View>
          )}

          {/* Steps */}
          {activeTab === 'steps' && (
            <View className="gap-4 mb-6">
              {recipe.steps.map((step, i) => (
                <View key={i} className="flex-row gap-3">
                  <Text className="text-accent font-bold text-base w-7 text-center pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <GlassView className="flex-1 p-4 rounded-2xl">
                    <Text className="text-white/80 text-sm leading-relaxed">{step}</Text>
                  </GlassView>
                </View>
              ))}
            </View>
          )}

          {/* CTA */}
          <TouchableOpacity className="w-full py-4 rounded-2xl items-center" style={{ backgroundColor: '#E07B30' }}>
            <Text className="text-white font-semibold text-base">Започни да Готвиш</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function StatBadge({ icon: Icon, value, label, accent }) {
  return (
    <View className="items-center gap-1">
      <Icon size={16} color={accent ? '#E07B30' : 'rgba(255,255,255,0.5)'} fill={accent ? '#E07B30' : 'none'} />
      <Text className="text-white font-bold text-sm">{value}</Text>
      <Text className="text-white/40 text-xs">{label}</Text>
    </View>
  );
}
