import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdatePhysical } from '@/hooks/useProfile';
import { physicalSchema, type PhysicalForm } from '@/lib/schemas/profile';

const bodyTypes: [string, string, PhysicalForm['body_type']][] = [
  ['पतला', 'Slim', 'slim'],
  ['औसत', 'Average', 'average'],
  ['मोटा', 'Heavy', 'heavy'],
  ['Athletic', '', 'athletic'],
];

const complexions: [string, string, PhysicalForm['complexion']][] = [
  ['गोरा', 'Fair', 'fair'],
  ['गेहुआ', 'Wheatish', 'wheatish'],
  ['सांवला', 'Dark', 'dark'],
];

const challengeOpts: [string, string, boolean][] = [
  ['नहीं', 'None', false],
  ['हाँ', 'Yes', true],
];

export default function Physical() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updatePhysical = useUpdatePhysical();

  const {
    control, handleSubmit, reset, setValue, watch,
    formState: { errors },
  } = useForm<PhysicalForm>({
    resolver: zodResolver(physicalSchema),
    defaultValues: {
      height_cm: 170, weight_kg: undefined,
      body_type: 'average', complexion: 'wheatish', has_physical_challenge: false,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      height_cm: profile.height_cm ?? 170,
      weight_kg: profile.weight_kg ?? undefined,
      body_type: profile.body_type ?? 'average',
      complexion: profile.complexion ?? 'wheatish',
      has_physical_challenge: profile.has_physical_challenge,
    });
  }, [profile, reset]);

  const bodyType = watch('body_type');
  const complexion = watch('complexion');
  const hasChallenge = watch('has_physical_challenge');

  async function onSubmit(data: PhysicalForm) {
    await updatePhysical.mutateAsync(data);
    router.push('/(onboard)/community');
  }

  return (
    <OnboardStep
      step={3}
      total={14}
      hi="शारीरिक जानकारी"
      en="Physical attributes"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updatePhysical.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 20 }}>
        <Controller
          control={control}
          name="height_cm"
          render={({ field }) => (
            <Field
              hi="कद (cm)" en="Height in cm"
              value={field.value ? String(field.value) : ''}
              onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
              placeholder="173"
              keyboardType="numeric"
              error={errors.height_cm?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="weight_kg"
          render={({ field }) => (
            <Field
              hi="वजन (optional, kg)" en="Weight in kg"
              value={field.value != null ? String(field.value) : ''}
              onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
              placeholder="72"
              keyboardType="numeric"
              error={errors.weight_kg?.message}
            />
          )}
        />

        {/* Body type */}
        <View>
          <BiLabel hi="शारीरिक बनावट" en="Body type" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {bodyTypes.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('body_type', val)} style={{
                paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999,
                backgroundColor: bodyType === val ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: bodyType === val ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 13, color: bodyType === val ? t.primaryDeep : t.text }}>
                  {hi}{en ? <Text style={{ color: t.textFaint, fontSize: 11 }}> · {en}</Text> : null}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Complexion */}
        <View>
          <BiLabel hi="रंग" en="Complexion" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {complexions.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('complexion', val)} style={{
                paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999,
                backgroundColor: complexion === val ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: complexion === val ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 13, color: complexion === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Physical challenge */}
        <View>
          <BiLabel hi="कोई शारीरिक चुनौती?" en="Any physical challenge?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {challengeOpts.map(([hi, en, val]) => (
              <Pressable key={String(val)} onPress={() => setValue('has_physical_challenge', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: hasChallenge === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: hasChallenge === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: hasChallenge === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {updatePhysical.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
