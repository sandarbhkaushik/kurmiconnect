import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Edit2, Trash2, X, Settings } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';

const quickChips = ['मेरी पसंद', 'Recently viewed', 'Featured', 'Online now', 'New today'];

const savedSearches = [
  { title: 'Lucknow doctors', count: 47, sub: 'Female · 25-30 · Patel/Sachan' },
  { title: 'Patna IAS', count: 12, sub: 'Female · UP/Bihar' },
];

const recentSearches = ['Doctor in Lucknow', 'Patel · UP · 25-28'];

export default function SearchEntry() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <BiLabel hi="खोजें" en="Search" size="xl" />

          {/* Search bar */}
          <Pressable onPress={() => router.push('/search/results')} style={{ marginTop: 16, height: 48, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10 }}>
            <Search size={16} color={t.textFaint} strokeWidth={1.6} />
            <Text style={{ flex: 1, fontFamily: 'Mukta', fontSize: 13, color: t.textFaint }}>नाम, location, profession...</Text>
          </Pressable>
        </View>

        {/* Quick chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: 20, paddingTop: 14 }}>
          {quickChips.map((c, i) => (
            <Pressable key={i} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: i === 0 ? t.primary : t.surface, borderWidth: 1, borderColor: i === 0 ? t.primary : t.border }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: i === 0 ? '#FFF' : t.text }}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={{ padding: 20 }}>
          {/* Saved searches */}
          <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.textMuted, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>Saved searches</Text>
          {savedSearches.map((s, i) => (
            <Pressable key={i} onPress={() => router.push('/search/results')} style={{ padding: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                <Search size={16} color={t.primary} strokeWidth={1.6} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{s.title}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: t.textFaint }}>{s.sub} · {s.count} results</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Edit2 size={14} color={t.textMuted} strokeWidth={1.6} />
                <Trash2 size={14} color={t.textMuted} strokeWidth={1.6} />
              </View>
            </Pressable>
          ))}

          {/* Recent */}
          <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.textMuted, marginTop: 16, marginBottom: 10, letterSpacing: 0.8, textTransform: 'uppercase' }}>Recent</Text>
          {recentSearches.map((s, i) => (
            <Pressable key={i} onPress={() => router.push('/search/results')} style={{ paddingVertical: 10, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Search size={14} color={t.textFaint} strokeWidth={1.6} />
              <Text style={{ flex: 1, fontFamily: 'Mukta', fontSize: 13, color: t.text }}>{s}</Text>
              <X size={12} color={t.textFaint} strokeWidth={1.6} />
            </Pressable>
          ))}

          {/* Advanced filters */}
          <Pressable onPress={() => router.push('/search/filters')} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: t.border, backgroundColor: t.surface }}>
            <Settings size={14} color={t.text} strokeWidth={1.6} />
            <Text style={{ fontFamily: 'Mukta', fontSize: 14, color: t.text }}>Advanced filters</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
