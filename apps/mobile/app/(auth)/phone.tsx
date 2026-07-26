import { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import BottomCTA from '@/components/ui/BottomCTA';

export default function Phone() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const isValid = /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
  const canContinue = isValid && agreed;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <Pressable onPress={() => router.back()}>
          <ChevronLeft color={t.textMuted} size={22} strokeWidth={1.6} />
        </Pressable>

        <View style={{ marginTop: 28, marginBottom: 28 }}>
          <BiLabel hi="अपना मोबाइल नंबर डालें" en="Enter your mobile number" size="xl" />
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 13, color: t.textMuted, lineHeight: 20 }}>
              OTP WhatsApp या SMS पर आएगा
            </Text>
            <Text style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>
              OTP will arrive on WhatsApp or SMS
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          <View style={{
            height: 56, width: 84, paddingHorizontal: 12,
            backgroundColor: t.borderSoft, borderWidth: 1, borderColor: t.border,
            borderRadius: 10, alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 16, color: t.text }}>+91</Text>
          </View>
          <View style={{
            flex: 1, height: 56, paddingHorizontal: 16,
            backgroundColor: t.surface, borderWidth: 1.5, borderColor: t.primary,
            borderRadius: 10, justifyContent: 'center',
          }}>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="98765 43210"
              placeholderTextColor={t.textFaint}
              keyboardType="phone-pad"
              maxLength={11}
              style={{ fontSize: 20, color: t.text, letterSpacing: 1 }}
            />
          </View>
        </View>

        <Pressable onPress={() => setAgreed(v => !v)} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginTop: 20 }}>
          <View style={{
            width: 18, height: 18, borderRadius: 4,
            borderWidth: 1.5, borderColor: agreed ? t.primary : t.border,
            backgroundColor: agreed ? t.primary : 'transparent',
            alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 1,
          }}>
            {agreed && <Check size={12} color="#FFF" strokeWidth={1.6} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, color: t.textMuted, lineHeight: 20 }}>
              {'मैं '}
              <Text style={{ color: t.primary }}>Terms</Text>
              {' और '}
              <Text style={{ color: t.primary }}>Privacy Policy</Text>
              {' से सहमत हूँ'}
            </Text>
            <Text style={{ fontSize: 11, color: t.textFaint, marginTop: 2 }}>
              I agree to Terms and Privacy
            </Text>
          </View>
        </Pressable>
      </ScrollView>

      <BottomCTA
        label="OTP भेजें · Send OTP"
        disabled={!canContinue}
        onPress={() => router.push('/(auth)/otp')}
        note={
          <Text style={{ fontSize: 13, color: t.textMuted }}>
            {'पहले से account है? '}
            <Text style={{ color: t.primary }}>Login</Text>
          </Text>
        }
      />
    </SafeAreaView>
  );
}
