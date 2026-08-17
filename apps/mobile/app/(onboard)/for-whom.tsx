import { View, Text, Pressable } from 'react-native';
import { User, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { isAxiosError } from 'axios';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import OnboardStep from '@/components/layout/OnboardStep';
import { useState } from 'react';
import api from '@/lib/api';
import { getString, STORAGE_KEYS } from '@/lib/storage';
import { getOrCreatePassword } from '@/lib/auth-storage';
import { useAuth } from '@/hooks/useAuth';

const OPTIONS = [
  { hi: 'अपने लिए', en: 'Myself', value: 'self' },
  { hi: 'बेटे के लिए', en: 'My son', value: 'son' },
  { hi: 'बेटी के लिए', en: 'My daughter', value: 'daughter' },
  { hi: 'भाई के लिए', en: 'My brother', value: 'brother' },
  { hi: 'बहन के लिए', en: 'My sister', value: 'sister' },
  { hi: 'रिश्तेदार', en: 'Relative', value: 'relative' },
] as const;

export default function ForWhom() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleNext() {
    if (submitting) return;

    const phone = getString(STORAGE_KEYS.PHONE);
    if (!phone) {
      // Shouldn't happen in the normal flow — phone.tsx always sets this
      // before OTP. Bail back rather than call the API with no phone.
      router.replace('/(auth)/phone');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const password = getOrCreatePassword();
      const profileFor = OPTIONS[selected].value;

      try {
        await api.post('/auth/register', { phone, password, profile_for: profileFor });
      } catch (err) {
        // 409 = already registered (e.g. user backed out and retried) —
        // fine, just log in below. Anything else is a real failure.
        if (!isAxiosError(err) || err.response?.status !== 409) throw err;
      }

      const loginRes = await api.post('/auth/login', { phone, password });
      const { access_token, user } = loginRes.data;
      useAuth.getState().login(access_token, user.id);

      try {
        await api.post('/profiles');
      } catch (err) {
        // 409 = profile already exists (retry case) — fine, PATCH sections
        // will just update it. Anything else is a real failure.
        if (!isAxiosError(err) || err.response?.status !== 409) throw err;
      }

      router.push('/(onboard)/basic');
    } catch {
      setError('कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <OnboardStep
      step={1}
      total={14}
      hi="यह profile किसके लिए है?"
      en="Whose profile is this?"
      subtitle="हम accordingly आपको दिखाएँगे · We'll personalize accordingly"
      ctaHi={submitting ? '...' : 'आगे'}
      ctaEn={submitting ? '' : 'Next'}
      ctaDisabled={submitting}
      onNext={handleNext}
    >
      <View style={{ gap: 10 }}>
        {OPTIONS.map((o, i) => (
          <Pressable key={i} onPress={() => setSelected(i)} style={{
            height: 64, paddingHorizontal: 18,
            backgroundColor: t.surface,
            borderWidth: 1.5, borderColor: selected === i ? t.primary : t.border,
            borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 14,
          }}>
            <View style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: selected === i ? t.primarySoft : t.borderSoft,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <User size={18} color={selected === i ? t.primary : t.textMuted} strokeWidth={1.6} />
            </View>
            <View style={{ flex: 1 }}>
              <BiLabel hi={o.hi} en={o.en} size="sm" />
            </View>
            {selected === i && <Check color={t.primary} size={18} strokeWidth={1.6} />}
          </Pressable>
        ))}
      </View>
      {error ? (
        <Text style={{ fontSize: 12, color: t.error, marginTop: 14, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
    </OnboardStep>
  );
}
