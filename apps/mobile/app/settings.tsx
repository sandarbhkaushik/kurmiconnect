import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import TopBar from '@/components/layout/TopBar';

type SettingItem = { hi: string; en: string };
type SettingGroup = { label: string; items: SettingItem[] };

const groups: SettingGroup[] = [
  {
    label: 'Account',
    items: [
      { hi: 'Personal info', en: 'Name, phone, email' },
      { hi: 'Privacy', en: 'Profile visibility' },
      { hi: 'Verification', en: '2 of 6 complete' },
      { hi: 'Subscription', en: 'Gold · 42 days left' },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { hi: 'Language', en: 'Hindi (default)' },
      { hi: 'Notifications', en: 'Match, chat, system' },
      { hi: 'Theme', en: 'Light · System default' },
    ],
  },
  {
    label: 'Safety',
    items: [
      { hi: 'Blocked users', en: '3 blocked' },
      { hi: 'Report a profile', en: 'Help us keep KurmiConnect safe' },
      { hi: 'Safety tips', en: 'Read our community guide' },
    ],
  },
  {
    label: 'About',
    items: [
      { hi: 'Help & support', en: 'WhatsApp · Email · FAQ' },
      { hi: 'Terms & Privacy', en: '' },
      { hi: 'App version', en: '2.4.1' },
    ],
  },
];

export default function Settings() {
  const router = useRouter();

  function handleItemPress(hi: string) {
    if (hi === 'Privacy') router.push('/privacy');
    else if (hi === 'Verification') router.push('/verify');
    else if (hi === 'Subscription') router.push('/subscription');
    else if (hi === 'Help & support') router.push('/help');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Settings"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 12, paddingHorizontal: 20, paddingBottom: 24 }}>
          {groups.map((g, gi) => (
            <View key={gi} style={{ marginBottom: 18 }}>
              <Text style={{ paddingTop: 4, paddingBottom: 8, fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>
                {g.label}
              </Text>
              <View style={{ backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, overflow: 'hidden' }}>
                {g.items.map((it, i) => (
                  <Pressable
                    key={i}
                    onPress={() => handleItemPress(it.hi)}
                    style={{
                      padding: 12,
                      paddingHorizontal: 14,
                      borderBottomWidth: i < g.items.length - 1 ? 1 : 0,
                      borderBottomColor: t.borderSoft,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <BiLabel hi={it.hi} en={it.en} size="sm" />
                    </View>
                    <ChevronRight size={14} color={t.textFaint} strokeWidth={1.6} />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          <Pressable>
            <Text style={{ textAlign: 'center', paddingVertical: 16, fontSize: 13, color: t.error }}>
              Log out · Sign out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
