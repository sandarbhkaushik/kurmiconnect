import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const familyOpts: [string, string, boolean?][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No'],
];

const landOpts: [string, string?, boolean?][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No'],
  ['Skip', ''],
];

export default function Native() {
  return (
    <OnboardStep
      step={6}
      total={14}
      hi="मूल निवास"
      en="Native place"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <Field hi="मूल राज्य" en="Native state" value="Bihar" />
        <Field hi="मूल जिला" en="Native district" value="Gopalganj" />
        <Field hi="मूल गाँव/शहर" en="Native village or town" value="Hathua" />

        <View>
          <BiLabel hi="क्या आपका परिवार अभी भी वहाँ है?" en="Does your family still live there?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {familyOpts.map(([hi, en, sel], i) => (
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
          <BiLabel hi="क्या आपके खेत/जमीन वहाँ है?" en="Do you own land/farm there?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {landOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: sel ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: sel ? t.primaryDeep : t.text }}>
                  {hi}{en ? ` · ${en}` : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </OnboardStep>
  );
}
