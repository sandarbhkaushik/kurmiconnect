import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const studyingOpts: [string, string, boolean?][] = [
  ['हाँ', 'Yes'],
  ['नहीं', 'No', true],
];

export default function Education() {
  return (
    <OnboardStep
      step={7}
      total={14}
      hi="शिक्षा"
      en="Education"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <Field hi="उच्चतम शिक्षा" en="Highest qualification" value="BTech / BE" />
        <Field hi="विशेषज्ञता" en="Specialisation" value="Computer Science" />
        <Field hi="कॉलेज / यूनिवर्सिटी" en="College/University" value="IET Lucknow" />
        <Field hi="पास होने का वर्ष" en="Year of passing" value="2017" />

        <View>
          <BiLabel hi="क्या आगे की पढ़ाई कर रहे हैं?" en="Currently studying further?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {studyingOpts.map(([hi, en, sel], i) => (
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
