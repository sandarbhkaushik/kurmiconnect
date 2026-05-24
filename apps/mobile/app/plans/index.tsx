import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

const payPerContact = [
  { contacts: 3, price: 99 },
  { contacts: 10, price: 249, popular: true },
  { contacts: 25, price: 499 },
];

const subscriptionPlans = [
  {
    name: 'Silver',
    dur: '3 months',
    price: 599,
    perMonth: 199,
    recommended: false,
    features: ['25 contacts', 'Chat with matches', 'Basic filters'],
  },
  {
    name: 'Gold',
    dur: '6 months',
    price: 1499,
    perMonth: 250,
    recommended: true,
    features: ['Unlimited contacts', '3 profile boosts', 'Advanced filters', 'Priority verification'],
  },
  {
    name: 'Platinum',
    dur: '12 months',
    price: 3499,
    perMonth: 292,
    recommended: false,
    features: ['Everything in Gold', 'Personal RM matchmaker', 'Kundli reports', 'Family verification'],
  },
];

const addOns: [string, number][] = [
  ['24h Boost', 99],
  ['72h Boost', 249],
  ['Kundli Report', 199],
  ['Premium Kundli', 599],
  ['Biodata PDF', 199],
  ['Video intro', 149],
];

export default function Plans() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Plans"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 18, paddingBottom: 0 }}>
          <BiLabel hi="ज़्यादा responses पाएँ" en="Get more responses" size="xl" />
          <Text style={{ marginTop: 6, fontSize: 12, color: t.textMuted }}>
            UPI · 7-day refund · No auto-renewal without consent
          </Text>
        </View>

        {/* Pay per contact */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Pay per contact
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {payPerContact.map((p, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  padding: 14,
                  backgroundColor: t.surface,
                  borderWidth: 1.5,
                  borderColor: p.popular ? t.primary : t.border,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                {p.popular && (
                  <View style={{ position: 'absolute', top: -8, alignSelf: 'center', paddingHorizontal: 8, paddingVertical: 2, backgroundColor: t.primary, borderRadius: 999 }}>
                    <Text style={{ fontSize: 9, color: '#FFF', fontWeight: '500' }}>POPULAR</Text>
                  </View>
                )}
                <Text style={{ fontSize: 22, fontWeight: '500', color: t.text }}>{p.contacts}</Text>
                <Text style={{ fontSize: 10, color: t.textMuted }}>contacts</Text>
                <Text style={{ marginTop: 6, fontSize: 14, color: t.primary, fontWeight: '500' }}>₹{p.price}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subscription plans */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Subscription plans
          </Text>
          <View style={{ gap: 10 }}>
            {subscriptionPlans.map((p, i) => (
              <View
                key={i}
                style={{
                  padding: 14,
                  backgroundColor: p.recommended ? t.surfaceWarm : t.surface,
                  borderWidth: 1.5,
                  borderColor: p.recommended ? t.primary : t.border,
                  borderRadius: 14,
                }}
              >
                {p.recommended && (
                  <View style={{ position: 'absolute', top: -8, right: 14, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: t.primary, borderRadius: 999 }}>
                    <Text style={{ fontSize: 9, color: '#FFF', fontWeight: '500' }}>RECOMMENDED</Text>
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: t.text }}>{p.name}</Text>
                    <Text style={{ fontSize: 11, color: t.textMuted }}>{p.dur}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 22, fontWeight: '500', color: t.primary }}>₹{p.price.toLocaleString()}</Text>
                    <Text style={{ fontSize: 10, color: t.textFaint }}>≈ ₹{p.perMonth}/mo</Text>
                  </View>
                </View>
                <View style={{ marginTop: 12, gap: 4 }}>
                  {p.features.map((f, j) => (
                    <View key={j} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Check size={12} color={t.success} strokeWidth={1.6} />
                      <Text style={{ fontSize: 12, color: t.text }}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Add-ons */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Add-ons
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {addOns.map(([n, p], i) => (
              <View
                key={i}
                style={{
                  width: '48%',
                  padding: 12,
                  backgroundColor: t.surface,
                  borderWidth: 1,
                  borderColor: t.border,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 12, color: t.text }}>{n}</Text>
                <Text style={{ fontSize: 13, color: t.primary, fontWeight: '500' }}>₹{p}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface }}>
        <KCButton variant="primary" size="lg" full onPress={() => router.push('/plans/checkout')}>
          Continue with Gold · ₹1,499
        </KCButton>
      </View>
    </SafeAreaView>
  );
}
