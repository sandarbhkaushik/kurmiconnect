import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Shield, Bell } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Avatar from '@/components/ui/Avatar';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

type NotifItem = {
  name: string;
  msg: string;
  when: string;
  hue?: number;
  kind: string;
};

type NotifGroup = {
  label: string;
  items: NotifItem[];
};

const groups: NotifGroup[] = [
  {
    label: 'Today',
    items: [
      { name: 'Anjali Sachan', msg: 'sent you a message', when: '2:14 PM', hue: 60, kind: 'chat' },
      { name: 'Priya Patel', msg: 'accepted your interest', when: '11:30 AM', hue: 20, kind: 'accepted' },
      { name: 'Verification', msg: 'Aadhaar approved ✓', when: '9:14 AM', kind: 'verify' },
    ],
  },
  {
    label: 'This week',
    items: [
      { name: 'Rajiv Singh', msg: 'sent you an interest', when: 'Mon', hue: 200, kind: 'interest' },
      { name: 'Ritu Mahato', msg: 'shortlisted your profile', when: 'Sun', hue: 280, kind: 'shortlist' },
      { name: 'KurmiConnect', msg: 'Your profile boost expires tomorrow', when: 'Sun', kind: 'system' },
    ],
  },
];

export default function Notifications() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Notifications"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
        trailing={
          <Pressable>
            <Text style={{ fontSize: 11, color: t.primary }}>Mark all read</Text>
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {groups.map((g, gi) => (
          <View key={gi}>
            <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 6, backgroundColor: t.bg }}>
              <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>
                {g.label}
              </Text>
            </View>
            {g.items.map((it, i) => (
              <View
                key={i}
                style={{
                  padding: 14,
                  paddingHorizontal: 20,
                  backgroundColor: t.surface,
                  borderBottomWidth: 1,
                  borderBottomColor: t.borderSoft,
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                {it.hue !== undefined ? (
                  <Avatar name={it.name} size={42} hue={it.hue} />
                ) : (
                  <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                    {it.kind === 'verify'
                      ? <Shield size={18} color={t.primary} strokeWidth={1.6} fill={t.primary} />
                      : <Bell size={18} color={t.primary} strokeWidth={1.6} />}
                  </View>
                )}
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 13, color: t.text, lineHeight: 20 }} numberOfLines={2}>
                    <Text style={{ fontWeight: '500' }}>{it.name}</Text>
                    <Text style={{ color: t.textMuted }}>{' '}{it.msg}</Text>
                  </Text>
                  <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 3 }}>{it.when}</Text>
                </View>
                {it.kind === 'interest' && (
                  <KCButton variant="soft" size="sm">View</KCButton>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
