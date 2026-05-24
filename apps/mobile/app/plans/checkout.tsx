import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

type OrderItem = [string, string, { color?: string }?];

const orderItems: OrderItem[] = [
  ['Gold · 6 months', '₹1,499'],
  ['GST (incl)', '₹0'],
  ['Coupon (NAMASTE10)', '–₹150', { color: undefined }],
];

const paymentMethods = [
  { label: 'UPI', sub: 'PhonePe · GPay · Paytm', sel: true },
  { label: 'Cards', sub: 'Visa · Mastercard · Rupay', sel: false },
  { label: 'Net banking', sub: 'All major banks', sel: false },
  { label: 'Cash via Paytm agent', sub: 'Find nearby store', sel: false },
];

export default function Checkout() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Checkout"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Order summary */}
          <View style={{ padding: 16, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 12, marginBottom: 16 }}>
            <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
              Order summary
            </Text>
            {orderItems.map(([l, v, s], i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  borderBottomWidth: i < 2 ? 1 : 0,
                  borderBottomColor: t.borderSoft,
                  borderStyle: 'dashed',
                }}
              >
                <Text style={{ fontSize: 13, color: i === 2 ? t.success : t.text }}>{l}</Text>
                <Text style={{ fontSize: 13, color: i === 2 ? t.success : t.text }}>{v}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: t.text }}>Total</Text>
              <Text style={{ fontSize: 16, fontWeight: '500', color: t.primary }}>₹1,349</Text>
            </View>
          </View>

          {/* Payment method */}
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Payment method
          </Text>
          <View style={{ gap: 8, marginBottom: 16 }}>
            {paymentMethods.map((m, i) => (
              <View
                key={i}
                style={{
                  padding: 14,
                  backgroundColor: t.surface,
                  borderWidth: 1.5,
                  borderColor: m.sel ? t.primary : t.border,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: m.sel ? t.primary : t.border, alignItems: 'center', justifyContent: 'center' }}>
                  {m.sel && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: t.primary }} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, color: t.text }}>{m.label}</Text>
                  <Text style={{ fontSize: 10, color: t.textFaint }}>{m.sub}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={{ fontSize: 10, color: t.textFaint, lineHeight: 16, textAlign: 'center' }}>
            By paying you agree to our Terms and Privacy Policy
          </Text>
        </View>
      </ScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface }}>
        <KCButton variant="primary" size="lg" full onPress={() => router.push('/plans/success')}>
          Pay ₹1,349
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
