import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronDown, Settings } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import MatchCard from '@/components/layout/MatchCard';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

const matches = [
  { name: 'Priya Patel', age: 26, height: "5'4\"", caste: 'Patel', city: 'Lucknow', match: 92, hue: 20, verified: true, online: true },
  { name: 'Anjali Sachan', age: 25, height: "5'3\"", caste: 'Sachan', city: 'Kanpur', match: 88, hue: 60 },
  { name: 'Pooja Verma', age: 27, height: "5'5\"", caste: 'Verma', city: 'Patna', match: 85, hue: 320, verified: true, featured: true },
  { name: 'Neha Katiyar', age: 24, height: "5'2\"", caste: 'Katiyar', city: 'Allahabad', match: 84, hue: 180 },
  { name: 'Kavita Singh', age: 26, height: "5'4\"", caste: 'Singh', city: 'Delhi', match: 82, hue: 100, verified: true },
];

export default function SearchResults() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="1,245 results"
        subtitle="Patel · UP/Bihar · 22-28"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
        trailing={
          <Pressable onPress={() => router.push('/search/filters')}>
            <Settings size={18} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />

      {/* Sort + view toggle */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: t.bg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>Sort: Match %</Text>
          <ChevronDown size={11} color={t.textMuted} strokeWidth={1.6} />
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, backgroundColor: t.text }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: '500', color: '#FFF' }}>List</Text>
          </View>
          <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, backgroundColor: 'transparent' }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textMuted }}>Grid</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20, gap: 10 }}>
        {matches.map((m, i) => (
          <Pressable key={i} onPress={() => router.push('/profile/1')}>
            <MatchCard
              name={m.name}
              age={m.age}
              height={m.height}
              caste={m.caste}
              city={m.city}
              match={m.match}
              hue={m.hue}
              verified={m.verified}
              online={m.online}
              featured={m.featured}
            />
          </Pressable>
        ))}
        <KCButton variant="ghost" size="md" full onPress={() => {}}>Save this search</KCButton>
      </ScrollView>
    </SafeAreaView>
  );
}
