import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, Star, Share2, MoreVertical } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import KCButton from '@/components/ui/KCButton';

const credentials = [
  ['UPSC Gazette', 'Govt of India'],
  ['Education', 'IIT-D B.Tech'],
  ['Aadhaar ID', 'Verified'],
  ['Photo', 'Selfie verified'],
];

export default function FeaturedDetail() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero */}
        <View style={{ position: 'relative' }}>
          <View style={{ position: 'absolute', top: 12, left: 16, right: 16, zIndex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={() => router.back()} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={18} color={t.text} strokeWidth={1.6} />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}>
                <Share2 size={16} color={t.text} strokeWidth={1.6} />
              </Pressable>
              <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' }}>
                <MoreVertical size={18} color={t.text} strokeWidth={1.6} />
              </Pressable>
            </View>
          </View>
          <PhotoPlaceholder name="Aarti" height={380} width={undefined} radius={0} hue={30} />
        </View>

        {/* Featured strip */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 12, backgroundColor: t.primary, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Star size={14} color="#FFF" fill="#FFF" strokeWidth={1.6} />
          <Text style={{ fontFamily: 'Mukta', fontSize: 12, fontWeight: '500', color: '#FFF' }}>Featured Personality · Civil Services</Text>
        </View>

        {/* Name + credential */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 24, fontWeight: '500', color: t.text }}>Aarti Patel</Text>
            <Check size={16} color={t.info} strokeWidth={1.6} />
          </View>
          <View style={{ marginTop: 8, paddingVertical: 5, paddingHorizontal: 12, backgroundColor: t.primarySoft, borderRadius: 8, alignSelf: 'flex-start' }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 12, color: t.primaryDeep, fontWeight: '500' }}>IAS 2022 · Joint Magistrate, Sitapur</Text>
          </View>
          <Text style={{ fontFamily: 'Inter', fontSize: 12, color: t.textMuted, marginTop: 10 }}>28 yrs · 5'5" · Patel · Lucknow, UP</Text>
        </View>

        {/* Editorial blurb */}
        <View style={{ marginHorizontal: 20, marginTop: 14, padding: 14, backgroundColor: t.surfaceWarm, borderLeftWidth: 3, borderLeftColor: t.primary, borderRadius: 10 }}>
          <Text style={{ fontFamily: 'Mukta', fontSize: 13, color: t.text, lineHeight: 20, fontStyle: 'italic' }}>
            "AIR 47 in 2022 UPSC. First in her village to clear civil services. Mentors rural Kurmi students from her home district."
          </Text>
          <Text style={{ marginTop: 6, fontFamily: 'Inter', fontSize: 10, color: t.textFaint, letterSpacing: 0.5 }}>— Editorial team</Text>
        </View>

        {/* Verified credentials grid */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 16, paddingTop: 16 }}>
          <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.textMuted, marginBottom: 8 }}>Verified credentials</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {credentials.map(([label, sub], i) => (
              <View key={i} style={{ width: '47%', padding: 10, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: t.successSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={14} color={t.success} strokeWidth={1.6} />
                </View>
                <View>
                  <Text style={{ fontFamily: 'Mukta', fontSize: 11.5, color: t.text }}>{label}</Text>
                  <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: t.textFaint }}>{sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action bar */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 24, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Pressable style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
          <Share2 size={16} color={t.text} strokeWidth={1.6} />
        </Pressable>
        <Pressable style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
          <Star size={16} color={t.text} strokeWidth={1.6} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <KCButton variant="primary" size="lg" full onPress={() => router.push('/profile/send-interest')}>Interest भेजें · Send interest</KCButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
