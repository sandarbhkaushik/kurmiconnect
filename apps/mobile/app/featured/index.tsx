import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Shield, Check, Star } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Badge from '@/components/ui/Badge';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

const cats = [
  { hi: 'सभी', en: 'All', count: 124, sel: true },
  { hi: 'सिविल सेवा', en: 'Civil Services', count: 18 },
  { hi: 'डॉक्टर', en: 'Doctors', count: 32 },
  { hi: 'इंजीनियर', en: 'Engineers', count: 28 },
  { hi: 'शिक्षा', en: 'Academia', count: 14 },
  { hi: 'व्यापार', en: 'Business', count: 22 },
  { hi: 'कृषि', en: 'Agriculture', count: 10 },
];

const people = [
  { name: 'Aarti Patel', tag: 'IAS 2022', blurb: 'Joint Magistrate, Sitapur. 2022 batch UPSC, AIR 47.', age: 28, height: "5'5\"", city: 'Lucknow', caste: 'Patel', hue: 30 },
  { name: 'Dr. Ritu Sachan', tag: 'AIIMS Delhi', blurb: 'MBBS-MD Cardiology. Research interests in preventive heart care.', age: 29, height: "5'4\"", city: 'Delhi', caste: 'Sachan', hue: 80 },
  { name: 'Vikram Verma', tag: 'IIT-D · Founder', blurb: 'Founded an agri-tech that works with 1,200 Kurmi farmers in eastern UP.', age: 31, height: "5'10\"", city: 'Bengaluru', caste: 'Verma', hue: 200 },
  { name: 'Sneha Singh', tag: 'CA · Big 4', blurb: 'Manager at Deloitte. Trustee, Kurmi Education Trust.', age: 27, height: "5'3\"", city: 'Mumbai', caste: 'Singh', hue: 320 },
];

const subFilters = ['Show all', 'Brides', 'Grooms'];

export default function Featured() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Featured Personalities"
        subtitle="सम्मानित कुर्मी समाज के सदस्य"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Trust strip */}
        <View style={{ marginHorizontal: 20, marginTop: 12, padding: 10, paddingHorizontal: 12, backgroundColor: t.surfaceWarm, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Shield size={16} color={t.primary} strokeWidth={1.6} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 11.5, color: t.text, lineHeight: 16 }}>Editorial team द्वारा verified</Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>Never paid placement · हमेशा निशुल्क</Text>
          </View>
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8 }}>
          {cats.map((c, i) => (
            <Pressable key={i} style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: c.sel ? t.primary : t.surface, borderWidth: 1, borderColor: c.sel ? t.primary : t.border, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: c.sel ? '#FFF' : t.text }}>{c.hi}</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 10, color: c.sel ? 'rgba(255,255,255,0.7)' : t.textMuted }}>{c.count}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Sub-filter */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', gap: 6 }}>
          {subFilters.map((s, i) => (
            <Pressable key={i} style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, backgroundColor: i === 0 ? t.text : 'transparent' }}>
              <Text style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: '500', color: i === 0 ? '#FFF' : t.textMuted }}>{s}</Text>
            </Pressable>
          ))}
        </View>

        {/* Cards */}
        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {people.map((p, i) => (
            <Pressable key={i} onPress={() => router.push(`/featured/${p.name}`)} style={{ backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14, overflow: 'hidden' }}>
              <View style={{ padding: 14, flexDirection: 'row', gap: 12 }}>
                <PhotoPlaceholder name={p.name} height={76} width={76} radius={10} hue={p.hue} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{p.name}</Text>
                    <Check size={12} color={t.info} strokeWidth={1.6} />
                  </View>
                  <View style={{ marginTop: 4, paddingVertical: 3, paddingHorizontal: 8, backgroundColor: t.primarySoft, borderRadius: 6, alignSelf: 'flex-start' }}>
                    <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.primaryDeep, fontWeight: '500' }}>{p.tag}</Text>
                  </View>
                  <Text style={{ marginTop: 6, fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>{p.age} · {p.height} · {p.caste} · {p.city}</Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                <View style={{ padding: 10, backgroundColor: t.surfaceWarm, borderLeftWidth: 3, borderLeftColor: t.primary }}>
                  <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text, lineHeight: 17, fontStyle: 'italic' }}>"{p.blurb}"</Text>
                </View>
              </View>
            </Pressable>
          ))}
          <KCButton variant="secondary" size="md" full onPress={() => {}}>Load 81 more</KCButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
