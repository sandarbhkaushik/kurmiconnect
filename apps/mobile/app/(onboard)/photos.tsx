import { View, Text, Pressable } from 'react-native';
import { Camera, Star, X } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Card from '@/components/ui/Card';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import OnboardStep from '@/components/layout/OnboardStep';

const photos: ({ name: string; main?: boolean } | null)[] = [
  { name: 'Rajesh', main: true },
  { name: 'Rajesh' },
  { name: 'R' },
  null,
  null,
  null,
];

const visibilityOpts: [string, string, boolean?][] = [
  ['सबको दिखे', 'Visible to all', true],
  ['सिर्फ premium को', 'Premium only'],
  ['Request करने पर', 'On request'],
];

export default function Photos() {
  return (
    <OnboardStep
      step={13}
      total={14}
      hi="फोटो जोड़ें"
      en="Add photos"
      subtitle="अच्छी photo response 5x बढ़ाती है · Good photos increase responses 5x"
      ctaHi="आगे"
      ctaEn="Next"
    >
      {/* Photo grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        {photos.map((p, i) =>
          p ? (
            <View key={i} style={{ width: '48%', aspectRatio: 0.75, borderRadius: 12, overflow: 'hidden' }}>
              <PhotoPlaceholder name={p.name} height="100%" radius={12} hue={i * 50 + 20} />
              {p.main && (
                <View style={{
                  position: 'absolute', top: 6, left: 6,
                  paddingVertical: 3, paddingHorizontal: 8,
                  backgroundColor: t.primary, borderRadius: 999,
                  flexDirection: 'row', alignItems: 'center', gap: 3,
                }}>
                  <Star size={9} color="#FFF" fill="#FFF" strokeWidth={1.6} />
                  <Text style={{ fontSize: 9, color: '#FFF' }}>MAIN</Text>
                </View>
              )}
              <Pressable style={{
                position: 'absolute', top: 6, right: 6,
                width: 22, height: 22, borderRadius: 11,
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={12} color="#FFF" strokeWidth={1.6} />
              </Pressable>
            </View>
          ) : (
            <Pressable key={i} style={{
              width: '48%', aspectRatio: 0.75, borderRadius: 12,
              borderWidth: 1.5, borderColor: t.border, borderStyle: 'dashed',
              backgroundColor: t.surface,
              alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Camera size={20} color={t.textMuted} strokeWidth={1.6} />
              <Text style={{ fontSize: 12, color: t.textMuted }}>Add photo</Text>
            </Pressable>
          )
        )}
      </View>

      {/* Guidelines */}
      <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0, marginBottom: 14 }}>
        <Text style={{ fontSize: 12, color: t.text, fontWeight: '500', marginBottom: 8 }}>
          Photo guidelines
        </Text>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 11, color: t.textMuted }}>✓ Clear face, recent, solo photo</Text>
          <Text style={{ fontSize: 11, color: t.error }}>✗ Group photos, sunglasses, heavy filters</Text>
        </View>
      </Card>

      {/* Visibility */}
      <View>
        <BiLabel hi="Photo किसे दिखे?" en="Photo visibility" size="sm" />
        <View style={{ gap: 6, marginTop: 8 }}>
          {visibilityOpts.map(([hi, en, sel], i) => (
            <Pressable key={i} style={{
              paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10,
              backgroundColor: sel ? t.primarySoft : t.surface,
              borderWidth: 1.5, borderColor: sel ? t.primary : t.border,
              flexDirection: 'row', alignItems: 'center', gap: 10,
            }}>
              <View style={{
                width: 18, height: 18, borderRadius: 9,
                borderWidth: 1.5, borderColor: sel ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                {sel && (
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.primary }} />
                )}
              </View>
              <View>
                <Text style={{ fontSize: 13, color: t.text }}>{hi}</Text>
                <Text style={{ fontSize: 10, color: t.textFaint }}>{en}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </OnboardStep>
  );
}
