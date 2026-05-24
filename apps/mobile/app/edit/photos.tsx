import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Star, X, Camera, Shield } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import Card from '@/components/ui/Card';
import PhotoPlaceholder from '@/components/ui/PhotoPlaceholder';
import TopBar from '@/components/layout/TopBar';

type Photo = { name: string; main?: boolean } | null;

const photos: Photo[] = [
  { name: 'Rajesh', main: true },
  { name: 'Rajesh' },
  { name: 'R' },
  null,
  null,
  null,
];

type VisibilityOption = [string, boolean];
const visibilityOptions: VisibilityOption[] = [
  ['Everyone', true],
  ['Verified only', false],
  ['Premium only', false],
  ['Accepted matches', false],
  ['On request', false],
];

export default function PhotoManager() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Photos"
        subtitle="3 of 6 uploaded"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Photo grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {photos.map((p, i) =>
              p ? (
                <View key={i} style={{ width: '48%', aspectRatio: 0.75, borderRadius: 12, overflow: 'hidden' }}>
                  <PhotoPlaceholder name={p.name} height="100%" radius={12} hue={i * 50 + 20} />
                  {p.main && (
                    <View style={{ position: 'absolute', top: 6, left: 6, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: t.primary, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                      <Star size={9} color="#FFF" strokeWidth={1.6} fill="#FFF" />
                      <Text style={{ fontSize: 9, color: '#FFF' }}>MAIN</Text>
                    </View>
                  )}
                  <View style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={12} color="#FFF" strokeWidth={1.6} />
                  </View>
                  <View style={{ position: 'absolute', bottom: 6, left: 6, paddingHorizontal: 6, paddingVertical: 3, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 6 }}>
                    <Text style={{ fontSize: 9, color: '#FFF' }}>Drag to reorder</Text>
                  </View>
                </View>
              ) : (
                <View
                  key={i}
                  style={{
                    width: '48%',
                    aspectRatio: 0.75,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderColor: t.border,
                    borderStyle: 'dashed',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    backgroundColor: t.surface,
                  }}
                >
                  <Camera size={20} color={t.textMuted} strokeWidth={1.6} />
                  <Text style={{ fontSize: 12, color: t.textMuted }}>Add photo</Text>
                </View>
              )
            )}
          </View>

          {/* Photo visibility */}
          <View style={{ marginBottom: 12 }}>
            <BiLabel hi="Photo किसे दिखे?" en="Photo visibility" size="sm" />
          </View>
          <View style={{ gap: 6, marginBottom: 18 }}>
            {visibilityOptions.map(([label, sel], i) => (
              <View
                key={i}
                style={{
                  padding: 11,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                  backgroundColor: sel ? t.primarySoft : t.surface,
                  borderWidth: 1,
                  borderColor: sel ? t.primary : t.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: sel ? t.primary : t.border, alignItems: 'center', justifyContent: 'center' }}>
                  {sel && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: t.primary }} />}
                </View>
                <Text style={{ fontSize: 13, color: t.text }}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Verify prompt */}
          <Card padding={14}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Shield size={18} color={t.primary} strokeWidth={1.6} fill={t.primary} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                  Photo verify करवाएँ — blue tick पाएँ
                </Text>
                <Text style={{ fontSize: 10, color: t.textFaint }}>Selfie verification · 1 min</Text>
              </View>
              <KCButton variant="soft" size="sm" onPress={() => router.push('/verify')}>
                Verify
              </KCButton>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
