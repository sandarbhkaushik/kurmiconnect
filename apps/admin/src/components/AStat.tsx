import { t } from '@/lib/theme';

interface AStatProps {
  label: string;
  value: string;
  delta?: string;
}

export default function AStat({ label, value, delta }: AStatProps) {
  const positive = delta ? delta.startsWith('+') : false;
  return (
    <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ marginTop: 6, fontFamily: '"Mukta", sans-serif', fontSize: 26, fontWeight: 500, color: t.text }}>{value}</div>
      {delta && (
        <div style={{ marginTop: 4, fontFamily: 'Inter, sans-serif', fontSize: 11, color: positive ? t.success : t.error }}>{delta}</div>
      )}
    </div>
  );
}
