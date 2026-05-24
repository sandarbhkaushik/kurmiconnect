import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Trash2 } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

export default function DeleteAccount() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Delete account"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 24 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Trash2 size={28} color={t.error} strokeWidth={1.6} />
          </View>

          <View style={{ marginBottom: 12 }}>
            <BiLabel hi="क्या आप sure हैं?" en="Are you sure?" size="xl" />
          </View>

          <Text style={{ fontSize: 13, color: t.textMuted, lineHeight: 22, marginBottom: 20 }}>
            {'Account delete होने पर:\n\n• आपकी profile हमेशा के लिए हट जाएगी\n• Sent और received interests delete हो जाएँगे\n• Chats और matches archive में नहीं रहेंगे\n• Active subscription का refund नहीं मिलेगा'}
          </Text>

          {/* Pause alternative */}
          <View style={{ padding: 14, backgroundColor: t.warnSoft, borderRadius: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 12, color: t.warn, fontWeight: '500' }}>क्या pause करना चाहेंगे?</Text>
            <Text style={{ fontSize: 11, color: t.warn, marginTop: 3, marginBottom: 8 }}>
              Take a break instead — हम आपकी profile को hide कर देंगे
            </Text>
            <KCButton variant="soft" size="sm">Pause for 30 days</KCButton>
          </View>

          {/* Reason */}
          <BiLabel hi="कारण बताएँ" en="Reason (optional)" size="sm" />
          <View
            style={{
              marginTop: 8,
              padding: 14,
              height: 80,
              backgroundColor: t.surface,
              borderWidth: 1,
              borderColor: t.border,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 12, color: t.textFaint }}>
              आपके feedback से हमें सुधार करने में मदद मिलेगी...
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface, flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1 }}>
          <KCButton variant="secondary" size="lg" full onPress={() => router.back()}>
            Cancel
          </KCButton>
        </View>
        <View style={{ flex: 1 }}>
          <KCButton variant="danger" size="lg" full>
            Delete forever
          </KCButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
