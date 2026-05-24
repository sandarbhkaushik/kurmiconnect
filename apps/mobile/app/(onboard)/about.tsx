import { View, Text, TextInput } from 'react-native';
import { Star } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Card from '@/components/ui/Card';
import OnboardStep from '@/components/layout/OnboardStep';

export default function About() {
  return (
    <OnboardStep
      step={12}
      total={14}
      hi="अपने बारे में"
      en="About me"
      subtitle="4-5 लाइन में लिखें · Write 4-5 lines"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 14 }}>
        {/* Bio textarea */}
        <View>
          <TextInput
            multiline
            numberOfLines={4}
            defaultValue="मैं Lucknow में एक software engineer हूँ। परिवार से बहुत जुड़ा हूँ और हर साल त्योहारों पर घर जाता हूँ। मेरे शौक में cricket, यात्रा, और किताबें शामिल हैं। एक समझदार और परिवार-केंद्रित जीवनसाथी की तलाश है।"
            style={{
              padding: 16, minHeight: 160,
              backgroundColor: t.surface,
              borderWidth: 1.5, borderColor: t.primary,
              borderRadius: 12,
              fontSize: 14, color: t.text,
              lineHeight: 22,
              textAlignVertical: 'top',
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={{ fontSize: 11, color: t.textFaint }}>हिंदी / English keyboard</Text>
            <Text style={{ fontSize: 11, color: t.textFaint }}>241 / 500</Text>
          </View>
        </View>

        {/* AI draft suggestion */}
        <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Star size={18} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: t.text }}>मेरे लिए draft करें</Text>
              <Text style={{ fontSize: 10, color: t.textFaint }}>AI suggestion · Coming soon</Text>
            </View>
          </View>
        </Card>

        {/* Partner expectation */}
        <View>
          <BiLabel hi="अपेक्षा" en="Partner expectation summary (optional)" size="sm" />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder={'जैसे: "मुझे एक समझदार partner चाहिए जो परिवार के साथ रह सके..."'}
            placeholderTextColor={t.textFaint}
            style={{
              marginTop: 8, padding: 14, minHeight: 80,
              backgroundColor: t.surface,
              borderWidth: 1, borderColor: t.border,
              borderRadius: 10,
              fontSize: 13, color: t.text,
              textAlignVertical: 'top',
            }}
          />
        </View>
      </View>
    </OnboardStep>
  );
}
