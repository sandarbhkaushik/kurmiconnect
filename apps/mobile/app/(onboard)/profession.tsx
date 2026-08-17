import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateProfession } from '@/hooks/useProfile';
import { professionSchema, type ProfessionForm } from '@/lib/schemas/profile';

const cats: [string, string, ProfessionForm['profession_category']][] = [
  ['सरकारी नौकरी', 'Government', 'government'],
  ['निजी नौकरी', 'Private', 'private'],
  ['व्यापार', 'Business', 'business'],
  ['खेती', 'Agriculture', 'agriculture'],
  ['Professional', 'Doctor/Lawyer', 'professional'],
  ['छात्र', 'Student', 'student'],
];

export default function Profession() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateProfession = useUpdateProfession();

  const { control, handleSubmit, reset, setValue, watch } = useForm<ProfessionForm>({
    resolver: zodResolver(professionSchema),
    defaultValues: {
      profession_category: 'private', specific_role: '', designation: '',
      company: '', work_location: '', annual_income: undefined,
      income_verify_requested: false,
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      profession_category: profile.profession_category ?? 'private',
      specific_role: profile.specific_role ?? '',
      designation: profile.designation ?? '',
      company: profile.company ?? '',
      work_location: profile.work_location ?? '',
      annual_income: profile.annual_income ?? undefined,
      income_verify_requested: profile.income_verify_requested,
    });
  }, [profile, reset]);

  const category = watch('profession_category');
  const incomeVerify = watch('income_verify_requested');

  async function onSubmit(data: ProfessionForm) {
    await updateProfession.mutateAsync(data);
    router.push('/(onboard)/lifestyle');
  }

  return (
    <OnboardStep
      step={8}
      total={14}
      hi="पेशा"
      en="Profession"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateProfession.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ marginBottom: 18 }}>
        <BiLabel hi="पेशा श्रेणी" en="Profession category" size="sm" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {cats.map(([hi, en, val]) => (
            <Pressable key={val} onPress={() => setValue('profession_category', val)} style={{
              width: '48%',
              paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10,
              backgroundColor: category === val ? t.primarySoft : t.surface,
              borderWidth: 1.5, borderColor: category === val ? t.primary : t.border,
            }}>
              <Text style={{ fontSize: 13, color: category === val ? t.primaryDeep : t.text, fontWeight: '500' }}>
                {hi}
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint }}>{en}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="specific_role"
          render={({ field }) => (
            <Field
              hi="विशिष्ट पद" en="Specific role" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Software Engineer"
            />
          )}
        />
        <Controller
          control={control}
          name="designation"
          render={({ field }) => (
            <Field
              hi="पद" en="Designation" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Senior Engineer"
            />
          )}
        />
        <Controller
          control={control}
          name="company"
          render={({ field }) => (
            <Field
              hi="कंपनी" en="Company" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Infosys"
            />
          )}
        />
        <Controller
          control={control}
          name="work_location"
          render={({ field }) => (
            <Field
              hi="कार्य स्थान" en="Work location" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Bengaluru, KA"
            />
          )}
        />
        <Controller
          control={control}
          name="annual_income"
          render={({ field }) => (
            <Field
              hi="वार्षिक आय (₹)" en="Annual income"
              value={field.value != null ? String(field.value) : ''}
              onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
              placeholder="1000000" keyboardType="numeric"
            />
          )}
        />

        {/* Income verify toggle */}
        <Pressable
          onPress={() => setValue('income_verify_requested', !incomeVerify)}
          style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            paddingVertical: 14, paddingHorizontal: 16,
            backgroundColor: t.surfaceWarm, borderRadius: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 13, color: t.text }}>Income verify करवाएँगे?</Text>
            <Text style={{ fontSize: 10, color: t.textFaint }}>Get a verified badge</Text>
          </View>
          <View style={{
            width: 40, height: 24, borderRadius: 999,
            backgroundColor: incomeVerify ? t.primary : t.borderSoft,
          }}>
            <View style={{
              position: 'absolute', top: 2, left: incomeVerify ? 18 : 2,
              width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF',
            }} />
          </View>
        </Pressable>

        {updateProfession.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
