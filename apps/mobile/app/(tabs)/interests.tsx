import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import KCButton from '@/components/ui/KCButton';

type TabKey = 'sent' | 'received' | 'accepted';

const sentItems = [
  { name: 'Priya Patel', age: 26, city: 'Lucknow', status: 'pending', when: '2 days ago', hue: 20 },
  { name: 'Anjali Sachan', age: 25, city: 'Kanpur', status: 'accepted', when: '5 days ago', hue: 60 },
  { name: 'Pooja Verma', age: 27, city: 'Patna', status: 'declined', when: '1 week ago', hue: 320 },
  { name: 'Neha Katiyar', age: 24, city: 'Allahabad', status: 'pending', when: '1 week ago', hue: 180 },
];

const receivedItems = [
  { name: 'Rajiv Singh', age: 28, city: 'Delhi', when: '2 hours ago', hue: 200, msg: 'Namaste 🙏 Mujhe aapki profile bahut achchi lagi...' },
  { name: 'Manish Verma', age: 30, city: 'Patna', when: 'Yesterday', hue: 100 },
  { name: 'Ankit Patel', age: 27, city: 'Lucknow', when: '3 days ago', hue: 40 },
];

const acceptedItems = [
  { name: 'Anjali Sachan', age: 25, city: 'Kanpur', when: 'Today', activity: 'Active now', hue: 60 },
  { name: 'Ritu Mahato', age: 26, city: 'Ranchi', when: 'Yesterday', activity: '2h ago', hue: 280 },
];

const statusChips = ['All', 'Pending', 'Accepted', 'Declined'];

export default function Interests() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>('sent');

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'sent', label: 'Sent', count: 12 },
    { key: 'received', label: 'Received', count: 8 },
    { key: 'accepted', label: 'Accepted', count: 3 },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 0, backgroundColor: t.surface }}>
        <BiLabel hi="रुचि" en="Interests" size="lg" />
        <View style={{ flexDirection: 'row', marginTop: 14, borderBottomWidth: 1, borderBottomColor: t.borderSoft }}>
          {tabs.map((tb) => (
            <Pressable key={tb.key} onPress={() => setTab(tb.key)} style={{ paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: tab === tb.key ? 2 : 0, borderBottomColor: t.primary, marginBottom: -1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 13, color: tab === tb.key ? t.primary : t.textMuted, fontWeight: tab === tb.key ? '500' : '400' }}>{tb.label}</Text>
              <View style={{ paddingVertical: 1, paddingHorizontal: 5, backgroundColor: tab === tb.key ? t.primarySoft : t.borderSoft, borderRadius: 999 }}>
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: tab === tb.key ? t.primary : t.textMuted }}>{tb.count}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Status chips — only for sent tab */}
      {tab === 'sent' && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: t.surface, borderBottomWidth: 1, borderBottomColor: t.borderSoft }} contentContainerStyle={{ gap: 6, paddingHorizontal: 20, paddingVertical: 12 }}>
          {statusChips.map((c, i) => (
            <Pressable key={i} style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999, backgroundColor: i === 0 ? t.text : t.surface, borderWidth: 1, borderColor: i === 0 ? t.text : t.border }}>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: i === 0 ? '#FFF' : t.textMuted }}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20, gap: tab === 'received' ? 12 : 10 }}>
        {/* SENT */}
        {tab === 'sent' && sentItems.map((it, i) => (
          <View key={i} style={{ padding: 12, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar name={it.name} size={52} hue={it.hue} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{it.name}</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>{it.age} · {it.city}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                {it.status === 'pending' && <Badge kind="warn">Pending</Badge>}
                {it.status === 'accepted' && <Badge kind="success">Accepted</Badge>}
                {it.status === 'declined' && <Badge kind="default">Declined</Badge>}
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>{it.when}</Text>
              </View>
            </View>
            {it.status === 'pending' && (
              <KCButton variant="ghost" size="sm" onPress={() => {}}>Withdraw</KCButton>
            )}
            {it.status === 'accepted' && (
              <KCButton variant="primary" size="sm" onPress={() => router.push('/chat/1')}>Message</KCButton>
            )}
          </View>
        ))}

        {/* RECEIVED */}
        {tab === 'received' && receivedItems.map((it, i) => (
          <View key={i} style={{ padding: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Avatar name={it.name} size={52} hue={it.hue} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{it.name}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>{it.age} · {it.city}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: t.textFaint, marginTop: 2 }}>Sent {it.when}</Text>
              </View>
            </View>
            {it.msg && (
              <View style={{ marginTop: 10, padding: 10, backgroundColor: t.surfaceWarm, borderRadius: 8 }}>
                <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text, fontStyle: 'italic', lineHeight: 18 }}>"{it.msg}"</Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <View style={{ flex: 1 }}>
                <KCButton variant="secondary" size="md" full onPress={() => {}}>Decline</KCButton>
              </View>
              <View style={{ flex: 1 }}>
                <KCButton variant="primary" size="md" full onPress={() => {}}>Accept</KCButton>
              </View>
            </View>
          </View>
        ))}

        {/* ACCEPTED */}
        {tab === 'accepted' && acceptedItems.map((it, i) => (
          <View key={i} style={{ padding: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 14, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar name={it.name} size={52} hue={it.hue} online />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{it.name}</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.success, marginTop: 2 }}>Match accepted</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: t.textFaint, marginTop: 1 }}>{it.activity}</Text>
            </View>
            <KCButton variant="primary" size="sm" onPress={() => router.push('/chat/1')}>Chat</KCButton>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
