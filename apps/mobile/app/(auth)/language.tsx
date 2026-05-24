import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Badge from '@/components/ui/Badge';
import KCButton from '@/components/ui/KCButton';

const langs = [
  { hi: 'हिन्दी', en: 'Hindi', selected: true },
  { hi: 'English', en: '', selected: false },
  { hi: 'मराठी', en: 'Marathi · Phase 2', selected: false, disabled: true },
];

export default function Language() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View style={{ marginBottom: 32 }}>
          <BiLabel hi="अपनी भाषा चुनें" en="Choose your language" size="xxl" />
        </View>
        <View style={{ gap: 12 }}>
          {langs.map((l, i) => (
            <Pressable key={i} style={{
              height: 80, paddingHorizontal: 20,
              backgroundColor: l.disabled ? t.borderSoft : t.surface,
              borderWidth: 1.5, borderColor: l.selected ? t.primary : t.border,
              borderRadius: 12,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              opacity: l.disabled ? 0.5 : 1,
            }}>
              <View>
                <Text style={{ fontSize: 22, fontWeight: '500', color: t.text }}>{l.hi}</Text>
                {l.en ? <Text style={{ fontSize: 12, color: t.textFaint, marginTop: 2 }}>{l.en}</Text> : null}
              </View>
              {l.selected && (
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} color="#FFF" strokeWidth={1.6} />
                </View>
              )}
              {l.disabled && <Badge kind="outline">Coming soon</Badge>}
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 24, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface }}>
        <KCButton variant="primary" size="lg" full onPress={() => router.push('/(auth)/phone')}>
          जारी रखें · Continue
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
