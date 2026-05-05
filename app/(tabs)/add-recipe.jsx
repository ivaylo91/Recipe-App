import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useRecipes } from '../../context/RecipesContext';
import GlassView from '../../components/GlassView';

const CATEGORIES  = ['Закуска', 'Обяд', 'Вечеря', 'Десерт', 'Напитки', 'Закуски'];
const DIFFICULTIES = ['Лесно', 'Средно', 'Трудно'];

export default function AddRecipe() {
  const router = useRouter();
  const { user } = useAuth();
  const { addRecipe } = useRecipes();

  const [form, setForm] = useState({ title: '', category: 'Обяд', time: '', calories: '', difficulty: 'Лесно', image: '', description: '' });
  const [ingredients, setIngredients] = useState(['', '']);
  const [steps, setSteps]             = useState(['', '']);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState(false);
  const [loading, setLoading]         = useState(false);

  const updateList = (set, i, v) => set((p) => p.map((x, j) => j === i ? v : x));
  const addItem    = (set) => set((p) => [...p, '']);
  const removeItem = (set, i) => set((p) => p.filter((_, j) => j !== i));

  const handleSubmit = async () => {
    setError('');
    if (!form.title.trim())       return setError('Добави заглавие на рецептата.');
    if (!form.time.trim())        return setError('Добави времето за приготвяне.');
    if (!form.calories)           return setError('Добави калориите.');
    if (!form.description.trim()) return setError('Добави описание.');
    if (!form.image.trim())       return setError('Добави URL на снимка.');
    const cleanIng   = ingredients.filter((i) => i.trim());
    const cleanSteps = steps.filter((s) => s.trim());
    if (!cleanIng.length)   return setError('Добави поне една съставка.');
    if (!cleanSteps.length) return setError('Добави поне една стъпка.');
    setLoading(true);
    try {
      const id = await addRecipe({ ...form, calories: Number(form.calories), ingredients: cleanIng, steps: cleanSteps }, user);
      setSuccess(true);
      setTimeout(() => router.push(`/recipe/${id}`), 1400);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View className="flex-1 items-center justify-center bg-brown-950 gap-4 px-6">
        <View className="w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' }}>
          <CheckCircle size={32} color="#4ade80" />
        </View>
        <Text className="text-white text-xl font-bold">Рецептата е добавена!</Text>
        <Text className="text-white/40 text-sm">Пренасочване...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brown-950">
      <SafeAreaView edges={['top']} className="bg-brown-950">
        <View className="px-5 pt-2 pb-4 flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={18} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Нова Рецепта</Text>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        {!!error && (
          <View className="flex-row items-center gap-2 rounded-2xl px-4 py-3 mb-4" style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)' }}>
            <AlertCircle size={16} color="#f87171" />
            <Text className="text-red-400 text-sm flex-1">{error}</Text>
          </View>
        )}

        {!!form.image && (
          <View className="rounded-3xl overflow-hidden h-48 mb-4">
            <Image source={{ uri: form.image }} className="w-full h-full" resizeMode="cover" />
          </View>
        )}

        <Section title="Снимка">
          <GlassView className="flex-row items-center gap-3 px-4 py-3 rounded-xl">
            <ImageIcon size={18} color="rgba(255,255,255,0.3)" />
            <TextInput value={form.image} onChangeText={(v) => setForm((f) => ({ ...f, image: v }))}
              placeholder="https://... (URL на снимка)" placeholderTextColor="rgba(255,255,255,0.2)"
              autoCapitalize="none" className="flex-1 text-white text-sm" />
          </GlassView>
        </Section>

        <Section title="Основна информация">
          <GlassView className="px-4 py-3 rounded-xl mb-2">
            <TextInput value={form.title} onChangeText={(v) => setForm((f) => ({ ...f, title: v }))}
              placeholder="Заглавие на рецептата" placeholderTextColor="rgba(255,255,255,0.2)"
              className="text-white text-sm" />
          </GlassView>
          <GlassView className="px-4 py-3 rounded-2xl">
            <TextInput value={form.description} onChangeText={(v) => setForm((f) => ({ ...f, description: v }))}
              placeholder="Кратко описание..." placeholderTextColor="rgba(255,255,255,0.2)"
              multiline numberOfLines={3} textAlignVertical="top"
              className="text-white text-sm" style={{ minHeight: 72 }} />
          </GlassView>
        </Section>

        <Section title="Детайли">
          <View className="flex-row gap-3 mb-3">
            <SelectField label="Категория" value={form.category} options={CATEGORIES}
              onSelect={(v) => setForm((f) => ({ ...f, category: v }))} />
            <SelectField label="Трудност" value={form.difficulty} options={DIFFICULTIES}
              onSelect={(v) => setForm((f) => ({ ...f, difficulty: v }))} />
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1 gap-1.5">
              <Text className="text-white/40 text-xs pl-1">Време</Text>
              <GlassView className="px-3 py-2.5 rounded-xl">
                <TextInput value={form.time} onChangeText={(v) => setForm((f) => ({ ...f, time: v }))}
                  placeholder="30 мин" placeholderTextColor="rgba(255,255,255,0.2)"
                  className="text-white text-sm" />
              </GlassView>
            </View>
            <View className="flex-1 gap-1.5">
              <Text className="text-white/40 text-xs pl-1">Калории</Text>
              <GlassView className="px-3 py-2.5 rounded-xl">
                <TextInput value={form.calories} onChangeText={(v) => setForm((f) => ({ ...f, calories: v }))}
                  placeholder="400" placeholderTextColor="rgba(255,255,255,0.2)"
                  keyboardType="numeric" className="text-white text-sm" />
              </GlassView>
            </View>
          </View>
        </Section>

        <Section title="Съставки">
          {ingredients.map((ing, i) => (
            <View key={i} className="flex-row items-center gap-2 mb-2">
              <View className="w-6 h-6 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(224,123,48,0.2)', borderWidth: 1, borderColor: 'rgba(224,123,48,0.3)' }}>
                <Text className="text-accent text-xs">{i + 1}</Text>
              </View>
              <GlassView className="flex-1 px-3 py-2.5 rounded-xl">
                <TextInput value={ing} onChangeText={(v) => updateList(setIngredients, i, v)}
                  placeholder={`Съставка ${i + 1}`} placeholderTextColor="rgba(255,255,255,0.2)"
                  className="text-white text-sm" />
              </GlassView>
              {ingredients.length > 1 && (
                <TouchableOpacity onPress={() => removeItem(setIngredients, i)} className="w-8 h-8 rounded-xl items-center justify-center"
                  style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' }}>
                  <Trash2 size={14} color="#f87171" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={() => addItem(setIngredients)} className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl self-start"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Plus size={16} color="#E07B30" />
            <Text className="text-accent text-sm font-medium">Добави съставка</Text>
          </TouchableOpacity>
        </Section>

        <Section title="Стъпки">
          {steps.map((step, i) => (
            <View key={i} className="flex-row gap-3 mb-3">
              <Text className="text-accent font-bold text-base pt-2.5 w-6 text-center">
                {String(i + 1).padStart(2, '0')}
              </Text>
              <GlassView className="flex-1 p-3 rounded-2xl flex-row gap-2">
                <TextInput value={step} onChangeText={(v) => updateList(setSteps, i, v)}
                  placeholder={`Стъпка ${i + 1}...`} placeholderTextColor="rgba(255,255,255,0.2)"
                  multiline numberOfLines={2} textAlignVertical="top"
                  className="flex-1 text-white text-sm" />
                {steps.length > 1 && (
                  <TouchableOpacity onPress={() => removeItem(setSteps, i)} className="w-7 h-7 rounded-lg items-center justify-center self-start"
                    style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' }}>
                    <Trash2 size={12} color="#f87171" />
                  </TouchableOpacity>
                )}
              </GlassView>
            </View>
          ))}
          <TouchableOpacity onPress={() => addItem(setSteps)} className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl self-start"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
            <Plus size={16} color="#E07B30" />
            <Text className="text-accent text-sm font-medium">Добави стъпка</Text>
          </TouchableOpacity>
        </Section>

        <TouchableOpacity onPress={handleSubmit} disabled={loading}
          className="w-full py-4 rounded-2xl items-center mt-2"
          style={{ backgroundColor: '#E07B30', opacity: loading ? 0.6 : 1 }}>
          <Text className="text-white font-semibold text-base">{loading ? 'Запазване...' : 'Публикувай Рецептата'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View className="mb-6">
      <Text className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">{title}</Text>
      {children}
    </View>
  );
}

function SelectField({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <View className="flex-1 gap-1.5">
      <Text className="text-white/40 text-xs pl-1">{label}</Text>
      <TouchableOpacity onPress={() => setOpen((o) => !o)}>
        <GlassView className="px-3 py-2.5 rounded-xl">
          <Text className="text-white text-sm">{value}</Text>
        </GlassView>
      </TouchableOpacity>
      {open && (
        <View className="absolute top-14 left-0 right-0 z-50 rounded-xl overflow-hidden" style={{ backgroundColor: '#2a1508', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          {options.map((o) => (
            <TouchableOpacity key={o} onPress={() => { onSelect(o); setOpen(false); }} className="px-3 py-2.5">
              <Text className="text-white text-sm">{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
