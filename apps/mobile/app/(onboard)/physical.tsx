import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import OnboardStep from '@/components/layout/OnboardStep';

const bodyTypes: [string, string, boolean?][] = [
  ['पतला', 'Slim'],
  ['औसत', 'Average', true],
  ['मोटा', 'Heavy'],
  ['Athletic', ''],
];

const complexions: [string, string, boolean?][] = [
  ['गोरा', 'Fair'],
  ['गेहुआ', 'Wheatish', true],
  ['सांवला', 'Dark'],
];

const challengeOpts: [string, string, boolean?][] = [
  ['नहीं', 'None', true],
  ['हाँ', 'Yes'],
];

export default function Physical() {
  return (
    <OnboardStep
      step={3}
      total={14}
      hi="शारीरिक जानकारी"
      en="Physical attributes"
      ctaHi="आगे"
      ctaEn="Next"
    >
      <View style={{ gap: 20 }}>
        {/* Height slider */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <BiLabel hi="कद" en="Height" size="sm" />
            <Text style={{ fontSize: 16, color: t.primary, fontWeight: '500' }}>5'8" · 173 cm</Text>
          </View>
          <View style={{ height: 24 }}>
            <View style={{
              position: 'absolute', top: 11, left: 0, right: 0,
              height: 3, backgroundColor: t.borderSoft, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 11, left: 0, width: '52%',
              height: 3, backgroundColor: t.primary, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 4,
              left: '48%',
              marginLeft: -8,
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary,
            }} />
          </View>
        </View>

        {/* Weight slider */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <BiLabel hi="वजन (optional)" en="Weight" size="sm" />
            <Text style={{ fontSize: 16, color: t.primary, fontWeight: '500' }}>72 kg</Text>
          </View>
          <View style={{ height: 24 }}>
            <View style={{
              position: 'absolute', top: 11, left: 0, right: 0,
              height: 3, backgroundColor: t.borderSoft, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 11, left: 0, width: '32%',
              height: 3, backgroundColor: t.primary, borderRadius: 999,
            }} />
            <View style={{
              position: 'absolute', top: 4,
              left: '28%',
              marginLeft: -8,
              width: 16, height: 16, borderRadius: 8,
              backgroundColor: t.surface, borderWidth: 2, borderColor: t.primary,
            }} />
          </View>
        </View>

        {/* Body type */}
        <View>
          <BiLabel hi="शारीरिक बनावट" en="Body type" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {bodyTypes.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 13, color: sel ? t.primaryDeep : t.text }}>
                  {hi}{en ? <Text style={{ color: t.textFaint, fontSize: 11 }}> · {en}</Text> : null}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Complexion */}
        <View>
          <BiLabel hi="रंग" en="Complexion" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {complexions.map(([hi, en, sel], i) => (
              <Pressable key={i} style={{
                paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999,
                backgroundColor: sel ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: sel ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 13, color: sel ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Physical challenge */}
        <View>
          <BiLabel hi="कोई शारीरिक चुनौती?" en="Any physical challenge?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {challengeOpts.map(([hi, en, sel], i) => (
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
