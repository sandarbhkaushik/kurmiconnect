import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateEducation } from '@/hooks/useProfile';
import { educationSchema, type EducationForm } from '@/lib/schemas/profile';

const studyingOpts: [string, string, boolean][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No', false],
];

export default function Education() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateEducation = useUpdateEducation();

  const {
    control, handleSubmit, reset, setValue, watch,
    formState: { errors },
  } = useForm<EducationForm>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      highest_qualification: '', specialisation: '', college_university: '',
      year_of_passing: undefined, currently_studying: false,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      highest_qualification: profile.highest_qualification ?? '',
      specialisation: profile.specialisation ?? '',
      college_university: profile.college_university ?? '',
      year_of_passing: profile.year_of_passing ?? undefined,
      currently_studying: profile.currently_studying,
    });
  }, [profile, reset]);

  const currentlyStudying = watch('currently_studying');

  async function onSubmit(data: EducationForm) {
    await updateEducation.mutateAsync(data);
    router.push('/(onboard)/profession');
  }

  return (
    <OnboardStep
      step={7}
      total={14}
      hi="शिक्षा"
      en="Education"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateEducation.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="highest_qualification"
          render={({ field }) => (
            <Field
              hi="उच्चतम शिक्षा" en="Highest qualification" value={field.value}
              onChangeText={field.onChange} placeholder="BTech / BE"
              error={errors.highest_qualification?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="specialisation"
          render={({ field }) => (
            <Field
              hi="विशेषज्ञता" en="Specialisation" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Computer Science"
            />
          )}
        />
        <Controller
          control={control}
          name="college_university"
          render={({ field }) => (
            <Field
              hi="कॉलेज / यूनिवर्सिटी" en="College/University" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="IET Lucknow"
            />
          )}
        />
        <Controller
          control={control}
          name="year_of_passing"
          render={({ field }) => (
            <Field
              hi="पास होने का वर्ष" en="Year of passing"
              value={field.value != null ? String(field.value) : ''}
              onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
              placeholder="2017" keyboardType="numeric"
            />
          )}
        />

        <View>
          <BiLabel hi="क्या आगे की पढ़ाई कर रहे हैं?" en="Currently studying further?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {studyingOpts.map(([hi, en, val]) => (
              <Pressable key={String(val)} onPress={() => setValue('currently_studying', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: currentlyStudying === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: currentlyStudying === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: currentlyStudying === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {updateEducation.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
