import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

const usageItems: [string, string][] = [
  ['Contacts', '14 of unlimited'],
  ['Boosts', '1 of 3'],
  ['Verifications', '2 of unlimited'],
];

type Order = [string, string, string, string];
const orders: Order[] = [
  ['Gold · 6 months', '₹1,349', '14 May 2026', 'Paid'],
  ['Profile boost 24h', '₹99', '2 May 2026', 'Paid'],
  ['Silver · 3 months', '₹599', '10 Mar 2026', 'Refunded'],
];

export default function MySubscription() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="My subscription"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Active plan card — solid color instead of gradient */}
          <View style={{ padding: 18, backgroundColor: t.primaryDeep, borderRadius: 14, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text style={{ fontSize: 10, color: '#FFF', opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase' }}>Active</Text>
                <Text style={{ fontSize: 24, fontWeight: '500', color: '#FFF', marginTop: 2 }}>Gold</Text>
              </View>
              <Star size={22} color="#FFF" strokeWidth={1.6} fill="#FFF" />
            </View>
            <View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <View>
                <Text style={{ fontSize: 10, color: '#FFF', opacity: 0.7 }}>Expires</Text>
                <Text style={{ fontSize: 14, color: '#FFF', marginTop: 2 }}>15 Sep 2026</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 10, color: '#FFF', opacity: 0.7 }}>Remaining</Text>
                <Text style={{ fontSize: 14, color: '#FFF', marginTop: 2 }}>42 days</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
            <View style={{ flex: 1 }}>
              <KCButton variant="primary" size="md" full>Renew now</KCButton>
            </View>
            <KCButton variant="secondary" size="md">Upgrade</KCButton>
          </View>

          {/* Usage */}
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Usage
          </Text>
          <View style={{ gap: 8, marginBottom: 24 }}>
            {usageItems.map(([l, v], i) => (
              <View key={i} style={{ padding: 12, paddingHorizontal: 14, backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: t.text }}>{l}</Text>
                <Text style={{ fontSize: 12, color: t.textMuted }}>{v}</Text>
              </View>
            ))}
          </View>

          {/* Order history */}
          <Text style={{ fontSize: 11, color: t.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Order history
          </Text>
          <View style={{ backgroundColor: t.surface, borderWidth: 1, borderColor: t.borderSoft, borderRadius: 10 }}>
            {orders.map(([n, p, d, st], i) => (
              <View key={i} style={{ padding: 12, borderBottomWidth: i < orders.length - 1 ? 1 : 0, borderBottomColor: t.borderSoft }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 13, color: t.text }}>{n}</Text>
                  <Text style={{ fontSize: 13, color: t.text }}>{p}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                  <Text style={{ fontSize: 10, color: t.textFaint }}>{d}</Text>
                  <Text style={{ fontSize: 10, color: st === 'Refunded' ? t.textFaint : t.success }}>{st} · Invoice</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
