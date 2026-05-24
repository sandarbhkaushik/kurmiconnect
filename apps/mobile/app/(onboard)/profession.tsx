import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const cats = [
  { hi: 'सरकारी नौकरी', en: 'Government' },
  { hi: 'निजी नौकरी', en: 'Private', sel: true },
  { hi: 'व्यापार', en: 'Business' },
  { hi: 'खेती', en: 'Agriculture' },
  { hi: 'Professional', en: 'Doctor/Lawyer' },
  { hi: 'छात्र', en: 'Student' },
];

export default function Profession() {
  return (
    <OnboardStep
      step={8}
      total={14}
      hi="पेशा"
      en="Profession"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ marginBottom: 18 }}>
        <BiLabel hi="पेशा श्रेणी" en="Profession category" size="sm" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {cats.map((c, i) => (
            <Pressable key={i} style={{
              width: '48%',
              paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10,
              backgroundColor: c.sel ? t.primarySoft : t.surface,
              borderWidth: 1.5, borderColor: c.sel ? t.primary : t.border,
            }}>
              <Text style={{ fontSize: 13, color: c.sel ? t.primaryDeep : t.text, fontWeight: '500' }}>
                {c.hi}
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint }}>{c.en}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: 14 }}>
        <Field hi="विशिष्ट पद" en="Specific role" value="Software Engineer" />
        <Field hi="पद" en="Designation" value="Senior Engineer" />
        <Field hi="कंपनी" en="Company" value="Infosys" />
        <Field hi="कार्य स्थान" en="Work location" value="Bengaluru, KA" />
        <Field hi="वार्षिक आय" en="Annual income" value="10-20 लाख / 10-20L" />

        {/* Income verify toggle */}
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          paddingVertical: 14, paddingHorizontal: 16,
          backgroundColor: t.surfaceWarm, borderRadius: 10,
        }}>
          <View>
            <Text style={{ fontSize: 13, color: t.text }}>Income verify करवाएँगे?</Text>
            <Text style={{ fontSize: 10, color: t.textFaint }}>Get a verified badge</Text>
          </View>
          <View style={{ width: 40, height: 24, borderRadius: 999, backgroundColor: t.primary }}>
            <View style={{
              position: 'absolute', top: 2, right: 2,
              width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF',
            }} />
          </View>
        </View>
      </View>
    </OnboardStep>
  );
}
