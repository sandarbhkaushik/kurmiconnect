import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';

const receiptItems: [string, string][] = [
  ['Transaction ID', 'TXN8K42P9M'],
  ['Plan', 'Gold · 6 months'],
  ['Amount', '₹1,349'],
  ['Expiry', '15 Sep 2026'],
];

export default function PaySuccess() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: t.successSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Check size={40} color={t.success} strokeWidth={1.6} />
        </View>
        <View style={{ marginBottom: 8 }}>
          <BiLabel hi="भुगतान सफल ✓" en="Payment successful" size="xl" align="center" />
        </View>
        <Text style={{ fontSize: 13, color: t.textMuted, lineHeight: 20, maxWidth: 280, textAlign: 'center' }}>
          Gold membership 6 महीने के लिए activate हो गई है
        </Text>

        <View style={{ marginTop: 28, width: '100%', maxWidth: 320, padding: 16, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12 }}>
          {receiptItems.map(([l, v], i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 }}>
              <Text style={{ fontSize: 12, color: t.textMuted }}>{l}</Text>
              <Text style={{ fontSize: 12, color: t.text, fontWeight: '500' }}>{v}</Text>
            </View>
          ))}
          <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: t.borderSoft, borderStyle: 'dashed' }}>
            <Text style={{ fontSize: 11, color: t.primary, textAlign: 'center' }}>Download invoice</Text>
          </View>
        </View>
      </View>

      <View style={{ padding: 20, backgroundColor: t.surface, borderTopWidth: 1, borderTopColor: t.borderSoft, gap: 8 }}>
        <KCButton variant="primary" size="lg" full onPress={() => router.replace('/(tabs)')}>
          View premium matches
        </KCButton>
        <KCButton variant="ghost" size="md" full>
          Share with family
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
