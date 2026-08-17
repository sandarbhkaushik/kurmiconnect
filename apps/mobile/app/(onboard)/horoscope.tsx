import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import Card from '@/components/ui/Card';
import KCButton from '@/components/ui/KCButton';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateHoroscope } from '@/hooks/useProfile';
import { horoscopeSchema, type HoroscopeForm } from '@/lib/schemas/profile';

const kundliOpts: [string, string, boolean][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No', false],
];

// Free-text values, matching what match/service.py's horoscope scorer
// compares against (see EDUCATION_LADDER-style comment there).
const manglikOpts: [string, string, string][] = [
  ['नहीं', 'No', 'no'],
  ['हाँ', 'Yes', 'yes'],
  ['अंशिक', 'Anshik', 'anshik'],
];

export default function Horoscope() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateHoroscope = useUpdateHoroscope();

  const { control, handleSubmit, reset, setValue, watch } = useForm<HoroscopeForm>({
    resolver: zodResolver(horoscopeSchema),
    defaultValues: {
      believes_in_kundli_matching: true, time_of_birth: '', place_of_birth: '',
      manglik_status: 'no', nakshatra: '', rashi: '',
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      believes_in_kundli_matching: profile.believes_in_kundli_matching,
      time_of_birth: profile.time_of_birth ?? '',
      place_of_birth: profile.place_of_birth ?? '',
      manglik_status: profile.manglik_status ?? 'no',
      nakshatra: profile.nakshatra ?? '',
      rashi: profile.rashi ?? '',
    });
  }, [profile, reset]);

  const believesInKundli = watch('believes_in_kundli_matching');
  const manglikStatus = watch('manglik_status');

  async function onSubmit(data: HoroscopeForm) {
    await updateHoroscope.mutateAsync(data);
    router.push('/(onboard)/about');
  }

  return (
    <OnboardStep
      step={11}
      total={14}
      hi="कुंडली"
      en="Horoscope details"
      subtitle="ये match suggestion के लिए use होगी · Used for compatibility matching"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateHoroscope.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <View>
          <BiLabel hi="क्या कुंडली match में विश्वास करते हैं?" en="Believe in Kundli matching?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {kundliOpts.map(([hi, en, val]) => (
              <Pressable key={String(val)} onPress={() => setValue('believes_in_kundli_matching', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: believesInKundli === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: believesInKundli === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: believesInKundli === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Controller
          control={control}
          name="time_of_birth"
          render={({ field }) => (
            <Field
              hi="जन्म समय (HH:MM)" en="Time of birth" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="06:42"
            />
          )}
        />
        <Controller
          control={control}
          name="place_of_birth"
          render={({ field }) => (
            <Field
              hi="जन्म स्थान" en="Place of birth" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Gopalganj, Bihar"
            />
          )}
        />

        <View>
          <BiLabel hi="मांगलिक स्थिति" en="Manglik status" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {manglikOpts.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('manglik_status', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: manglikStatus === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: manglikStatus === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: manglikStatus === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Controller
          control={control}
          name="nakshatra"
          render={({ field }) => (
            <Field
              hi="नक्षत्र" en="Nakshatra" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Rohini"
            />
          )}
        />
        <Controller
          control={control}
          name="rashi"
          render={({ field }) => (
            <Field
              hi="राशि" en="Rashi" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Vrishabha"
            />
          )}
        />

        <Card padding={12} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <Star size={16} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                हम आपकी Kundli generate कर सकते हैं · ₹199
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                Auto-generate Kundli report
              </Text>
            </View>
            <KCButton variant="soft" size="sm">Order</KCButton>
          </View>
        </Card>

        {updateHoroscope.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
