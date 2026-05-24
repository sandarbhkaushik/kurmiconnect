import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { defaultTheme as t } from '@/lib/theme';
import BiLabel from '@/components/ui/BiLabel';
import Field from '@/components/ui/Field';
import KCButton from '@/components/ui/KCButton';
import TopBar from '@/components/layout/TopBar';

type ToggleOption = [string, string, boolean];
const studyingOptions: ToggleOption[] = [
  ['हाँ', 'Yes', false],
  ['नहीं', 'No', true],
];

export default function EditProfile() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }} edges={['top']}>
      <TopBar
        title="Edit Education"
        leading={
          <Pressable onPress={() => router.back()}>
            <ChevronLeft size={20} color={t.text} strokeWidth={1.6} />
          </Pressable>
        }
        trailing={
          <Pressable>
            <Text style={{ fontSize: 12, color: t.primary, fontWeight: '500' }}>Save</Text>
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 20 }}>
          <View style={{ gap: 14 }}>
            <Field hi="उच्चतम शिक्षा" en="Highest qualification" value="BTech / BE" />
            <Field hi="विशेषज्ञता" en="Specialisation" value="Computer Science" />
            <Field hi="कॉलेज / यूनिवर्सिटी" en="College/University" value="IET Lucknow" />
            <Field hi="पास होने का वर्ष" en="Year of passing" value="2017" />

            <View>
              <BiLabel hi="क्या आगे की पढ़ाई कर रहे हैं?" en="Currently studying further?" size="sm" />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                {studyingOptions.map(([hi, en, sel], i) => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: sel ? t.primarySoft : t.surface,
                      borderWidth: 1.5,
                      borderColor: sel ? t.primary : t.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 13, color: sel ? t.primaryDeep : t.text }}>{hi} · {en}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: t.borderSoft, backgroundColor: t.surface, flexDirection: 'row', gap: 8 }}>
        <KCButton variant="secondary" size="lg" onPress={() => router.back()}>
          Cancel
        </KCButton>
        <View style={{ flex: 1 }}>
          <KCButton variant="primary" size="lg" full>Save changes</KCButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
