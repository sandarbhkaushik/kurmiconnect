import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { X, ChevronRight, ChevronDown } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

const sections = [
  { title: 'Age range', value: '22 – 28 yrs', open: true },
  { title: 'Height range', value: "5'2\" – 5'8\"" },
  { title: 'Sub-caste', value: '7 selected' },
  { title: 'Gotra', value: 'Exclude same' },
  { title: 'Location', value: 'UP, Bihar, MP' },
  { title: 'Education', value: 'Graduate +' },
  { title: 'Profession', value: '5 selected' },
  { title: 'Income', value: '5L +' },
  { title: 'Diet', value: 'Veg, Egg' },
  { title: 'Manglik', value: "Doesn't matter" },
  { title: 'Family type', value: 'Joint, Nuclear' },
];

const activeChips = ['Patel', 'UP', '22-28', 'Veg'];

const toggles = [
  { hi: 'Photo हो', en: 'Must have photo', on: true },
  { hi: 'Verified', en: 'Only verified profiles', on: true },
  { hi: 'Featured', en: 'Featured only', on: false },
  { hi: 'Active recently', en: 'Last 7 days', on: false },
];

export default function Filters() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Filters"
        leading={
          <Pressable onPress={() => router.back()}>
            <X size={18} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
        trailing={
          <Pressable>
            <Text style={{ fontFamily: 'Inter', fontSize: 12, color: t.primary }}>Reset</Text>
          </Pressable>
        }
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Active chips */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: t.borderSoft, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {activeChips.map((c, i) => (
            <View key={i} style={{ paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 8, borderRadius: 999, backgroundColor: t.primarySoft, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.primaryDeep }}>{c}</Text>
              <X size={9} color={t.primaryDeep} strokeWidth={1.6} />
            </View>
          ))}
        </View>

        {/* Sections */}
        <View style={{ paddingHorizontal: 20 }}>
          {sections.map((s, i) => (
            <Pressable key={i} style={{ borderBottomWidth: 1, borderBottomColor: t.borderSoft, paddingVertical: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontFamily: 'Mukta', fontSize: 14, color: t.text, fontWeight: '500' }}>{s.title}</Text>
                  <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{s.value}</Text>
                </View>
                {s.open
                  ? <ChevronDown size={14} color={t.textMuted} strokeWidth={1.6} />
                  : <ChevronRight size={14} color={t.textMuted} strokeWidth={1.6} />
                }
              </View>
              {s.open && (
                <View style={{ marginTop: 14, height: 24 }}>
                  {/* Slider track */}
                  <View style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 3, backgroundColor: t.borderSoft, borderRadius: 999 }} />
                  <View style={{ position: 'absolute', top: 11, left: '20%', width: '40%', height: 3, backgroundColor: t.primary, borderRadius: 999 }} />
                  {/* Thumb left */}
                  <View style={{ position: 'absolute', top: 4, left: '18%', width: 16, height: 16, borderRadius: 8, backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary }} />
                  {/* Thumb right */}
                  <View style={{ position: 'absolute', top: 4, left: '58%', width: 16, height: 16, borderRadius: 8, backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary }} />
                </View>
              )}
            </Pressable>
          ))}

          {/* Toggles */}
          {toggles.map((s, i) => (
            <View key={i} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: t.borderSoft, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <BiLabel hi={s.hi} en={s.en} size="sm" />
              <View style={{ width: 40, height: 24, borderRadius: 12, backgroundColor: s.on ? t.primary : t.borderSoft, justifyContent: 'center' }}>
                <View style={{ position: 'absolute', top: 2, left: s.on ? undefined : 2, right: s.on ? 2 : undefined, width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' }} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Apply button */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 24, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface }}>
        <KCButton variant="primary" size="lg" full onPress={() => { router.push('/search/results'); }}>Apply (1,245 results)</KCButton>
      </View>
    </SafeAreaView>
  );
}
