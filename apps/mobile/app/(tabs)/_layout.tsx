import { Tabs } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { defaultTheme as t } from '@/lib/theme';

const TAB_CONFIG = [
  { id: 'index',     en: 'Home',      Icon: Home },
  { id: 'search',    en: 'Search',    Icon: Search },
  { id: 'interests', en: 'Interests', Icon: Heart },
  { id: 'chats',     en: 'Chats',     Icon: MessageCircle },
  { id: 'profile',   en: 'Profile',   Icon: User },
] as const;

function KCTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={{
      height: 70,
      backgroundColor: t.surface,
      borderTopWidth: 1,
      borderTopColor: t.borderSoft,
      flexDirection: 'row',
      paddingBottom: 14,
      paddingTop: 6,
    }}>
      {TAB_CONFIG.map((tab, index) => {
        const isActive = state.index === index;
        const { Icon } = tab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => navigation.navigate(state.routes[index].name)}
            style={{ flex: 1, alignItems: 'center', gap: 2 }}
          >
            <Icon size={22} color={isActive ? t.primary : t.textFaint} strokeWidth={1.6} />
            <Text style={{ fontSize: 9.5, fontWeight: '500', color: isActive ? t.primary : t.textFaint, letterSpacing: 0.15 }}>
              {tab.en}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <KCTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="interests" />
      <Tabs.Screen name="chats" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
