import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateBasics } from '@/hooks/useProfile';
import { basicsSchema, type BasicsForm } from '@/lib/schemas/profile';

const genderOptions: [string, string, BasicsForm['gender']][] = [
  ['पुरुष', 'Male', 'male'],
  ['स्त्री', 'Female', 'female'],
];

const maritalOptions: [string, string, BasicsForm['marital_status']][] = [
  ['कभी विवाहित नहीं', 'Never married', 'never_married'],
  ['तलाकशुदा', 'Divorced', 'divorced'],
  ['विधवा/विधुर', 'Widowed', 'widowed'],
  ['तलाक प्रक्रिया में', 'Awaiting divorce', 'awaiting_divorce'],
];

export default function Basic() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateBasics = useUpdateBasics();

  const {
    control, handleSubmit, reset, setValue, watch,
    formState: { errors },
  } = useForm<BasicsForm>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      first_name: '', middle_name: '', last_name: '',
      gender: 'male', date_of_birth: '', marital_status: 'never_married',
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      first_name: profile.first_name ?? '',
      middle_name: profile.middle_name ?? '',
      last_name: profile.last_name ?? '',
      gender: profile.gender ?? 'male',
      date_of_birth: profile.date_of_birth ?? '',
      marital_status: profile.marital_status ?? 'never_married',
    });
  }, [profile, reset]);

  const gender = watch('gender');
  const maritalStatus = watch('marital_status');

  async function onSubmit(data: BasicsForm) {
    await updateBasics.mutateAsync(data);
    router.push('/(onboard)/physical');
  }

  return (
    <OnboardStep
      step={2}
      total={14}
      hi="मूलभूत जानकारी"
      en="Basic info"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateBasics.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <Field
              hi="पहला नाम" en="First name *"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Rajesh"
              error={errors.first_name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="middle_name"
          render={({ field }) => (
            <Field
              hi="मध्य नाम" en="Middle name"
              value={field.value ?? ''}
              onChangeText={field.onChange}
              placeholder="Optional"
            />
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field }) => (
            <Field
              hi="अंतिम नाम" en="Last name *"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Patel"
              help="Auto-suggest from Kurmi surnames"
              error={errors.last_name?.message}
            />
          )}
        />

        <View>
          <BiLabel hi="लिंग" en="Gender" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {genderOptions.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('gender', val)} style={{
                flex: 1, height: 48, borderRadius: 10,
                backgroundColor: gender === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: gender === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 14, color: gender === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Controller
          control={control}
          name="date_of_birth"
          render={({ field }) => (
            <Field
              hi="जन्म तिथि" en="Date of birth (YYYY-MM-DD)"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="1995-08-14"
              error={errors.date_of_birth?.message}
            />
          )}
        />

        <View>
          <BiLabel hi="वैवाहिक स्थिति" en="Marital status" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {maritalOptions.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('marital_status', val)} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: maritalStatus === val ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: maritalStatus === val ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: maritalStatus === val ? t.primaryDeep : t.text }}>
                  {hi}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {updateBasics.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
