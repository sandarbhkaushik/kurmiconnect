import { View } from 'react-native';
import type { ReactNode } from 'react';
import BiLabel from './BiLabel';

interface Props {
  hi: string;
  en?: string;
  action?: ReactNode;
}

export default function SectionHeader({ hi, en, action }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <BiLabel hi={hi} en={en} size="md" />
      {action}
    </View>
  );
}
