import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import AStat from '@/components/AStat';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/analytics')({
  component: Analytics,
});

interface BarData { label: string; value: number }

function BarChart({ data, color, height = 140 }: { data: BarData[]; color: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: '100%', maxWidth: 28, height: `${(d.value / max) * (height - 24)}px`, background: color, borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: t.textFaint }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

const funnelSteps = [
  { label: 'Profile views', value: 248124, pct: 100 },
  { label: 'Profile detail opened', value: 142840, pct: 57.6 },
  { label: 'Interest sent', value: 48124, pct: 19.4 },
  { label: 'Interest accepted', value: 14840, pct: 6.0 },
  { label: 'First message exchanged', value: 11212, pct: 4.5 },
  { label: 'Chat continued (1 wk+)', value: 6840, pct: 2.8 },
];

const subcastes: [string, number][] = [
  ['Patel', 32], ['Sachan', 18], ['Verma', 14], ['Katiyar', 10],
  ['Singh', 8], ['Kushwaha', 7], ['Maurya', 6], ['Mahato', 5],
];

function Analytics() {
  return (
    <AdminShell
      active="analytics"
      title="Match analytics"
      subtitle="How matches form & convert"
      actions={<ABtn variant="secondary">Last 30 days ▾</ABtn>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          <AStat label="Interests sent" value="48,124" delta="+18%" />
          <AStat label="Interests accepted" value="14,840" delta="+8% · 31% rate" />
          <AStat label="Chats opened" value="11,212" delta="+12%" />
          <AStat label="Marriages reported" value="84" delta="last 6 mo" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 18 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Acceptance funnel · last 30 days</div>
            {funnelSteps.map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: t.text }}>{s.label}</span>
                  <span style={{ color: t.textMuted }}>{s.value.toLocaleString()} · {s.pct}%</span>
                </div>
                <div style={{ height: 16, background: t.borderSoft, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: t.primary }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Most active sub-castes</div>
            {subcastes.map(([n, p], i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 3 }}>
                  <span style={{ color: t.text }}>{n}</span><span>{p}%</span>
                </div>
                <div style={{ height: 4, background: t.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${p * 3.125}%`, height: '100%', background: t.primary }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Daily interest activity · last 14d</div>
          <BarChart color={t.primary} height={180} data={[
            { label: '10', value: 1480 }, { label: '11', value: 1320 }, { label: '12', value: 1690 }, { label: '13', value: 2010 },
            { label: '14', value: 1820 }, { label: '15', value: 2480 }, { label: '16', value: 2640 }, { label: '17', value: 2780 },
            { label: '18', value: 2280 }, { label: '19', value: 2680 }, { label: '20', value: 2980 }, { label: '21', value: 3140 },
            { label: '22', value: 3360 }, { label: '23', value: 1840 },
          ]} />
        </div>
      </div>
    </AdminShell>
  );
}
