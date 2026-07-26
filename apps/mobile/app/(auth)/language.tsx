import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Badge from '@/components/ui/Badge';
import BottomCTA from '@/components/ui/BottomCTA';

const langs = [
  { hiKey: 'language.hindi', enKey: '', code: 'hi' },
  { hiKey: 'language.english', enKey: '', code: 'en' },
  { hiKey: 'language.marathi', enKey: 'language.marathi_phase', code: 'mr', disabled: true },
];

export default function Language() {
  const router = useRouter();
  const { t: tr } = useTranslation();
  const [selected, setSelected] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View style={{ marginBottom: 32 }}>
          <BiLabel hi={tr('language.title')} en={tr('language.subtitle')} size="xxl" />
        </View>
        <View style={{ gap: 12 }}>
          {langs.map((l, i) => (
            <Pressable key={i} onPress={() => !l.disabled && setSelected(i)} style={{
              height: 80, paddingHorizontal: 20,
              backgroundColor: l.disabled ? t.borderSoft : t.surface,
              borderWidth: 1.5, borderColor: selected === i ? t.primary : t.border,
              borderRadius: 12,
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              opacity: l.disabled ? 0.5 : 1,
            }}>
              <View>
                <Text style={{ fontSize: 22, fontWeight: '500', color: t.text }}>{tr(l.hiKey)}</Text>
                {l.enKey ? <Text style={{ fontSize: 12, color: t.textFaint, marginTop: 2 }}>{tr(l.enKey)}</Text> : null}
              </View>
              {selected === i && !l.disabled && (
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={16} color="#FFF" strokeWidth={1.6} />
                </View>
              )}
              {l.disabled && <Badge kind="outline">{tr('common.coming_soon')}</Badge>}
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <BottomCTA label={tr('language.cta')} onPress={() => router.replace('/(auth)/phone')} />
    </SafeAreaView>
  );
}
