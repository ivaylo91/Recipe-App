import { Tabs, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Plus, Users, User } from 'lucide-react-native';

function TabIcon({ icon: Icon, color, focused }) {
  return <Icon size={20} color={color} fill={focused ? color : 'none'} strokeWidth={focused ? 0 : 1.8} />;
}

function AddButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="items-center" style={{ top: -16 }}>
      <View className="w-14 h-14 rounded-2xl items-center justify-center" style={{ backgroundColor: '#E07B30', shadowColor: '#E07B30', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 8 }}>
        <Plus size={26} color="white" strokeWidth={2.5} />
      </View>
      <Text className="text-accent text-xs font-medium mt-1">Добави</Text>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(26,13,4,0.95)',
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#E07B30',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500', marginTop: 2 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Начало',
          tabBarIcon: ({ color, focused }) => <TabIcon icon={Home} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Търсене',
          tabBarIcon: ({ color, focused }) => <TabIcon icon={Search} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="add-recipe"
        options={{
          title: '',
          tabBarButton: () => <AddButton onPress={() => router.push('/(tabs)/add-recipe')} />,
        }}
      />
      <Tabs.Screen
        name="collaboration"
        options={{
          title: 'Общност',
          tabBarIcon: ({ color, focused }) => <TabIcon icon={Users} color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профил',
          tabBarIcon: ({ color, focused }) => <TabIcon icon={User} color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
