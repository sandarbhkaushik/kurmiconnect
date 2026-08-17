import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateFamily } from '@/hooks/useProfile';
import { familySchema, type FamilyForm } from '@/lib/schemas/profile';

const familyTypeOpts: [string, string, NonNullable<FamilyForm['family_type']>][] = [
  ['संयुक्त', 'Joint', 'joint'],
  ['एकल', 'Nuclear', 'nuclear'],
];

const familyValueOpts: [string, string, NonNullable<FamilyForm['family_values']>][] = [
  ['रूढ़िवादी', 'Orthodox', 'orthodox'],
  ['परंपरागत', 'Traditional', 'traditional'],
  ['मध्यम', 'Moderate', 'moderate'],
  ['उदार', 'Liberal', 'liberal'],
];

export default function Family() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateFamily = useUpdateFamily();

  const { control, handleSubmit, reset, setValue, watch } = useForm<FamilyForm>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      father_name: '', father_occupation: '', mother_name: '', mother_occupation: '',
      brothers_count: 0, brothers_married_count: 0, sisters_count: 0, sisters_married_count: 0,
      family_type: 'joint', family_values: 'traditional',
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      father_name: profile.father_name ?? '',
      father_occupation: profile.father_occupation ?? '',
      mother_name: profile.mother_name ?? '',
      mother_occupation: profile.mother_occupation ?? '',
      brothers_count: profile.brothers_count,
      brothers_married_count: profile.brothers_married_count,
      sisters_count: profile.sisters_count,
      sisters_married_count: profile.sisters_married_count,
      family_type: profile.family_type ?? 'joint',
      family_values: profile.family_values ?? 'traditional',
    });
  }, [profile, reset]);

  const familyType = watch('family_type');
  const familyValues = watch('family_values');

  async function onSubmit(data: FamilyForm) {
    await updateFamily.mutateAsync(data);
    router.push('/(onboard)/horoscope');
  }

  return (
    <OnboardStep
      step={10}
      total={14}
      hi="परिवार की जानकारी"
      en="Family details"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateFamily.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="father_name"
          render={({ field }) => (
            <Field
              hi="पिताजी का नाम" en="Father's name" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Shri Ramesh Patel"
            />
          )}
        />
        <Controller
          control={control}
          name="father_occupation"
          render={({ field }) => (
            <Field
              hi="पिताजी का पेशा" en="Father's occupation" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Farmer"
            />
          )}
        />
        <Controller
          control={control}
          name="mother_name"
          render={({ field }) => (
            <Field
              hi="माताजी का नाम" en="Mother's name" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Smt. Sushila Patel"
            />
          )}
        />
        <Controller
          control={control}
          name="mother_occupation"
          render={({ field }) => (
            <Field
              hi="माताजी का पेशा" en="Mother's occupation" value={field.value ?? ''}
              onChangeText={field.onChange} placeholder="Homemaker"
            />
          )}
        />

        {/* Siblings grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <View style={{ width: '48%' }}>
            <Controller
              control={control}
              name="brothers_count"
              render={({ field }) => (
                <Field
                  hi="भाई" en="Brothers" value={String(field.value)}
                  onChangeText={t => field.onChange(t === '' ? 0 : Number(t))}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Controller
              control={control}
              name="brothers_married_count"
              render={({ field }) => (
                <Field
                  hi="भाई शादीशुदा" en="Married" value={String(field.value)}
                  onChangeText={t => field.onChange(t === '' ? 0 : Number(t))}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Controller
              control={control}
              name="sisters_count"
              render={({ field }) => (
                <Field
                  hi="बहन" en="Sisters" value={String(field.value)}
                  onChangeText={t => field.onChange(t === '' ? 0 : Number(t))}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
          <View style={{ width: '48%' }}>
            <Controller
              control={control}
              name="sisters_married_count"
              render={({ field }) => (
                <Field
                  hi="बहन शादीशुदा" en="Married" value={String(field.value)}
                  onChangeText={t => field.onChange(t === '' ? 0 : Number(t))}
                  keyboardType="numeric"
                />
              )}
            />
          </View>
        </View>

        <View>
          <BiLabel hi="परिवार का प्रकार" en="Family type" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {familyTypeOpts.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('family_type', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: familyType === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: familyType === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: familyType === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <BiLabel hi="परिवार की values" en="Family values" size="sm" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {familyValueOpts.map(([hi, en, val]) => (
              <Pressable key={val} onPress={() => setValue('family_values', val)} style={{
                paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: familyValues === val ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: familyValues === val ? t.primary : t.border,
              }}>
                <Text style={{ fontSize: 12, color: familyValues === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {updateFamily.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
