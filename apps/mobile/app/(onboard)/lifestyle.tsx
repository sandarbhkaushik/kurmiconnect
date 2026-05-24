import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import OnboardStep from '@/components/layout/OnboardStep';

type ChipOption = [string, string?, boolean?];

function ChipRow({ hi, en, opts }: { hi: string; en: string; opts: ChipOption[] }) {
  return (
    <View>
      <BiLabel hi={hi} en={en} size="sm" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
        {opts.map(([h, e, sel], i) => (
          <Pressable key={i} style={{
            paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999,
            backgroundColor: sel ? t.primarySoft : t.surface,
            borderWidth: 1, borderColor: sel ? t.primary : t.border,
          }}>
            <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>
              {h}{e ? <Text style={{ color: t.textFaint, fontSize: 10 }}> · {e}</Text> : null}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function Lifestyle() {
  return (
    <OnboardStep
      step={9}
      total={14}
      hi="जीवनशैली"
      en="Lifestyle"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 18 }}>
        <ChipRow
          hi="खान-पान"
          en="Diet"
          opts={[
            ['शाकाहारी', 'Veg', true],
            ['अंडा-शाकाहारी', 'Egg'],
            ['मांसाहारी', 'Non-veg'],
            ['जैन', 'Jain'],
          ]}
        />
        <ChipRow
          hi="शराब"
          en="Drinking"
          opts={[
            ['कभी नहीं', 'Never', true],
            ['कभी-कभी', 'Occasionally'],
            ['सामाजिक', 'Socially'],
          ]}
        />
        <ChipRow
          hi="धूम्रपान"
          en="Smoking"
          opts={[
            ['कभी नहीं', 'Never', true],
            ['कभी-कभी', 'Occasionally'],
          ]}
        />
        <ChipRow
          hi="शौक (max 6)"
          en="Hobbies"
          opts={[
            ['क्रिकेट', '', true],
            ['पढ़ना', '', true],
            ['संगीत', ''],
            ['घूमना', '', true],
            ['फिल्म', ''],
            ['फिटनेस', ''],
            ['कुकिंग', ''],
            ['फोटोग्राफी', ''],
          ]}
        />
        <ChipRow
          hi="भाषाएँ"
          en="Languages"
          opts={[
            ['Hindi', '', true],
            ['English', '', true],
            ['Bhojpuri', '', true],
            ['Marathi', ''],
            ['Gujarati', ''],
          ]}
        />
      </View>
    </OnboardStep>
  );
}
