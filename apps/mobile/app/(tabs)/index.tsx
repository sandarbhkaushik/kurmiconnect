import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, Star } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Badge from '@/components/ui/Badge';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import MatchCard from '@/components/layout/MatchCard';
import ProgressBar from '@/components/ui/ProgressBar';

const matches = [
  { name: 'Priya', age: 26, height: "5'4\"", caste: 'Patel', city: 'Lucknow', match: 92, hue: 20, verified: true },
  { name: 'Anjali', age: 25, height: "5'3\"", caste: 'Sachan', city: 'Kanpur', match: 88, hue: 60 },
  { name: 'Pooja', age: 27, height: "5'5\"", caste: 'Verma', city: 'Patna', match: 85, hue: 320, verified: true, featured: true },
  { name: 'Neha', age: 24, height: "5'2\"", caste: 'Katiyar', city: 'Allahabad', match: 84, hue: 180 },
];

const featured = [
  { name: 'Aarti', tag: 'IAS 2022', hue: 30 },
  { name: 'Dr. Ritu', tag: 'AIIMS', hue: 80 },
  { name: 'Vikram', tag: 'IIT-D', hue: 200 },
  { name: 'Sneha', tag: 'CA', hue: 280 },
];

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Top bar */}
        <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12, backgroundColor: t.surface, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 11, color: t.textFaint }}>Namaste 🙏</Text>
            <Text style={{ fontFamily: 'Mukta', fontSize: 18, fontWeight: '500', color: t.text }}>Rajesh ji</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Pressable onPress={() => router.push('/search')} style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} color={t.text} strokeWidth={1.6} />
            </Pressable>
            <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} color={t.text} strokeWidth={1.6} />
              <View style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: 3.5, backgroundColor: t.primary }} />
            </View>
          </View>
        </View>

        {/* Upgrade strip */}
        <View style={{ marginHorizontal: 20, marginTop: 12, marginBottom: 12, padding: 12, paddingHorizontal: 14, backgroundColor: t.primaryDeep, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontFamily: 'Mukta', fontSize: 13, fontWeight: '500', color: '#FFF' }}>3× more replies with Gold</Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: '#FFF', opacity: 0.7 }}>₹1,499 · 6 months</Text>
          </View>
          <Pressable style={{ paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#FFF', borderRadius: 8 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 11, fontWeight: '500', color: t.primaryDeep }}>Upgrade</Text>
          </Pressable>
        </View>

        {/* Profile completion */}
        <View style={{ marginHorizontal: 20, marginBottom: 16, padding: 12, paddingHorizontal: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Profile 70% complete</Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.primary }}>Complete →</Text>
          </View>
          <ProgressBar value={70} height={3} />
        </View>

        {/* Featured carousel */}
        <View style={{ paddingBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 20 }}>
            <BiLabel hi="विशेष व्यक्तित्व" en="Featured Personalities" size="md" />
            <Pressable onPress={() => router.push('/featured')}>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.primary }}>See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}>
            {featured.map((f, i) => (
              <View key={i} style={{ width: 110 }}>
                <View>
                  <PhotoPlaceholder name={f.name} height={130} width={110} radius={10} hue={f.hue} />
                  <View style={{ position: 'absolute', top: 6, left: 6 }}>
                    <Badge kind="featured">
                      <Star size={9} color="#FFF" fill="#FFF" strokeWidth={1.6} /> Featured
                    </Badge>
                  </View>
                </View>
                <Text style={{ marginTop: 8, fontFamily: 'Mukta', fontSize: 12, fontWeight: '500', color: t.text }}>{f.name}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.primary }}>{f.tag}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Today's matches */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <View style={{ marginBottom: 12 }}>
            <BiLabel hi="आज के मैच" en="12 new for your search" size="md" />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {matches.map((m, i) => (
              <View key={i} style={{ width: '47%' }}>
                <MatchCard
                  name={m.name}
                  age={m.age}
                  height={m.height}
                  caste={m.caste}
                  city={m.city}
                  match={m.match}
                  hue={m.hue}
                  verified={m.verified}
                  compact
                />
              </View>
            ))}
          </View>
          <Pressable style={{ marginTop: 16, alignItems: 'center', paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 14, color: t.text }}>और देखें · Load more</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
