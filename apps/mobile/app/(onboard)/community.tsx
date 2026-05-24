import { View, Text, Pressable } from 'react-native';
import { Lock } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import Card from '@/components/ui/Card';
import OnboardStep from '@/components/layout/OnboardStep';

const gotraOpts: [string, string, boolean?][] = [
  ['हाँ', 'Yes'],
  ['नहीं', 'No', true],
];

export default function Community() {
  return (
    <OnboardStep
      step={4}
      total={14}
      hi="समुदाय और जाति"
      en="Community & caste"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0, marginBottom: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Lock size={14} color={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                <Text style={{ fontWeight: '500' }}>धर्म: Hindu</Text>
                {' · '}
                <Text style={{ fontWeight: '500' }}>जाति: Kurmi</Text>
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                Pre-set for this community app
              </Text>
            </View>
          </View>
        </Card>

        <Field hi="उप-जाति" en="Sub-caste" value="Patel" />
        <Field hi="गोत्र" en="Gotra" value="Kashyap" help="गोत्र शादी में महत्वपूर्ण है · Important for compatibility" />

        <View>
          <BiLabel hi="क्या same-gotra match स्वीकार है?" en="Same-gotra match acceptable?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {gotraOpts.map(([hi, en, sel], i) => (
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

        <Field hi="मातृभाषा" en="Mother tongue" value="Hindi" />
      </View>
    </OnboardStep>
  );
}
