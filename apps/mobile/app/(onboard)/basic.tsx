import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const genderOptions: [string, string, boolean?][] = [
  ['पुरुष', 'Male', true],
  ['स्त्री', 'Female', false],
];

const maritalOptions: [string, string, boolean?][] = [
  ['कभी विवाहित नहीं', 'Never married', true],
  ['तलाकशुदा', 'Divorced'],
  ['विधवा/विधुर', 'Widowed'],
  ['तलाक प्रक्रिया में', 'Awaiting divorce'],
];

export default function Basic() {
  return (
    <OnboardStep
      step={2}
      total={14}
      hi="मूलभूत जानकारी"
      en="Basic info"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <Field hi="पहला नाम" en="First name *" value="Rajesh" />
        <Field hi="मध्य नाम" en="Middle name" placeholder="Optional" />
        <Field hi="अंतिम नाम" en="Last name *" value="Patel" help="Auto-suggest from Kurmi surnames" />

        <View>
          <BiLabel hi="लिंग" en="Gender" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {genderOptions.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                flex: 1, height: 48, borderRadius: 10,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: sel ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 14, color: sel ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Field hi="जन्म तिथि" en="Date of birth" value="14 अगस्त 1995" />

        <View>
          <BiLabel hi="वैवाहिक स्थिति" en="Marital status" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {maritalOptions.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>
                  {hi}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </OnboardStep>
  );
}
