import { Pressable, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultTheme as t } from '@/lib/theme';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  note?: ReactNode;
}

export default function BottomCTA({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  note,
}: Props) {
  const insets = useSafeAreaInsets();
  const bg = disabled ? t.borderSoft : variant === 'primary' ? t.primary : t.surface;
  const fg = disabled ? t.textFaint : variant === 'primary' ? '#FFF' : t.text;

  return (
    <View
      style={{
        backgroundColor: t.surface,
        borderTopWidth: 1,
        borderTopColor: t.borderSoft,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16 + insets.bottom,
        gap: note ? 12 : 0,
      }}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => ({
          height: 52,
          borderRadius: 10,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed && !disabled ? 0.88 : 1,
        })}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            letterSpacing: 0.3,
            color: fg,
            fontFamily: 'Mukta_500Medium',
          }}
        >
          {label}
        </Text>
      </Pressable>
      {note}
    </View>
  );
}
