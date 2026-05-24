import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, Phone, MoreVertical, Plus, ArrowRight } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Avatar from '@/components/ui/Avatar';

const quickReplies = ['Namaste 🙏', 'Family से बात करवाइए', 'When can we talk?'];

export default function Chat() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top', 'bottom']}>
      {/* Top bar */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: t.surface, borderBottomWidth: 1, borderBottomColor: t.borderSoft, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable onPress={() => router.back()}>
          <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
        </Pressable>
        <Avatar name="Anjali" size={36} hue={60} online />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>Anjali Sachan</Text>
            <Check size={11} color={t.info} strokeWidth={1.6} />
          </View>
          <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.success }}>Active now</Text>
        </View>
        <Pressable>
          <Phone size={18} color={t.textMuted} strokeWidth={1.6} />
        </Pressable>
        <Pressable>
          <MoreVertical size={18} color={t.textMuted} strokeWidth={1.6} />
        </Pressable>
      </View>

      {/* Messages */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14, gap: 10 }}>
        {/* System message */}
        <View style={{ alignSelf: 'center', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: t.successSoft, borderRadius: 999 }}>
          <Text style={{ fontFamily: 'Mukta', fontSize: 11, color: t.success }}>Match accepted on Mar 5 · please be respectful</Text>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 4 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>Today</Text>
        </View>

        {/* Incoming */}
        <View style={{ maxWidth: '78%', alignSelf: 'flex-start' }}>
          <View style={{ padding: 10, paddingHorizontal: 14, backgroundColor: t.surface, borderRadius: 14, borderBottomLeftRadius: 4 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 13, color: t.text }}>Namaste 🙏 आपकी profile पढ़ी, family-oriented लगे।</Text>
          </View>
          <Text style={{ marginTop: 3, fontFamily: 'Inter', fontSize: 9.5, color: t.textFaint, marginLeft: 4 }}>2:10 PM</Text>
        </View>

        {/* Outgoing */}
        <View style={{ maxWidth: '78%', alignSelf: 'flex-end' }}>
          <View style={{ padding: 10, paddingHorizontal: 14, backgroundColor: t.primary, borderRadius: 14, borderBottomRightRadius: 4 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 13, color: '#FFF' }}>Namaste 🙏 dhanyavaad. आपकी education profile बहुत impressive है।</Text>
          </View>
          <Text style={{ marginTop: 3, fontFamily: 'Inter', fontSize: 9.5, color: t.textFaint, textAlign: 'right', marginRight: 4 }}>2:12 PM ✓✓</Text>
        </View>

        {/* Incoming */}
        <View style={{ maxWidth: '78%', alignSelf: 'flex-start' }}>
          <View style={{ padding: 10, paddingHorizontal: 14, backgroundColor: t.surface, borderRadius: 14, borderBottomLeftRadius: 4 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 13, color: t.text }}>Family ko bhi profile dikhayi hai, sab ko pasand aayi. Aapke family se baat karwaayein?</Text>
          </View>
          <Text style={{ marginTop: 3, fontFamily: 'Inter', fontSize: 9.5, color: t.textFaint, marginLeft: 4 }}>2:14 PM</Text>
        </View>

        {/* Quick replies */}
        <View style={{ marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {quickReplies.map((q, i) => (
            <Pressable key={i} style={{ paddingVertical: 7, paddingHorizontal: 12, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: 999 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.text }}>{q}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Composer */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 20, backgroundColor: t.surface, borderTopWidth: 1, borderTopColor: t.borderSoft, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' }}>
          <Plus size={16} color={t.textMuted} strokeWidth={1.6} />
        </Pressable>
        <View style={{ flex: 1, height: 42, backgroundColor: t.bg, borderRadius: 21, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TextInput
            placeholder="Message…"
            placeholderTextColor={t.textFaint}
            style={{ flex: 1, fontSize: 13, color: t.text }}
          />
          <View style={{ paddingVertical: 2, paddingHorizontal: 6, backgroundColor: t.borderSoft, borderRadius: 4 }}>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: t.textFaint }}>हिं/En</Text>
          </View>
        </View>
        <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight size={16} color="#FFF" strokeWidth={1.6} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
