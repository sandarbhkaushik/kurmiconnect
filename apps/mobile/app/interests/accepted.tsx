import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Avatar from '@/components/ui/Avatar';
import KCButton from '@/components/ui/KCButton';

const items = [
  { name: 'Anjali Sachan', age: 25, city: 'Kanpur', when: 'Today', activity: 'Active now', hue: 60 },
  { name: 'Ritu Mahato', age: 26, city: 'Ranchi', when: 'Yesterday', activity: '2h ago', hue: 280 },
];

const tabs = [
  { label: 'Sent', count: 12, sel: false },
  { label: 'Received', count: 8, sel: false },
  { label: 'Accepted', count: 3, sel: true },
];

export default function Accepted() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 0, backgroundColor: t.surface }}>
        <BiLabel hi="रुचि" en="Interests" size="lg" />
        <View style={{ flexDirection: 'row', marginTop: 14, borderBottomWidth: 1, borderBottomColor: t.borderSoft }}>
          {tabs.map((tb, i) => (
            <Pressable key={i} onPress={() => { if (!tb.sel) router.back(); }} style={{ paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: tb.sel ? 2 : 0, borderBottomColor: t.primary, marginBottom: -1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 13, color: tb.sel ? t.primary : t.textMuted, fontWeight: tb.sel ? '500' : '400' }}>{tb.label}</Text>
              <View style={{ paddingVertical: 1, paddingHorizontal: 5, backgroundColor: tb.sel ? t.primarySoft : t.borderSoft, borderRadius: 999 }}>
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: tb.sel ? t.primary : t.textMuted }}>{tb.count}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20, gap: 10 }}>
        {items.map((it, i) => (
          <View key={i} style={{ padding: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar name={it.name} size={52} hue={it.hue} online />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{it.name}</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.success, marginTop: 2 }}>Match accepted</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: t.textFaint, marginTop: 1 }}>{it.activity}</Text>
            </View>
            <KCButton variant="primary" size="sm" onPress={() => router.push('/chat/1')}>Chat</KCButton>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
