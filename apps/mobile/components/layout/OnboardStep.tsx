import { View, Text, ScrollView, Pressable } from 'react-native';
import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { defaultTheme as t } from '@/lib/theme';
import ProgressBar from '@/components/ui/ProgressBar';
import BiLabel from '@/components/ui/BiLabel';
import BottomCTA from '@/components/ui/BottomCTA';

interface Props {
  step: number;
  total: number;
  hi: string;
  en: string;
  subtitle?: string;
  ctaHi?: string;
  ctaEn?: string;
  onNext?: () => void;
  ctaDisabled?: boolean;
  children: ReactNode;
}

export default function OnboardStep({
  step,
  total,
  hi,
  en,
  subtitle,
  ctaHi = 'आगे',
  ctaEn = 'Next',
  onNext,
  ctaDisabled = false,
  children,
}: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 0, flexShrink: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.textMuted} strokeWidth={1.6} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <ProgressBar value={step} max={total} height={3} />
          </View>
          <Text style={{ fontSize: 11, fontWeight: '400', color: t.textFaint }}>
            {step}/{total}
          </Text>
        </View>
        <BiLabel hi={hi} en={en} size="lg" />
        {subtitle ? (
          <Text style={{ fontSize: 12, fontWeight: '400', color: t.textMuted, marginTop: 6 }}>{subtitle}</Text>
        ) : null}
      </View>

      {/* Scrollable body */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      <BottomCTA
        label={`${ctaHi} · ${ctaEn}`}
        onPress={onNext ?? (() => {})}
        disabled={ctaDisabled}
      />
    </SafeAreaView>
  );
}
