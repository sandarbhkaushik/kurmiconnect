import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import { ChipSingleSelect, ChipMultiSelect } from '@/components/ui/ChipSelect';
import OnboardStep from '@/components/layout/OnboardStep';
import { useProfile, useUpdateLifestyle } from '@/hooks/useProfile';
import { lifestyleSchema, type LifestyleForm } from '@/lib/schemas/profile';

const dietOpts: [string, string, LifestyleForm['diet']][] = [
  ['शाकाहारी', 'Veg', 'veg'],
  ['अंडा-शाकाहारी', 'Egg', 'egg'],
  ['मांसाहारी', 'Non-veg', 'non_veg'],
  ['जैन', 'Jain', 'jain'],
];
const drinkingOpts: [string, string, LifestyleForm['drinking']][] = [
  ['कभी नहीं', 'Never', 'never'],
  ['कभी-कभी', 'Occasionally', 'occasionally'],
  ['सामाजिक', 'Socially', 'socially'],
];
const smokingOpts: [string, string, LifestyleForm['smoking']][] = [
  ['कभी नहीं', 'Never', 'never'],
  ['कभी-कभी', 'Occasionally', 'occasionally'],
];
// [hi, en] pairs — `en` is the canonical stored value (consistent with
// sub_caste storing "Patel" not "पटेल"), `hi` is display-only.
const HOBBY_OPTS: [string, string, string][] = [
  ['क्रिकेट', 'Cricket', 'Cricket'], ['पढ़ना', 'Reading', 'Reading'],
  ['संगीत', 'Music', 'Music'], ['घूमना', 'Travel', 'Travel'],
  ['फिल्म', 'Movies', 'Movies'], ['फिटनेस', 'Fitness', 'Fitness'],
  ['कुकिंग', 'Cooking', 'Cooking'], ['फोटोग्राफी', 'Photography', 'Photography'],
];
const LANGUAGE_OPTS: [string, string, string][] = [
  ['हिन्दी', 'Hindi', 'Hindi'], ['अंग्रेज़ी', 'English', 'English'],
  ['भोजपुरी', 'Bhojpuri', 'Bhojpuri'], ['मराठी', 'Marathi', 'Marathi'],
  ['गुजराती', 'Gujarati', 'Gujarati'],
];

export default function Lifestyle() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const updateLifestyle = useUpdateLifestyle();

  const { handleSubmit, reset, setValue, watch } = useForm<LifestyleForm>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: { diet: 'veg', drinking: 'never', smoking: 'never', hobbies: [], languages: [] },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      diet: profile.diet ?? 'veg',
      drinking: profile.drinking ?? 'never',
      smoking: profile.smoking ?? 'never',
      hobbies: profile.hobbies,
      languages: profile.languages,
    });
  }, [profile, reset]);

  const diet = watch('diet');
  const drinking = watch('drinking');
  const smoking = watch('smoking');
  const hobbies = watch('hobbies');
  const languages = watch('languages');

  function toggle(field: 'hobbies' | 'languages', current: string[], value: string) {
    setValue(field, current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
  }

  async function onSubmit(data: LifestyleForm) {
    await updateLifestyle.mutateAsync(data);
    router.push('/(onboard)/family');
  }

  return (
    <OnboardStep
      step={9}
      total={14}
      hi="जीवनशैली"
      en="Lifestyle"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateLifestyle.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 18 }}>
        <ChipSingleSelect hi="खान-पान" en="Diet" opts={dietOpts} value={diet} onChange={v => setValue('diet', v)} />
        <ChipSingleSelect hi="शराब" en="Drinking" opts={drinkingOpts} value={drinking} onChange={v => setValue('drinking', v)} />
        <ChipSingleSelect hi="धूम्रपान" en="Smoking" opts={smokingOpts} value={smoking} onChange={v => setValue('smoking', v)} />
        <ChipMultiSelect
          hi="शौक (max 6)" en="Hobbies" opts={HOBBY_OPTS}
          value={hobbies} onToggle={v => toggle('hobbies', hobbies, v)} max={6}
        />
        <ChipMultiSelect
          hi="भाषाएँ" en="Languages" opts={LANGUAGE_OPTS}
          value={languages} onToggle={v => toggle('languages', languages, v)}
        />

        {updateLifestyle.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
