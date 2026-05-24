import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';

const otpDigits = ['9', '8', '4', '2', '', ''];

export default function OTP() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <Pressable onPress={() => router.back()}>
          <ChevronLeft color={t.textMuted} size={22} strokeWidth={1.6} />
        </Pressable>

        <View style={{ marginTop: 28, marginBottom: 28 }}>
          <BiLabel hi="OTP डालें" en="Enter OTP" size="xl" />
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 13, color: t.textMuted }}>
              +91 98765 43210 पर भेजा गया
            </Text>
            <Edit2 size={13} color={t.primary} strokeWidth={1.6} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'space-between', marginBottom: 24 }}>
          {otpDigits.map((d, i) => (
            <View key={i} style={{
              flex: 1, height: 56, maxWidth: 50,
              backgroundColor: t.surface,
              borderWidth: 1.5,
              borderColor: i === 4 ? t.primary : (d ? t.text : t.border),
              borderRadius: 10, alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontWeight: '500', fontSize: 24, color: t.text }}>{d}</Text>
            </View>
          ))}
        </View>

        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text style={{ fontSize: 13, color: t.textFaint }}>
            0:18 में दोबारा भेजें · Resend in 0:18
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <KCButton variant="secondary" size="md" full>
            OTP दोबारा भेजें · Resend OTP (SMS)
          </KCButton>
          <KCButton variant="secondary" size="md" full>
            WhatsApp पर भेजें
          </KCButton>
          <KCButton variant="ghost" size="md" full>
            Voice call OTP
          </KCButton>
        </View>
      </ScrollView>

      <View style={{ padding: 24, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface }}>
        <KCButton variant="primary" size="lg" full onPress={() => router.push('/(onboard)/for-whom')}>
          Verify और आगे बढ़ें
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
