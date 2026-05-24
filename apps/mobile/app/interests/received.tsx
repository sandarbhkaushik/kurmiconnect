import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Avatar from '@/components/ui/Avatar';
import KCButton from '@/components/ui/KCButton';

const items = [
  { name: 'Rajiv Singh', age: 28, city: 'Delhi', when: '2 hours ago', hue: 200, msg: 'Namaste 🙏 Mujhe aapki profile bahut achchi lagi...' },
  { name: 'Manish Verma', age: 30, city: 'Patna', when: 'Yesterday', hue: 100 },
  { name: 'Ankit Patel', age: 27, city: 'Lucknow', when: '3 days ago', hue: 40 },
];

const tabs = [
  { label: 'Sent', count: 12, sel: false },
  { label: 'Received', count: 8, sel: true },
  { label: 'Accepted', count: 3, sel: false },
];

export default function InterestsReceived() {
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

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20, gap: 12 }}>
        {items.map((it, i) => (
          <View key={i} style={{ padding: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Avatar name={it.name} size={52} hue={it.hue} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{it.name}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>{it.age} · {it.city}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: t.textFaint, marginTop: 2 }}>Sent {it.when}</Text>
              </View>
            </View>
            {it.msg && (
              <View style={{ marginTop: 10, padding: 10, backgroundColor: t.surfaceWarm, borderRadius: 8 }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text, fontStyle: 'italic', lineHeight: 18 }}>"{it.msg}"</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <View style={{ flex: 1 }}>
                <KCButton variant="secondary" size="md" full onPress={() => {}}>Decline</KCButton>
              </View>
              <View style={{ flex: 1 }}>
                <KCButton variant="primary" size="md" full onPress={() => {}}>Accept</KCButton>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
