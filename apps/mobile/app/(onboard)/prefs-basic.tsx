import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import OnboardStep from '@/components/layout/OnboardStep';

const maritalOpts: [string, string, boolean?][] = [
  ['कभी विवाहित नहीं', 'Never married', true],
  ['तलाकशुदा', 'Divorced'],
];

const manglikOpts: [string, string, boolean?][] = [
  ['नहीं only', 'No only'],
  ["कोई बात नहीं", "Doesn't matter", true],
  ['अंशिक OK', 'Anshik ok'],
];

const dietOpts: [string, string, boolean?][] = [
  ['शाकाहारी', 'Veg', true],
  ['अंडा', 'Egg', true],
  ['मांसाहारी', 'Non-veg'],
];

export default function PrefsBasic() {
  return (
    <OnboardStep
      step={14}
      total={14}
      hi="जीवनसाथी पसंद"
      en="Partner preferences · Basic"
      ctaHi="आगे"
      ctaEn="Community preferences"
    >
      <View style={{ gap: 20 }}>
        {/* Age range slider */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <BiLabel hi="उम्र" en="Age range" size="sm" />
            <Text style={{ fontSize: 14, color: t.primary }}>22 – 28 वर्ष</Text>
          </View>
          <View style={{ height: 24 }}>
            <View style={{
              position: 'absolute', top: 11, left: 0, right: 0,
              height: 3, backgroundColor: t.borderSoft, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 11, left: '20%', width: '40%',
              height: 3, backgroundColor: t.primary, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 4,
              left: '16%',
              marginLeft: -8,
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary,
            }} />
            <View style={{
              position: 'absolute', top: 4,
              left: '56%',
              marginLeft: -8,
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary,
            }} />
          </View>
        </View>

        {/* Height range slider */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <BiLabel hi="कद" en="Height range" size="sm" />
            <Text style={{ fontSize: 14, color: t.primary }}>5'2" – 5'8"</Text>
          </View>
          <View style={{ height: 24 }}>
            <View style={{
              position: 'absolute', top: 11, left: 0, right: 0,
              height: 3, backgroundColor: t.borderSoft, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 11, left: '25%', width: '40%',
              height: 3, backgroundColor: t.primary, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 4,
              left: '21%',
              marginLeft: -8,
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary,
            }} />
            <View style={{
              position: 'absolute', top: 4,
              left: '61%',
              marginLeft: -8,
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary,
            }} />
          </View>
        </View>

        {/* Marital status */}
        <View>
          <BiLabel hi="वैवाहिक स्थिति" en="Marital status" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {maritalOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Manglik */}
        <View>
          <BiLabel hi="मांगलिक" en="Manglik acceptable?" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {manglikOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Diet */}
        <View>
          <BiLabel hi="खान-पान" en="Diet preferred" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {dietOpts.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: sel ? t.primaryDeep : t.text }}>{hi}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </OnboardStep>
  );
}
