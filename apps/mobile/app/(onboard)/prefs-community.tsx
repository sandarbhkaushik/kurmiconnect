import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import Field from '@/components/ui/Field';
import { ChipSingleSelect, ChipMultiSelect } from '@/components/ui/ChipSelect';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useSubCastes, useUpdatePreferences } from '@/hooks/useProfile';
import { prefsCommunitySchema, type PrefsCommunityForm } from '@/lib/schemas/profile';

const gotraOpts: [string, string, boolean][] = [
  ['नहीं', 'No', false],
  ['हाँ', 'Yes', true],
];
const otherCasteOpts: [string, string, boolean][] = [
  ['नहीं', 'No', false],
  ['हाँ', 'Yes', true],
];

function splitCsv(value: string): string[] {
  return value.split(',').map(v => v.trim()).filter(Boolean);
}

export default function PrefsCommunity() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const { data: subCastes = [] } = useSubCastes();
  const updatePreferences = useUpdatePreferences();

  const { handleSubmit, reset, setValue, watch } = useForm<PrefsCommunityForm>({
    resolver: zodResolver(prefsCommunitySchema),
    defaultValues: {
      partner_sub_castes: [], partner_same_gotra_acceptable: false,
      partner_other_castes_acceptable: true, partner_states: [], partner_languages: [],
    },
  });

  // Raw text for the two comma-separated fields, kept separate from the
  // form's array fields so typing a trailing "," or " " isn't immediately
  // parsed-and-reformatted away mid-keystroke (a controlled TextInput bound
  // straight to split(',') would eat exactly what the user just typed).
  // Synced into the form's array field onBlur, not on every keystroke.
  const [statesText, setStatesText] = useState('');
  const [languagesText, setLanguagesText] = useState('');

  useEffect(() => {
    if (!profile?.preferences) return;
    const p = profile.preferences;
    reset({
      partner_sub_castes: p.partner_sub_castes,
      partner_same_gotra_acceptable: p.partner_same_gotra_acceptable,
      partner_other_castes_acceptable: p.partner_other_castes_acceptable,
      partner_states: p.partner_states,
      partner_languages: p.partner_languages,
    });
    setStatesText(p.partner_states.join(', '));
    setLanguagesText(p.partner_languages.join(', '));
  }, [profile, reset]);

  const subCasteValues = watch('partner_sub_castes');
  const sameGotra = watch('partner_same_gotra_acceptable');
  const otherCastes = watch('partner_other_castes_acceptable');

  function toggleSubCaste(value: string) {
    setValue(
      'partner_sub_castes',
      subCasteValues.includes(value)
        ? subCasteValues.filter(v => v !== value)
        : [...subCasteValues, value]
    );
  }

  async function onSubmit(data: PrefsCommunityForm) {
    await updatePreferences.mutateAsync({
      ...data,
      partner_states: splitCsv(statesText),
      partner_languages: splitCsv(languagesText),
    });
    router.push('/(onboard)/prefs-career');
  }

  return (
    <OnboardStep
      step={14}
      total={14}
      hi="जीवनसाथी पसंद"
      en="Community preferences"
      ctaHi="आगे"
      ctaEn="Education preferences"
      ctaDisabled={updatePreferences.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 20 }}>
        <ChipMultiSelect
          hi="स्वीकार्य उप-जातियाँ" en="Sub-castes acceptable (blank = all)"
          opts={subCastes.map(s => [s.name_hi, s.name_en, s.name_en] as [string, string, string])}
          value={subCasteValues} onToggle={toggleSubCaste}
        />

        <ChipSingleSelect
          hi="क्या same-gotra चलेगा?" en="Same gotra acceptable?" wrap={false}
          opts={gotraOpts} value={sameGotra} onChange={v => setValue('partner_same_gotra_acceptable', v)}
        />
        <ChipSingleSelect
          hi="अन्य जातियों से OK?" en="Other castes acceptable?" wrap={false}
          opts={otherCasteOpts} value={otherCastes} onChange={v => setValue('partner_other_castes_acceptable', v)}
        />

        {/* Free-text lists (backend stores list[str], no fixed lookup) —
            comma-separated for now rather than a full multi-select builder.
            Local text state, only parsed into an array on submit — see the
            comment above statesText's declaration. */}
        <Field
          hi="राज्य (comma से अलग करें)" en="States preferred"
          value={statesText} onChangeText={setStatesText}
          placeholder="UP, Bihar, MP, Delhi"
        />
        <Field
          hi="भाषाएँ (comma से अलग करें)" en="Languages acceptable"
          value={languagesText} onChangeText={setLanguagesText}
          placeholder="Hindi, Bhojpuri, English"
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
