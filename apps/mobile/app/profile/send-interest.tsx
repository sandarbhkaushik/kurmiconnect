import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Avatar from '@/components/ui/Avatar';
import KCButton from '@/components/ui/KCButton';

export default function SendInterest() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['bottom']}>
      <View style={{ flex: 1, backgroundColor: 'rgba(28,25,23,0.4)' }}>
        <Pressable style={{ flex: 1 }} onPress={() => router.back()} />
        <View style={{ backgroundColor: t.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 }}>
          {/* Drag handle */}
          <View style={{ width: 40, height: 4, backgroundColor: t.border, borderRadius: 2, alignSelf: 'center', marginBottom: 18 }} />

          {/* Title */}
          <View style={{ marginBottom: 16 }}>
            <BiLabel hi="Priya को interest भेजें?" en="Send interest to Priya?" size="lg" />
          </View>

          {/* Profile preview */}
          <View style={{ flexDirection: 'row', gap: 12, padding: 12, backgroundColor: t.bg, borderRadius: 12, marginBottom: 18 }}>
            <Avatar name="Priya" size={48} hue={20} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Mukta', fontSize: 14, fontWeight: '500', color: t.text }}>Priya Patel · 26</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 11, color: t.textMuted }}>PGT Teacher · Lucknow</Text>
            </View>
          </View>

          {/* Warning */}
          <View style={{ paddingVertical: 10, paddingHorizontal: 12, backgroundColor: t.warnSoft, borderRadius: 8, marginBottom: 14 }}>
            <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.warn, fontWeight: '500' }}>Free interests: 2 of 5 this month</Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: t.warn, marginTop: 2 }}>Upgrade to Gold for unlimited interests</Text>
          </View>

          {/* Message field (locked) */}
          <View style={{ marginBottom: 18 }}>
            <BiLabel hi="संदेश जोड़ें (premium)" en="Add a message (premium)" size="sm" />
            <View style={{ marginTop: 8, padding: 12, height: 70, backgroundColor: t.borderSoft, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Lock size={12} color={t.textFaint} strokeWidth={1.6} />
              <Text style={{ fontFamily: 'Mukta', fontSize: 12, color: t.textFaint }}>Upgrade to add a message</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1 }}>
              <KCButton variant="secondary" size="lg" full onPress={() => router.back()}>Cancel</KCButton>
            </View>
            <View style={{ flex: 1 }}>
              <KCButton variant="primary" size="lg" full onPress={() => router.back()}>Interest भेजें</KCButton>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
