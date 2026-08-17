import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import PickerField from '@/components/ui/PickerField';
import Card from '@/components/ui/Card';
import OnboardStep from '@/components/layout/OnboardStep';
import { useGotras, useProfile, useSubCastes, useUpdateCommunity } from '@/hooks/useProfile';
import { communitySchema, type CommunityForm } from '@/lib/schemas/profile';

const gotraOpts: [string, string, boolean][] = [
  ['हाँ', 'Yes', true],
  ['नहीं', 'No', false],
];

export default function Community() {
  const router = useRouter();
  const { data: profile } = useProfile();
  const { data: subCastes = [] } = useSubCastes();
  const { data: gotras = [] } = useGotras();
  const updateCommunity = useUpdateCommunity();

  const {
    control, handleSubmit, reset, setValue, watch,
    formState: { errors },
  } = useForm<CommunityForm>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      sub_caste: '', gotra: '', same_gotra_acceptable: false, mother_tongue: 'Hindi',
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      sub_caste: profile.sub_caste ?? '',
      gotra: profile.gotra ?? '',
      same_gotra_acceptable: profile.same_gotra_acceptable,
      mother_tongue: profile.mother_tongue ?? 'Hindi',
    });
  }, [profile, reset]);

  const subCaste = watch('sub_caste');
  const gotra = watch('gotra');
  const sameGotraAcceptable = watch('same_gotra_acceptable');

  async function onSubmit(data: CommunityForm) {
    await updateCommunity.mutateAsync(data);
    router.push('/(onboard)/location');
  }

  return (
    <OnboardStep
      step={4}
      total={14}
      hi="समुदाय और जाति"
      en="Community & caste"
      ctaHi="आगे"
      ctaEn="Next"
      ctaDisabled={updateCommunity.isPending}
      onNext={handleSubmit(onSubmit)}
    >
      <View style={{ gap: 14 }}>
        <Card padding={14} style={{ backgroundColor: t.surfaceWarm, borderWidth: 0, marginBottom: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Lock size={14} color={t.primary} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: t.text, lineHeight: 18 }}>
                <Text style={{ fontWeight: '500' }}>धर्म: Hindu</Text>
                {' · '}
                <Text style={{ fontWeight: '500' }}>जाति: Kurmi</Text>
              </Text>
              <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 2 }}>
                Pre-set for this community app
              </Text>
            </View>
          </View>
        </Card>

        <PickerField
          hi="उप-जाति" en="Sub-caste"
          value={subCaste || undefined}
          placeholder="चुनें · Select"
          error={errors.sub_caste?.message}
          options={subCastes.map(s => ({ id: s.name_en, label: `${s.name_hi} · ${s.name_en}` }))}
          onSelect={opt => setValue('sub_caste', opt.id)}
          modalTitleHi="उप-जाति चुनें" modalTitleEn="Select sub-caste"
        />

        <PickerField
          hi="गोत्र" en="Gotra"
          value={gotra || undefined}
          placeholder="चुनें · Select"
          help="गोत्र शादी में महत्वपूर्ण है · Important for compatibility"
          error={errors.gotra?.message}
          options={gotras.map(g => ({ id: g.name_en, label: `${g.name_hi} · ${g.name_en}` }))}
          onSelect={opt => setValue('gotra', opt.id)}
          modalTitleHi="गोत्र चुनें" modalTitleEn="Select gotra"
        />

        <View>
          <BiLabel hi="क्या same-gotra match स्वीकार है?" en="Same-gotra match acceptable?" size="sm" />
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            {gotraOpts.map(([hi, en, val]) => (
              <Pressable key={String(val)} onPress={() => setValue('same_gotra_acceptable', val)} style={{
                flex: 1, height: 44, borderRadius: 10,
                backgroundColor: sameGotraAcceptable === val ? t.primarySoft : t.surface,
                borderWidth: 1.5, borderColor: sameGotraAcceptable === val ? t.primary : t.border,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 13, color: sameGotraAcceptable === val ? t.primaryDeep : t.text }}>
                  {hi} · {en}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Controller
          control={control}
          name="mother_tongue"
          render={({ field }) => (
            <Field
              hi="मातृभाषा" en="Mother tongue"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Hindi"
              error={errors.mother_tongue?.message}
            />
          )}
        />

        {updateCommunity.isError ? (
          <Text style={{ fontSize: 12, color: t.error, textAlign: 'center' }}>
            कुछ गलत हो गया, दोबारा कोशिश करें · Something went wrong, please retry
          </Text>
        ) : null}
      </View>
    </OnboardStep>
  );
}
