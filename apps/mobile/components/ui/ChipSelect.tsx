import { View, Text, Pressable } from 'react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from './BiLabel';

/** [hi, en, value] — hi/en are display-only, value is the canonical
 * stored string (consistent with sub_caste storing "Patel" not "पटेल"). */
export type ChipOption<T extends string> = [string, string, T];

interface SingleProps<T extends string | boolean> {
  hi: string;
  en: string;
  opts: [string, string, T][];
  value: T;
  onChange: (v: T) => void;
  wrap?: boolean; // false = flex-fill row (for 2-3 mutually exclusive options)
}

export function ChipSingleSelect<T extends string | boolean>({
  hi, en, opts, value, onChange, wrap = true,
}: SingleProps<T>) {
  return (
    <View>
      <BiLabel hi={hi} en={en} size="sm" />
      <View style={{ flexDirection: 'row', flexWrap: wrap ? 'wrap' : 'nowrap', gap: wrap ? 6 : 8, marginTop: 8 }}>
        {opts.map(([optHi, optEn, val]) => (
          <Pressable key={String(val)} onPress={() => onChange(val)} style={{
            ...(wrap ? {} : { flex: 1 }),
            height: wrap ? undefined : 44,
            paddingVertical: wrap ? 8 : 0, paddingHorizontal: wrap ? 12 : 8,
            borderRadius: wrap ? 999 : 10,
            backgroundColor: value === val ? t.primarySoft : t.surface,
            borderWidth: wrap ? 1 : 1.5, borderColor: value === val ? t.primary : t.border,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontSize: wrap ? 12 : 13, color: value === val ? t.primaryDeep : t.text }}>
              {optHi} · {optEn}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

interface MultiProps<T extends string> {
  hi: string;
  en: string;
  opts: ChipOption<T>[];
  value: T[];
  onToggle: (v: T) => void;
  max?: number;
}

export function ChipMultiSelect<T extends string>({
  hi, en, opts, value, onToggle, max,
}: MultiProps<T>) {
  return (
    <View>
      <BiLabel hi={hi} en={en} size="sm" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
        {opts.map(([optHi, optEn, val]) => {
          const selected = value.includes(val);
          const disabled = !selected && max != null && value.length >= max;
          return (
            <Pressable
              key={val}
              disabled={disabled}
              onPress={() => onToggle(val)}
              style={{
                paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999,
                backgroundColor: selected ? t.primarySoft : t.surface,
                borderWidth: 1, borderColor: selected ? t.primary : t.border,
                opacity: disabled ? 0.4 : 1,
              }}
            >
              <Text style={{ fontSize: 12, color: selected ? t.primaryDeep : t.text }}>
                {optHi} <Text style={{ color: t.textFaint, fontSize: 10 }}>· {optEn}</Text>
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
