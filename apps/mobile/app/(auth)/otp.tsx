import { useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Edit2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import KCButton from '@/components/ui/KCButton';
import BottomCTA from '@/components/ui/BottomCTA';

export default function OTP() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputs = useRef<TextInput[]>([]);
  const allFilled = digits.every(d => d !== '');

  function handleChange(val: string, idx: number) {
    const d = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = d;
    setDigits(next);
    if (d && idx < 5) inputs.current[idx + 1]?.focus();
  }

  function handleKeyPress(e: { nativeEvent: { key: string } }, idx: number) {
    if (e.nativeEvent.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top', 'left', 'right']}>
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
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={el => { if (el) inputs.current[i] = el; }}
              value={d}
              onChangeText={val => handleChange(val, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              style={{
                flex: 1, height: 56, maxWidth: 50,
                backgroundColor: t.surface,
                borderWidth: 1.5,
                borderColor: d ? t.primary : t.border,
                borderRadius: 10, textAlign: 'center',
                fontWeight: '500', fontSize: 24, color: t.text,
              }}
            />
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

      <BottomCTA
        label="Verify और आगे बढ़ें"
        disabled={!allFilled}
        onPress={() => router.push('/(onboard)/for-whom')}
      />
    </SafeAreaView>
  );
}
