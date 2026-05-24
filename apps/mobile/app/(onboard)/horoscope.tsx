import { View, Text, Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import Card from '@/components/ui/Card';
import KCButton from '@/components/ui/KCButton';
import OnboardStep from '@/components/layout/OnboardStep';

const kundliOpts: [string, string, boolean?][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No'],
];

export default function Horoscope() {
  return (
    <OnboardStep
      step={11}
      total={14}
      hi="कुंडली"
      en="Horoscope details"
      subtitle="ये match suggestion के लिए use होगी · Used for compatibility matching"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <View>
          <BiLabel hi="क्या कुंडली match में विश्वास करते हैं?" en="Believe in Kundli matching?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {kundliOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: sel ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: sel ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Field hi="जन्म समय" en="Time of birth" value="06:42 AM" />
        <Field hi="जन्म स्थान" en="Place of birth" value="Gopalganj, Bihar" />
        <Field hi="मांगलिक स्थिति" en="Manglik status" value="नहीं · No" />
        <Field hi="नक्षत्र" en="Nakshatra" value="Rohini · रोहिणी" />
        <Field hi="राशि" en="Rashi" value="Vrishabha · वृषभ" />

        <Card padding={12} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <Star size={16} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                हम आपकी Kundli generate कर सकते हैं · ₹199
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                Auto-generate Kundli report
              </Text>
            </View>
            <KCButton variant="soft" size="sm">Order</KCButton>
          </View>
        </Card>
      </View>
    </OnboardStep>
  );
}
