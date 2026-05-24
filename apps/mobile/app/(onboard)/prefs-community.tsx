import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';

const subcastes = [
  'Patel', 'Sachan', 'Katiyar', 'Verma', 'Singh',
  'Kushwaha', 'Maurya', 'Awadhia', 'Chandrakar', 'Mahato',
];

const gotraOpts: [string, string, boolean?][] = [
  ['नहीं', 'No', true],
  ['हाँ', 'Yes'],
];

const otherCasteOpts: [string, string, boolean?][] = [
  ['नहीं', 'No'],
  ['हाँ', 'Yes', true],
];

export default function PrefsCommunity() {
  return (
    <OnboardStep
      step={14}
      total={14}
      hi="जीवनसाथी पसंद"
      en="Community preferences"
      ctaHi="आगे"
      ctaEn="Education preferences"
    >
      <View style={{ gap: 20 }}>
        {/* Sub-castes */}
        <View>
          <BiLabel hi="स्वीकार्य उप-जातियाँ" en="Sub-castes acceptable" size="sm" />
          <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 4, marginBottom: 8 }}>
            Default: all Kurmi sub-castes
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {subcastes.map((s, i) => (
              <Pressable key={i} style={{
                paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999,
                backgroundColor: i < 7 ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: i < 7 ? t.primary : t.border,
                flexDirection: 'row', alignItems: 'center', gap: 4,
              }}>
                <Text style={{ fontSize: 11, color: i < 7 ? t.primaryDeep : t.text }}>{s}</Text>
                {i < 7 && <Check size={11} color={t.primary} strokeWidth={1.6} />}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Same gotra */}
        <View>
          <BiLabel hi="क्या same-gotra चलेगा?" en="Same gotra acceptable?" size="sm" />
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

        {/* Other castes */}
        <View>
          <BiLabel hi="अन्य जातियों से OK?" en="Other castes acceptable?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {otherCasteOpts.map(([hi, en, sel], i) => (
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

        <Field hi="राज्य" en="States preferred" value="UP, Bihar, MP, Delhi" />
        <Field hi="भाषाएँ" en="Languages acceptable" value="Hindi, Bhojpuri, English" />
      </View>
    </OnboardStep>
  );
}
