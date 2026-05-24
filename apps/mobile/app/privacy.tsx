import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import TopBar from '@/components/layout/TopBar';

type PrivacySetting = {
  hi: string;
  en: string;
  on?: boolean;
  value?: string;
};

const settings: PrivacySetting[] = [
  { hi: 'Profile search में दिखे?', en: 'Show in search', on: true },
  { hi: 'Photos किसे दिखे', en: 'Show photos to', value: 'Verified only' },
  { hi: 'Phone number', en: 'Show phone', value: 'After acceptance' },
  { hi: 'Last seen', en: 'Show last seen', on: false },
  { hi: 'Online status', en: 'Show online status', on: true },
  { hi: 'Chat allow', en: 'Allow chat from', value: 'Accepted matches only' },
  { hi: 'Hide profile', en: 'Hide from specific users', value: '3 users' },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <View style={{ width: 40, height: 24, borderRadius: 12, backgroundColor: on ? t.primary : t.borderSoft }}>
      <View style={{ position: 'absolute', top: 2, [on ? 'right' : 'left']: 2, width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' }} />
    </View>
  );
}

export default function Privacy() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Privacy"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 14, paddingHorizontal: 20 }}>
          <View style={{ backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, overflow: 'hidden' }}>
            {settings.map((s, i) => (
              <View
                key={i}
                style={{
                  padding: 14,
                  paddingHorizontal: 16,
                  borderBottomWidth: i < settings.length - 1 ? 1 : 0,
                  borderBottomColor: t.borderSoft,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <BiLabel hi={s.hi} en={s.en} size="sm" />
                  {s.value !== undefined && (
                    <Text style={{ fontSize: 11, color: t.primary, marginTop: 3 }}>{s.value}</Text>
                  )}
                </View>
                {s.on !== undefined ? (
                  <Toggle on={s.on} />
                ) : (
                  <ChevronRight size={14} color={t.textFaint} strokeWidth={1.6} />
                )}
              </View>
            ))}
          </View>

          {/* Take a break */}
          <View style={{ marginTop: 20, padding: 16, backgroundColor: t.surfaceWarm, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: t.surface, alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={16} color={t.primary} strokeWidth={1.6} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: t.text, fontWeight: '500' }}>Take a break</Text>
              <Text style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>Pause your profile for some days</Text>
            </View>
            <Toggle on={false} />
          </View>

          <Pressable onPress={() => router.push('/delete-account')}>
            <Text style={{ marginTop: 20, textAlign: 'center', padding: 16, fontSize: 13, color: t.error }}>
              Delete account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
