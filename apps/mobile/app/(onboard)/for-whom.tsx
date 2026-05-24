import { View, Text, Pressable } from 'react-native';
import { User, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import OnboardStep from '@/components/layout/OnboardStep';

const options = [
  { hi: 'अपने लिए', en: 'Myself', selected: true },
  { hi: 'बेटे के लिए', en: 'My son' },
  { hi: 'बेटी के लिए', en: 'My daughter' },
  { hi: 'भाई के लिए', en: 'My brother' },
  { hi: 'बहन के लिए', en: 'My sister' },
  { hi: 'रिश्तेदार', en: 'Relative' },
];

export default function ForWhom() {
  const router = useRouter();
  return (
    <OnboardStep
      step={1}
      total={14}
      hi="यह profile किसके लिए है?"
      en="Whose profile is this?"
      subtitle="हम accordingly आपको दिखाएँगे · We'll personalize accordingly"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 10 }}>
        {options.map((o, i) => (
          <Pressable key={i} style={{
            height: 64, paddingHorizontal: 18,
            backgroundColor: t.surface,
            borderWidth: 1.5, borderColor: o.selected ? t.primary : t.border,
            borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 14,
          }}>
            <View style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: o.selected ? t.primarySoft : t.borderSoft,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <User size={18} color={o.selected ? t.primary : t.textMuted} strokeWidth={1.6} />
            </View>
            <View style={{ flex: 1 }}>
              <BiLabel hi={o.hi} en={o.en} size="sm" />
            </View>
            {o.selected && <Check color={t.primary} size={18} strokeWidth={1.6} />}
          </Pressable>
        ))}
      </View>
    </OnboardStep>
  );
}
