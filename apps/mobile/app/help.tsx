import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import TopBar from '@/components/layout/TopBar';

type ContactOption = { hi: string; en: string; tone: string };

const contacts: ContactOption[] = [
  { hi: 'WhatsApp', en: '+91 98XXX XXXXX', tone: '#25D366' },
  { hi: 'Call', en: '10am – 8pm', tone: t.primary },
  { hi: 'Email', en: 'help@kurmi.in', tone: t.info },
  { hi: 'Live chat', en: 'avg reply 4 min', tone: t.accent },
];

const faqs = [
  'मेरी profile कब verify होगी?',
  'Refund कैसे मिलेगा?',
  'Photo कैसे बदलें?',
  'Family member को कैसे add करें?',
  'मेरा membership कब expire होगा?',
];

export default function Help() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Help & support"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Contact options grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {contacts.map((c, i) => (
              <Pressable
                key={i}
                style={{
                  width: '48%',
                  padding: 14,
                  backgroundColor: t.surface,
                  borderWidth: 1,
                  borderColor: t.borderSoft,
                  borderRadius: 12,
                }}
              >
                <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: c.tone, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Phone size={14} color="#FFF" strokeWidth={1.6} />
                </View>
                <Text style={{ fontSize: 13, color: t.text, fontWeight: '500' }}>{c.hi}</Text>
                <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>{c.en}</Text>
              </Pressable>
            ))}
          </View>

          {/* FAQs */}
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Top questions
          </Text>
          <View style={{ backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, overflow: 'hidden' }}>
            {faqs.map((q, i) => (
              <Pressable
                key={i}
                style={{
                  padding: 14,
                  paddingHorizontal: 16,
                  borderBottomWidth: i < faqs.length - 1 ? 1 : 0,
                  borderBottomColor: t.borderSoft,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 13, color: t.text }}>{q}</Text>
                <ChevronRight size={14} color={t.textFaint} strokeWidth={1.6} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
