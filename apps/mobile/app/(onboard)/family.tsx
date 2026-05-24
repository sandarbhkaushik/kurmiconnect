import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const familyTypeOpts: [string, string, boolean?][] = [
  ['संयुक्त', 'Joint', true],
  ['एकल', 'Nuclear'],
];

const familyValueOpts: [string, string, boolean?][] = [
  ['रूढ़िवादी', 'Orthodox'],
  ['परंपरागत', 'Traditional', true],
  ['मध्यम', 'Moderate'],
  ['उदार', 'Liberal'],
];

export default function Family() {
  return (
    <OnboardStep
      step={10}
      total={14}
      hi="परिवार की जानकारी"
      en="Family details"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <Field hi="पिताजी का नाम" en="Father's name" value="Shri Ramesh Patel" />
        <Field hi="पिताजी का पेशा" en="Father's occupation" value="किसान · Farmer" />
        <Field hi="माताजी का नाम" en="Mother's name" value="Smt. Sushila Patel" />
        <Field hi="माताजी का पेशा" en="Mother's occupation" value="गृहिणी · Homemaker" />

        {/* Siblings grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <View style={{ width: '48%' }}>
            <Field hi="भाई" en="Brothers" value="2" />
          </View>
          <View style={{ width: '48%' }}>
            <Field hi="भाई शादीशुदा" en="Married" value="1" />
          </View>
          <View style={{ width: '48%' }}>
            <Field hi="बहन" en="Sisters" value="1" />
          </View>
          <View style={{ width: '48%' }}>
            <Field hi="बहन शादीशुदा" en="Married" value="0" />
          </View>
        </View>

        <View>
          <BiLabel hi="परिवार का प्रकार" en="Family type" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {familyTypeOpts.map(([hi, en, sel], i) => (
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

        <View>
          <BiLabel hi="परिवार की values" en="Family values" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {familyValueOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </OnboardStep>
  );
}
