import { useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Card from '@/components/ui/Card';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateAbout } from '@/hooks/useProfile';
import { aboutSchema, type AboutForm } from '@/lib/schemas/profile';

export default function About() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateAbout = useUpdateAbout();

  const { control, handleSubmit, reset, watch } = useForm<AboutForm>({
    resolver: zodResolver(aboutSchema),
    defaultValues: { about_me: '', partner_expectation_summary: '', photo_visibility: 'all' },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      about_me: profile.about_me ?? '',
      partner_expectation_summary: profile.partner_expectation_summary ?? '',
      photo_visibility: profile.photo_visibility,
    });
  }, [profile, reset]);

  const aboutMe = watch('about_me') ?? '';

  async function onSubmit(data: AboutForm) {
    await updateAbout.mutateAsync(data);
    // photos.tsx is deferred until R2 is set up (Session 10) — goes
    // straight to prefs-basic for now. Once photos.tsx is wired, change
    // this target to '/(onboard)/photos' and have photos.tsx forward here.
    router.push('/(onboard)/prefs-basic');
  }

  return (
    <OnboardStep
      step={12}
      total={14}
      hi="अपने बारे में"
      en="About me"
      subtitle="4-5 लाइन में लिखें · Write 4-5 lines"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateAbout.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        {/* Bio textarea */}
        <View>
          <Controller
            control={control}
            name="about_me"
            render={({ field }) => (
              <TextInput
                multiline
                numberOfLines={4}
                value={field.value ?? ''}
                onChangeText={field.onChange}
                maxLength={500}
                placeholder="मैं Lucknow में एक software engineer हूँ..."
                placeholderTextColor={t.textFaint}
                style={{
                  padding: 16, minHeight: 160,
                  backgroundColor: t.surface,
                  borderWidth: 1.5, borderColor: t.primary,
                  borderRadius: 12,
                  fontSize: 14, color: t.text,
                  lineHeight: 22,
                  textAlignVertical: 'top',
                }}
              />
            )}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={{ fontSize: 11, color: t.textFaint }}>हिंदी / English keyboard</Text>
            <Text style={{ fontSize: 11, color: t.textFaint }}>{aboutMe.length} / 500</Text>
          </View>
        </View>

        {/* AI draft suggestion — decorative, not functional */}
        <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Star size={18} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: t.text }}>मेरे लिए draft करें</Text>
              <Text style={{ fontSize: 10, color: t.textFaint }}>AI suggestion · Coming soon</Text>
            </View>
          </View>
        </Card>

        {/* Partner expectation */}
        <View>
          <BiLabel hi="अपेक्षा" en="Partner expectation summary (optional)" size="sm" />
          <Controller
            control={control}
            name="partner_expectation_summary"
            render={({ field }) => (
              <TextInput
                multiline
                numberOfLines={3}
                value={field.value ?? ''}
                onChangeText={field.onChange}
                maxLength={500}
                placeholder={'जैसे: "मुझे एक समझदार partner चाहिए..."'}
                placeholderTextColor={t.textFaint}
                style={{
                  marginTop: 8, padding: 14, minHeight: 80,
                  backgroundColor: t.surface,
                  borderWidth: 1, borderColor: t.border,
                  borderRadius: 10,
                  fontSize: 13, color: t.text,
                  textAlignVertical: 'top',
                }}
              />
            )}
          />
        </View>

        {updateAbout.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
