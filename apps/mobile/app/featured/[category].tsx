import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, ChevronDown, Check, X } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Avatar from '@/components/ui/Avatar';
import TopBar from '@/components/layout/TopBar';

const filterChips = ['All genders', 'Age 25-30', 'Lucknow', 'Patna', 'Delhi'];

const people = [
  { name: 'Aarti Patel', tag: 'IAS · Joint Magistrate, Sitapur', age: 28, city: 'Lucknow', hue: 30 },
  { name: 'Manoj Kumar', tag: 'IPS · DCP, Patna', age: 30, city: 'Patna', hue: 200 },
  { name: 'Pooja Verma', tag: 'IRS 2021', age: 27, city: 'Delhi', hue: 320 },
  { name: 'Shashank S.', tag: 'PCS · DM Office', age: 29, city: 'Allahabad', hue: 100 },
  { name: 'Kavita Singh', tag: 'IAS 2020', age: 28, city: 'Kanpur', hue: 60 },
];

export default function FeaturedCategory() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Civil Services"
        subtitle="18 verified personalities"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: t.surface, borderBottomWidth: 1, borderBottomColor: t.borderSoft }} contentContainerStyle={{ gap: 6, paddingHorizontal: 20, paddingVertical: 12 }}>
        {filterChips.map((c, i) => (
          <View key={i} style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textMuted }}>{c}</Text>
            <X size={9} color={t.textFaint} strokeWidth={1.6} />
          </View>
        ))}
      </ScrollView>

      {/* Sort bar */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: t.bg }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>18 results</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.text }}>Sort: Most recent</Text>
          <ChevronDown size={11} color={t.text} strokeWidth={1.6} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20, gap: 10 }}>
        {people.map((p, i) => (
          <Pressable key={i} onPress={() => router.push(`/featured/${p.name}`)} style={{ flexDirection: 'row', gap: 12, padding: 12, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, alignItems: 'center' }}>
            <Avatar name={p.name} size={56} hue={p.hue} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{p.name}</Text>
                <Check size={12} color={t.info} strokeWidth={1.6} />
              </View>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.primary, marginTop: 2 }}>{p.tag}</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textMuted, marginTop: 4 }}>{p.age} · {p.city}</Text>
            </View>
            <ChevronRight size={16} color={t.textFaint} strokeWidth={1.6} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
