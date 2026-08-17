import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateNative } from '@/hooks/useProfile';
import { nativeSchema, type NativeForm } from '@/lib/schemas/profile';

const familyOpts: [string, string, boolean][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No', false],
];

const landOpts: [string, string, NativeForm['owns_land']][] = [
  ['हाँ', 'Yes', 'yes'],
  ['नहीं', 'No', 'no'],
  ['Skip', '', 'skip'],
];

export default function Native() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateNative = useUpdateNative();

  const { control, handleSubmit, reset, setValue, watch } = useForm<NativeForm>({
    resolver: zodResolver(nativeSchema),
    defaultValues: {
      native_state: '', native_district: '', native_village_or_town: '',
      family_still_there: undefined, owns_land: undefined,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      native_state: profile.native_state ?? '',
      native_district: profile.native_district ?? '',
      native_village_or_town: profile.native_village_or_town ?? '',
      family_still_there: profile.family_still_there ?? undefined,
      owns_land: profile.owns_land ?? undefined,
    });
  }, [profile, reset]);

  const familyStillThere = watch('family_still_there');
  const ownsLand = watch('owns_land');

  async function onSubmit(data: NativeForm) {
    await updateNative.mutateAsync(data);
    router.push('/(onboard)/education');
  }

  return (
    <OnboardStep
      step={6}
      total={14}
      hi="मूल निवास"
      en="Native place"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateNative.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="native_state"
          render={({ field }) => (
            <Field
              hi="मूल राज्य" en="Native state" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Bihar"
            />
          )}
        />
        <Controller
          control={control}
          name="native_district"
          render={({ field }) => (
            <Field
              hi="मूल जिला" en="Native district" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Gopalganj"
            />
          )}
        />
        <Controller
          control={control}
          name="native_village_or_town"
          render={({ field }) => (
            <Field
              hi="मूल गाँव/शहर" en="Native village or town" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Hathua"
            />
          )}
        />

        <View>
          <BiLabel hi="क्या आपका परिवार अभी भी वहाँ है?" en="Does your family still live there?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {familyOpts.map(([hi, en, val]) => (
              <Pressable key={String(val)} onPress={() => setValue('family_still_there', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: familyStillThere === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: familyStillThere === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: familyStillThere === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <BiLabel hi="क्या आपके खेत/जमीन वहाँ है?" en="Do you own land/farm there?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {landOpts.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('owns_land', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: ownsLand === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: ownsLand === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: ownsLand === val ? t.primaryDeep : t.text }}>
                  {hi}{en ? ` · ${en}` : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {updateNative.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
