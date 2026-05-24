import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, Share2, MoreVertical, Heart } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import KCButton from '@/components/ui/KCButton';

export default function ProfileDetail() {
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
          <PhotoPlaceholder name="Priya" height={420} width={undefined} radius={0} hue={20} />
          <View style={{ position: 'absolute', top: 16, right: 60, paddingVertical: 4, paddingHorizontal: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 999 }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: '500', color: '#FFF' }}>1 / 4</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 16, left: 16, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#FFF', borderRadius: 999 }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: '500', color: t.primary }}>92% match</Text>
          </View>
        </View>

        {/* Name + badges */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 24, fontWeight: '500', color: t.text }}>Priya Patel</Text>
            <Check size={16} color={t.info} strokeWidth={1.6} />
          </View>
          <Text style={{ fontFamily: 'Inter', fontSize: 12, color: t.textMuted, marginTop: 4 }}>26 yrs · 5'4" · Patel · Lucknow, UP</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            <Badge kind="verified">Aadhaar</Badge>
            <Badge kind="verified">Education</Badge>
            <Badge kind="verified">Employer</Badge>
            <Badge kind="verified">Photo</Badge>
          </View>
        </View>

        {/* About */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontFamily: 'Mukta', fontSize: 11, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>About</Text>
          <Text style={{ fontFamily: 'Mukta', fontSize: 13.5, color: t.text, lineHeight: 21 }}>
            PGT Math teacher in Lucknow. Bachpan से classical music सुनती हूँ। हफ्ते में दो दिन गाँव के स्कूल में volunteer पढ़ाती हूँ। एक समझदार और परिवार-केंद्रित जीवनसाथी की तलाश...
            <Text style={{ color: t.primary, fontWeight: '500' }}> Read more</Text>
          </Text>
        </View>

        {/* Family card */}
        <View style={{ paddingHorizontal: 20 }}>
          <Card padding={14} accent>
            <Text style={{ fontFamily: 'Mukta', fontSize: 11, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Family</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Father</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Shri Suresh Patel · Farmer</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Mother</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Smt. Indu Patel · Homemaker</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Siblings</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>1 brother (married)</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Native</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Gopalganj, Bihar</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Values</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Traditional</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Gotra</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Kashyap</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Profession */}
        <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
          <Card padding={14}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 11, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Education &amp; profession</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Education</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>M.Sc Mathematics · LU 2021</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Profession</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>PGT Teacher</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Workplace</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>City Montessori</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Income</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>5 – 10 लाख</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Horoscope */}
        <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14 }}>
          <Card padding={14}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 11, color: t.textMuted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10 }}>Horoscope</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Manglik</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>No</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Nakshatra</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Rohini · रोहिणी</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Rashi</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>Vrishabha</Text>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 10, color: t.textFaint }}>Birth time</Text>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>06:42 AM</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Action bar */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 24, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Pressable style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
          <Share2 size={16} color={t.text} strokeWidth={1.6} />
        </Pressable>
        <Pressable style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} color={t.text} strokeWidth={1.6} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <KCButton variant="primary" size="lg" full onPress={() => router.push('/profile/send-interest')}>Interest भेजें</KCButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
