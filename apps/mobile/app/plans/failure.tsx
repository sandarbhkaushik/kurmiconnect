import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';

export default function PayFailure() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <X size={36} color={t.error} strokeWidth={1.6} />
        </View>
        <View style={{ marginBottom: 8 }}>
          <BiLabel hi="भुगतान विफल" en="Payment failed" size="xl" align="center" />
        </View>
        <Text style={{ fontSize: 13, color: t.textMuted, lineHeight: 20, maxWidth: 280, textAlign: 'center' }}>
          Transaction declined by bank
        </Text>

        <View style={{ marginTop: 24, padding: 12, paddingHorizontal: 16, backgroundColor: t.warnSoft, borderRadius: 10, maxWidth: 320, width: '100%' }}>
          <Text style={{ fontSize: 12, color: t.warn, lineHeight: 20 }}>
            पैसे कटे नहीं हैं · Money not deducted
          </Text>
          <Text style={{ fontSize: 10, color: t.warn, marginTop: 2 }}>
            If deducted, will refund in 3-5 business days
          </Text>
        </View>
      </View>

      <View style={{ padding: 20, backgroundColor: t.surface, borderTopWidth: 1, borderTopColor: t.borderSoft, gap: 8 }}>
        <KCButton variant="primary" size="lg" full onPress={() => router.back()}>
          Try again
        </KCButton>
        <KCButton variant="secondary" size="md" full onPress={() => router.push('/plans/checkout')}>
          Try different payment method
        </KCButton>
        <KCButton variant="ghost" size="md" full onPress={() => router.push('/help')}>
          Contact support
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
