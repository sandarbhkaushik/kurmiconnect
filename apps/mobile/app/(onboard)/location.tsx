import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateLocation } from '@/hooks/useProfile';
import { locationSchema, type LocationForm } from '@/lib/schemas/profile';

const nativeOpts: [string, string, boolean][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No', false],
];

export default function Location() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateLocation = useUpdateLocation();

  const {
    control, handleSubmit, reset, setValue, watch,
    formState: { errors },
  } = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: 'India', state: '', district: '', city: '',
      residing_since: undefined, is_native_place: false,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      country: profile.country || 'India',
      state: profile.state ?? '',
      district: profile.district ?? '',
      city: profile.city ?? '',
      residing_since: profile.residing_since ?? undefined,
      is_native_place: profile.is_native_place,
    });
  }, [profile, reset]);

  const isNativePlace = watch('is_native_place');

  async function onSubmit(data: LocationForm) {
    await updateLocation.mutateAsync(data);
    router.push('/(onboard)/native');
  }

  return (
    <OnboardStep
      step={5}
      total={14}
      hi="वर्तमान निवास"
      en="Current location"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateLocation.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Field hi="देश" en="Country" value={field.value} onChangeText={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <Field
              hi="राज्य" en="State" value={field.value} onChangeText={field.onChange}
              placeholder="Uttar Pradesh" error={errors.state?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="district"
          render={({ field }) => (
            <Field
              hi="जिला" en="District" value={field.value} onChangeText={field.onChange}
              placeholder="Lucknow" error={errors.district?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Field
              hi="शहर" en="City" value={field.value} onChangeText={field.onChange}
              placeholder="Lucknow" error={errors.city?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="residing_since"
          render={({ field }) => (
            <Field
              hi="कब से यहाँ रह रहे हैं?" en="Residing since"
              value={field.value != null ? String(field.value) : ''}
              onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
              placeholder="2018" keyboardType="numeric"
            />
          )}
        />

        <View>
          <BiLabel hi="क्या ये आपका मूल निवास है?" en="Is this your native place?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {nativeOpts.map(([hi, en, val]) => (
              <Pressable key={String(val)} onPress={() => setValue('is_native_place', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: isNativePlace === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: isNativePlace === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: isNativePlace === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {updateLocation.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
