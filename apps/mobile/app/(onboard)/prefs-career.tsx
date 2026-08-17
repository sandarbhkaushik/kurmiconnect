import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import Field from '@/components/ui/Field';
import { ChipSingleSelect, ChipMultiSelect } from '@/components/ui/ChipSelect';
import Card from '@/components/ui/Card';
import OnboardStep from '@/components/layout/OnboardStep';
import { useCompleteProfile, useProfile, useUpdatePreferences } from '@/hooks/useProfile';
import { prefsCareerSchema, type PrefsCareerForm } from '@/lib/schemas/profile';

// Free-text values (backend stores list[str], not the ProfessionCategory
// enum) — using the enum's own strings where they map cleanly keeps this
// consistent with match/service.py's substring matching against
// profession_category.value, "Teacher" doesn't map so stays free text.
const professionOpts: [string, string, string][] = [
  ['सरकारी', 'Govt', 'government'],
  ['निजी', 'Private', 'private'],
  ['Doctor/Lawyer', '', 'professional'],
  ['Business', '', 'business'],
  ['Teacher', '', 'teacher'],
];
const workingOpts: [string, string, boolean][] = [
  ['हाँ', 'Yes', true],
  ['कोई बात नहीं', "Doesn't matter", false],
];

export default function PrefsCareer() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updatePreferences = useUpdatePreferences();
  const completeProfile = useCompleteProfile();

  const { handleSubmit, reset, setValue, watch } = useForm<PrefsCareerForm>({
    resolver: zodResolver(prefsCareerSchema),
    defaultValues: {
      partner_min_education: '', partner_professions: [],
      partner_min_income: undefined, partner_want_working_professional: true,
    },
  });

  const [minEducation, setMinEducation] = useState('');
  const [minIncomeText, setMinIncomeText] = useState('');

  useEffect(() => {
    if (!profile?.preferences) return;
    const p = profile.preferences;
    reset({
      partner_min_education: p.partner_min_education ?? '',
      partner_professions: p.partner_professions,
      partner_min_income: p.partner_min_income ?? undefined,
      partner_want_working_professional: p.partner_want_working_professional,
    });
    setMinEducation(p.partner_min_education ?? '');
    setMinIncomeText(p.partner_min_income != null ? String(p.partner_min_income) : '');
  }, [profile, reset]);

  const professions = watch('partner_professions');
  const wantWorking = watch('partner_want_working_professional');

  function toggleProfession(value: string) {
    setValue(
      'partner_professions',
      professions.includes(value) ? professions.filter(v => v !== value) : [...professions, value]
    );
  }

  async function onSubmit(data: PrefsCareerForm) {
    await updatePreferences.mutateAsync({
      ...data,
      partner_min_education: minEducation || null,
      partner_min_income: minIncomeText === '' ? null : Number(minIncomeText),
    });
    await completeProfile.mutateAsync();
    router.replace('/(tabs)');
  }

  const isPending = updatePreferences.isPending || completeProfile.isPending;
  const isError = updatePreferences.isError || completeProfile.isError;

  return (
    <OnboardStep
      step={14}
      total={14}
      hi="शिक्षा और career"
      en="Education & career preferences"
      ctaHi="Review"
      ctaEn="Submit profile"
      ctaDisabled={isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Field
          hi="न्यूनतम शिक्षा" en="Minimum education"
          value={minEducation} onChangeText={setMinEducation}
          placeholder="Graduate"
        />

        <ChipMultiSelect
          hi="स्वीकार्य पेशे" en="Acceptable professions" opts={professionOpts}
          value={professions} onToggle={toggleProfession}
        />

        <Field
          hi="न्यूनतम वार्षिक आय (₹)" en="Minimum income"
          value={minIncomeText} onChangeText={setMinIncomeText}
          placeholder="500000" keyboardType="numeric"
        />

        <ChipSingleSelect
          hi="Working professional चाहिए?" en="Want working professional?" wrap={false}
          opts={workingOpts} value={wantWorking} onChange={v => setValue('partner_want_working_professional', v)}
        />

        <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Shield size={18} color={t.primary} fill={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                Profile submit होने पर 24h में verify किया जाएगा
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                Verified within 24 hours
              </Text>
            </View>
          </View>
        </Card>

        {isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
