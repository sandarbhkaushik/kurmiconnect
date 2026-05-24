import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Plus, ChevronRight, Edit2 } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import Avatar from '@/components/ui/Avatar';
import KCButton from '@/components/ui/KCButton';

type Section = [string, string, boolean];

const sections: Section[] = [
  ['Basic info', "Rajesh Patel · 28 · 5'8\"", true],
  ['Physical', 'Average · Wheatish', true],
  ['Community', 'Kurmi · Patel · Kashyap', true],
  ['Location', 'Lucknow, UP', true],
  ['Native', 'Gopalganj, Bihar', true],
  ['Education', 'BTech · IET Lucknow', true],
  ['Profession', 'Software Engineer · Infosys', true],
  ['Lifestyle', 'Veg · Never drinks', true],
  ['Family', 'Joint · 2 brothers, 1 sister', true],
  ['Horoscope', 'Rohini · Vrishabha', true],
  ['About me', '241 chars · Saved', true],
  ['Photos', '3 of 6 uploaded', false],
  ['Partner preferences', '22-28 · Patel/Sachan', true],
];

const stats: [string, string][] = [
  ['124', 'Views'],
  ['23', 'Interests'],
  ['8', 'Shortlisted'],
];

export default function MyProfile() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header card */}
        <View style={{ backgroundColor: t.surface, padding: 20, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: t.borderSoft }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View>
              <Avatar name="Rajesh" size={68} hue={200} ring />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: t.text }}>Rajesh Patel</Text>
                <Pressable onPress={() => router.push('/edit/profile')}>
                  <Edit2 size={13} color={t.primary} strokeWidth={1.6} />
                </Pressable>
              </View>
              <Text style={{ fontSize: 11, color: t.primary, marginTop: 2 }}>Profile 78% complete</Text>
            </View>
          </View>

          {/* Stats row */}
          <View style={{ marginTop: 16, flexDirection: 'row' }}>
            {stats.map(([n, l], i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center', paddingVertical: 4, borderLeftWidth: i > 0 ? 1 : 0, borderLeftColor: t.borderSoft }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: t.text }}>{n}</Text>
                <Text style={{ fontSize: 10, color: t.textFaint, marginTop: 1 }}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sections */}
        <View style={{ backgroundColor: t.surface, marginTop: 8 }}>
          {sections.map(([n, v, complete], i) => (
            <Pressable
              key={i}
              onPress={() => router.push('/edit/profile')}
              style={{ padding: 14, paddingHorizontal: 20, borderBottomWidth: i < sections.length - 1 ? 1 : 0, borderBottomColor: t.borderSoft, flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: complete ? t.successSoft : t.borderSoft, alignItems: 'center', justifyContent: 'center' }}>
                {complete
                  ? <Check size={12} color={t.success} strokeWidth={1.6} />
                  : <Plus size={10} color={t.textMuted} strokeWidth={1.6} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, color: t.text }}>{n}</Text>
                <Text style={{ fontSize: 10, color: t.textFaint }}>{v}</Text>
              </View>
              <ChevronRight size={14} color={t.textFaint} strokeWidth={1.6} />
            </Pressable>
          ))}
        </View>

        <View style={{ padding: 20, flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <KCButton variant="secondary" size="md" full>Preview public</KCButton>
          </View>
          <View style={{ flex: 1 }}>
            <KCButton variant="primary" size="md" full onPress={() => router.push('/verify')}>
              Verify now
            </KCButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
