import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Check, Shield } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Badge from '@/components/ui/Badge';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

type VerifyItem = {
  hi: string;
  en: string;
  sub: string;
  status: 'done' | 'pending' | 'todo';
  premium?: boolean;
};

const items: VerifyItem[] = [
  { hi: 'फ़ोन', en: 'Phone', sub: '+91 98765 43210', status: 'done' },
  { hi: 'पहचान', en: 'Aadhaar', sub: 'Identity verification', status: 'pending' },
  { hi: 'शिक्षा', en: 'Education', sub: 'Upload certificate', status: 'todo' },
  { hi: 'नौकरी', en: 'Employer', sub: 'Offer letter / ID card', status: 'todo' },
  { hi: 'आय', en: 'Income', sub: 'Tax return / salary slip', status: 'todo', premium: true },
  { hi: 'फोटो', en: 'Photo', sub: 'Selfie verification', status: 'done' },
];

export default function Verify() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Verification"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          {/* Progress summary */}
          <View style={{ padding: 18, backgroundColor: t.surfaceWarm, borderRadius: 14, marginBottom: 20 }}>
            <BiLabel hi="Verify करें — 5× responses" en="Get 5× more responses" size="md" />
            <View style={{ marginTop: 10, flexDirection: 'row', gap: 8 }}>
              {items.map((it, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 999,
                    backgroundColor: it.status === 'done' ? t.success : it.status === 'pending' ? t.warn : t.borderSoft,
                  }}
                />
              ))}
            </View>
            <Text style={{ marginTop: 8, fontSize: 11, color: t.textMuted }}>2 of 6 complete</Text>
          </View>

          {/* Items list */}
          <View style={{ gap: 8 }}>
            {items.map((it, i) => (
              <View
                key={i}
                style={{
                  padding: 14,
                  backgroundColor: t.surface,
                  borderWidth: 1,
                  borderColor: t.borderSoft,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: it.status === 'done' ? t.successSoft : it.status === 'pending' ? t.warnSoft : t.borderSoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {it.status === 'done'
                    ? <Check size={16} color={t.success} strokeWidth={1.6} />
                    : <Shield size={16} color={it.status === 'pending' ? t.warn : t.textMuted} strokeWidth={1.6} />
                  }
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <BiLabel hi={it.hi} en={it.en} size="sm" />
                    {it.premium && <Badge kind="premium">Premium</Badge>}
                  </View>
                  <Text style={{ fontSize: 11, color: t.textFaint, marginTop: 3 }}>{it.sub}</Text>
                </View>
                {it.status === 'done'
                  ? <Badge kind="success">Verified</Badge>
                  : it.status === 'pending'
                  ? <Badge kind="warn">In review</Badge>
                  : <KCButton variant="soft" size="sm" onPress={() => router.push('/verify/document')}>Verify</KCButton>}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
