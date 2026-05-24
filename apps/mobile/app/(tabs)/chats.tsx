import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Check } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Avatar from '@/components/ui/Avatar';

const chats = [
  { name: 'Anjali Sachan', msg: 'Family ko bhi profile dikhayi hai...', when: '2:14 PM', unread: 3, hue: 60, online: true, verified: true },
  { name: 'Ritu Mahato', msg: 'Voh weekend free ho aap?', when: '12:08 PM', unread: 1, hue: 280, verified: true },
  { name: 'Priya Patel', msg: 'Match accepted', when: 'Yesterday', hue: 20, verified: true, system: true },
  { name: 'Neha Katiyar', msg: 'Aapne photos dekha?', when: 'Mon', hue: 180 },
  { name: 'Kavita Singh', msg: 'Thank you for the interest 🙏', when: '14 May', hue: 100, verified: true },
];

export default function ChatList() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, backgroundColor: t.surface, borderBottomWidth: 1, borderBottomColor: t.borderSoft }}>
        <BiLabel hi="चैट" en="Chats" size="lg" />
        {/* Search bar */}
        <View style={{ marginTop: 12, height: 40, backgroundColor: t.bg, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 8 }}>
          <Search size={14} color={t.textFaint} strokeWidth={1.6} />
          <Text style={{ fontSize: 12, color: t.textFaint }}>Search chats</Text>
        </View>
      </View>

      <ScrollView>
        {chats.map((c, i) => (
          <Pressable key={i} onPress={() => router.push('/chat/1')} style={{ paddingHorizontal: 20, paddingVertical: 14, backgroundColor: t.surface, borderBottomWidth: 1, borderBottomColor: t.borderSoft, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar name={c.name} size={48} hue={c.hue} online={c.online} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>{c.name}</Text>
                  {c.verified && <Check size={11} color={t.info} strokeWidth={1.6} />}
                </View>
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: c.unread ? t.primary : t.textFaint, fontWeight: c.unread ? '500' : '400' }}>{c.when}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
                  {c.system && <Text style={{ color: t.success }}>● </Text>}
                  <Text numberOfLines={1} style={{ fontFamily: 'Mukta', fontSize: 12, color: c.unread ? t.text : t.textMuted, flex: 1 }}>{c.msg}</Text>
                </View>
                {c.unread ? (
                  <View style={{ paddingVertical: 1, paddingHorizontal: 6, backgroundColor: t.primary, borderRadius: 999 }}>
                    <Text style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: '500', color: '#FFF' }}>{c.unread}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
