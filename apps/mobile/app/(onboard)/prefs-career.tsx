import { View, Text, Pressable } from 'react-native';
import { Shield } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import Card from '@/components/ui/Card';
import OnboardStep from '@/components/layout/OnboardStep';

const professionOpts: [string, string?, boolean?][] = [
  ['सरकारी', 'Govt', true],
  ['निजी', 'Private', true],
  ['Doctor/Lawyer', '', true],
  ['Business', '', true],
  ['Teacher', ''],
];

const workingOpts: [string, string, boolean?][] = [
  ['हाँ', 'Yes', true],
  ["कोई बात नहीं", "Doesn't matter"],
];

export default function PrefsCareer() {
  return (
    <OnboardStep
      step={14}
      total={14}
      hi="शिक्षा और career"
      en="Education & career preferences"
      ctaHi="Review"
      ctaEn="Submit profile"
    >
      <View style={{ gap: 14 }}>
        <Field hi="न्यूनतम शिक्षा" en="Minimum education" value="Graduate" />

        {/* Acceptable professions */}
        <View>
          <BiLabel hi="स्वीकार्य पेशे" en="Acceptable professions" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {professionOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>
                  {hi}{en ? ` · ${en}` : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Field hi="न्यूनतम वार्षिक आय" en="Minimum income" value="5 लाख · 5L" />

        {/* Working professional */}
        <View>
          <BiLabel hi="Working professional चाहिए?" en="Want working professional?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {workingOpts.map(([hi, en, sel], i) => (
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

        {/* Verification notice */}
        <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Shield size={18} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                Profile submit होने पर 24h में verify किया जाएगा
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                Verified within 24 hours
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </OnboardStep>
  );
}
