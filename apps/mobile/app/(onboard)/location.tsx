import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const nativeOpts: [string, string, boolean?][] = [
  ['हाँ', 'Yes'],
  ['नहीं', 'No', true],
];

export default function Location() {
  return (
    <OnboardStep
      step={5}
      total={14}
      hi="वर्तमान निवास"
      en="Current location"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <Field hi="देश" en="Country" value="India" />
        <Field hi="राज्य" en="State" value="Uttar Pradesh" />
        <Field hi="जिला" en="District" value="Lucknow" />
        <Field hi="शहर" en="City" value="Lucknow" />
        <Field hi="कब से यहाँ रह रहे हैं?" en="Residing since" value="2018" />

        <View>
          <BiLabel hi="क्या ये आपका मूल निवास है?" en="Is this your native place?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {nativeOpts.map(([hi, en, sel], i) => (
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
      </View>
    </OnboardStep>
  );
}
