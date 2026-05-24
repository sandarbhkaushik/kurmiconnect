import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

type CatItem = [string, string, number];
type Cat = { title: string; hi: string; items: CatItem[] };

const cats: Cat[] = [
  {
    title: 'Visibility',
    hi: 'दर्शनीयता',
    items: [
      ['24h Boost', 'Top of search for 24h', 99],
      ['72h Boost', 'Top of search for 3 days', 249],
      ['Week Boost', 'Featured for 7 days', 499],
    ],
  },
  {
    title: 'Kundli',
    hi: 'कुंडली',
    items: [
      ['Basic Kundli', 'Computer generated', 199],
      ['Astrologer Reviewed', 'Reviewed by certified', 599],
      ['Full natal chart', 'Detailed analysis', 999],
    ],
  },
  {
    title: 'Biodata',
    hi: 'बायोडाटा',
    items: [
      ['PDF Biodata', 'Print-ready', 199],
      ['Designer Biodata', 'Custom layout', 499],
    ],
  },
];

export default function AddOns() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Add-ons"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 18, paddingBottom: 0 }}>
          <BiLabel hi="अपनी profile को boost करें" en="Boost your profile" size="lg" />
        </View>

        {/* Active boost banner */}
        <View style={{ margin: 14, marginTop: 14, padding: 12, backgroundColor: t.primaryDeep, borderRadius: 10 }}>
          <Text style={{ fontSize: 12, color: '#FFF' }}>Active boost: 24h · 12h remaining</Text>
          <View style={{ marginTop: 6, height: 3, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, overflow: 'hidden' }}>
            <View style={{ width: '50%', height: '100%', backgroundColor: '#FFF' }} />
          </View>
        </View>

        <View style={{ padding: 20 }}>
          {cats.map((c, i) => (
            <View key={i} style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <BiLabel hi={c.hi} en={c.title} size="sm" />
              </View>
              <View style={{ gap: 8 }}>
                {c.items.map(([n, d, p], j) => (
                  <View
                    key={j}
                    style={{
                      padding: 12,
                      backgroundColor: t.surface,
                      borderWidth: 1,
                      borderColor: t.borderSoft,
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <View style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={16} color={t.primary} strokeWidth={1.6} fill={t.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, color: t.text, fontWeight: '500' }}>{n}</Text>
                      <Text style={{ fontSize: 10, color: t.textFaint }}>{d}</Text>
                    </View>
                    <KCButton variant="soft" size="sm">₹{p}</KCButton>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
