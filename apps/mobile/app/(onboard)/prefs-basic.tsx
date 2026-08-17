import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import Field from '@/components/ui/Field';
import { ChipSingleSelect, ChipMultiSelect } from '@/components/ui/ChipSelect';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdatePreferences } from '@/hooks/useProfile';
import { prefsBasicSchema, type PrefsBasicForm } from '@/lib/schemas/profile';

const maritalOpts: [string, string, string][] = [
  ['कभी विवाहित नहीं', 'Never married', 'never_married'],
  ['तलाकशुदा', 'Divorced', 'divorced'],
  ['विधवा/विधुर', 'Widowed', 'widowed'],
  ['तलाक प्रक्रिया में', 'Awaiting divorce', 'awaiting_divorce'],
];
const manglikOpts: [string, string, PrefsBasicForm['partner_manglik']][] = [
  ['नहीं only', 'No only', 'no_only'],
  ['कोई बात नहीं', "Doesn't matter", 'doesnt_matter'],
  ['अंशिक OK', 'Anshik ok', 'anshik_ok'],
];
const dietOpts: [string, string, string][] = [
  ['शाकाहारी', 'Veg', 'veg'],
  ['अंडा', 'Egg', 'egg'],
  ['मांसाहारी', 'Non-veg', 'non_veg'],
  ['जैन', 'Jain', 'jain'],
];

export default function PrefsBasic() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updatePreferences = useUpdatePreferences();

  const { control, handleSubmit, reset, setValue, watch } = useForm<PrefsBasicForm>({
    resolver: zodResolver(prefsBasicSchema),
    defaultValues: {
      partner_age_min: undefined, partner_age_max: undefined,
      partner_height_min: undefined, partner_height_max: undefined,
      partner_marital_status: [], partner_manglik: 'doesnt_matter', partner_diet: [],
    },
  });

  useEffect(() => {
    if (!profile?.preferences) return;
    const p = profile.preferences;
    reset({
      partner_age_min: p.partner_age_min ?? undefined,
      partner_age_max: p.partner_age_max ?? undefined,
      partner_height_min: p.partner_height_min ?? undefined,
      partner_height_max: p.partner_height_max ?? undefined,
      partner_marital_status: p.partner_marital_status,
      partner_manglik: p.partner_manglik,
      partner_diet: p.partner_diet,
    });
  }, [profile, reset]);

  const maritalStatus = watch('partner_marital_status');
  const manglik = watch('partner_manglik');
  const diet = watch('partner_diet');

  function toggle(field: 'partner_marital_status' | 'partner_diet', current: string[], value: string) {
    setValue(field, current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  }

  async function onSubmit(data: PrefsBasicForm) {
    await updatePreferences.mutateAsync(data);
    router.push('/(onboard)/prefs-community');
  }

  return (
    <OnboardStep
      step={14}
      total={14}
      hi="जीवनसाथी पसंद"
      en="Partner preferences · Basic"
      ctaHi="आगे"
      ctaEn="Community preferences"
      ctaDisabled={updatePreferences.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              name="partner_age_min"
              render={({ field }) => (
                <Field
                  hi="उम्र से" en="Age min"
                  value={field.value != null ? String(field.value) : ''}
                  onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
                  placeholder="22" keyboardType="numeric"
                />
              )}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              name="partner_age_max"
              render={({ field }) => (
                <Field
                  hi="उम्र तक" en="Age max"
                  value={field.value != null ? String(field.value) : ''}
                  onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
                  placeholder="28" keyboardType="numeric"
                />
              )}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              name="partner_height_min"
              render={({ field }) => (
                <Field
                  hi="कद से (cm)" en="Height min"
                  value={field.value != null ? String(field.value) : ''}
                  onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
                  placeholder="157" keyboardType="numeric"
                />
              )}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              name="partner_height_max"
              render={({ field }) => (
                <Field
                  hi="कद तक (cm)" en="Height max"
                  value={field.value != null ? String(field.value) : ''}
                  onChangeText={t => field.onChange(t === '' ? undefined : Number(t))}
                  placeholder="173" keyboardType="numeric"
                />
              )}
            />
          </View>
        </View>

        <ChipMultiSelect
          hi="वैवाहिक स्थिति" en="Marital status" opts={maritalOpts}
          value={maritalStatus} onToggle={v => toggle('partner_marital_status', maritalStatus, v)}
        />
        <ChipSingleSelect
          hi="मांगलिक" en="Manglik acceptable?" opts={manglikOpts}
          value={manglik} onChange={v => setValue('partner_manglik', v)}
        />
        <ChipMultiSelect
          hi="खान-पान" en="Diet preferred" opts={dietOpts}
          value={diet} onToggle={v => toggle('partner_diet', diet, v)}
        />

        {updatePreferences.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
