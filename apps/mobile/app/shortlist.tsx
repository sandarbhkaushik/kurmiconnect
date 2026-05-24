import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronDown, Heart } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Badge from '@/components/ui/Badge';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

const items = [
  { name: 'Priya Patel', age: 26, city: 'Lucknow', when: '2 days ago', hue: 20, match: 92 },
  { name: 'Anjali Sachan', age: 25, city: 'Kanpur', when: '5 days ago', hue: 60, match: 88 },
  { name: 'Pooja Verma', age: 27, city: 'Patna', when: '1 week ago', hue: 320, match: 85 },
  { name: 'Neha Katiyar', age: 24, city: 'Allahabad', when: '2 weeks ago', hue: 180, match: 84 },
];

export default function Shortlist() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Shortlist"
        subtitle="12 profiles shortlisted"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />

      {/* Sort bar */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: t.bg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>Sort: Recent</Text>
          <ChevronDown size={11} color={t.textMuted} strokeWidth={1.6} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20, gap: 10 }}>
        {items.map((it, i) => (
          <View key={i} style={{ padding: 12, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <PhotoPlaceholder name={it.name} height={56} width={56} radius={10} hue={it.hue} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{it.name}</Text>
                  <Badge kind="match">{it.match}%</Badge>
                </View>
                <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{it.age} · {it.city}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint, marginTop: 1 }}>Saved {it.when}</Text>
              </View>
              <Heart size={20} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1 }}>
                <KCButton variant="secondary" size="sm" full onPress={() => {}}>Share with family</KCButton>
              </View>
              <View style={{ flex: 1 }}>
                <KCButton variant="primary" size="sm" full onPress={() => router.push('/profile/send-interest')}>Send interest</KCButton>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
