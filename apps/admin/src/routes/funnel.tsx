import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import AStat from '@/components/AStat';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/funnel')({
  component: Funnel,
});

type CohortRow = [string, (number | null)[]];

const cohorts: CohortRow[] = [
  ['Mar wk 1', [100, 68, 52, 44, 38, 32, 28, 24]],
  ['Mar wk 2', [100, 72, 58, 48, 42, 36, 30, 27]],
  ['Mar wk 3', [100, 74, 60, 51, 45, 38, 33, 28]],
  ['Mar wk 4', [100, 76, 62, 54, 47, 40, 35, 30]],
  ['Apr wk 1', [100, 78, 64, 56, 50, 42, 38, null]],
  ['Apr wk 2', [100, 76, 64, 58, 52, 44, null, null]],
  ['Apr wk 3', [100, 80, 66, 60, 54, null, null, null]],
  ['Apr wk 4', [100, 82, 68, 62, null, null, null, null]],
  ['May wk 1', [100, 84, 70, null, null, null, null, null]],
  ['May wk 2', [100, 86, null, null, null, null, null, null]],
];

function cellBg(v: number | null): string {
  if (v === null) return 'transparent';
  const ratio = v / 100;
  const r = Math.round(122 + (251 - 122) * (1 - ratio));
  const g = Math.round(46 + (247 - 46) * (1 - ratio));
  const b = Math.round(11 + (240 - 11) * (1 - ratio));
  return `rgb(${r},${g},${b})`;
}

function Funnel() {
  return (
    <AdminShell
      active="funnel"
      title="Funnel & cohorts"
      subtitle="Activation, retention, conversion"
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
          <AStat label="Signup → complete profile" value="62%" delta="+4%" />
          <AStat label="Profile → first interest" value="48%" delta="+2%" />
          <AStat label="Signup → paid (D30)" value="12.8%" delta="+1.2%" />
        </div>

        <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, marginBottom: 18 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Retention cohorts · % active in week N</div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(8, 1fr)', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 10.5 }}>
            <div style={{ color: t.textMuted, padding: '6px 4px' }}>Signup cohort</div>
            {['W0', 'W1', 'W2', 'W3', 'W4', 'W6', 'W8', 'W12'].map(h => (
              <div key={h} style={{ color: t.textMuted, padding: '6px 4px', textAlign: 'center' }}>{h}</div>
            ))}
            {cohorts.map((row, i) => (
              <React.Fragment key={i}>
                <div style={{ color: t.text, padding: '6px 4px' }}>{row[0]}</div>
                {row[1].map((v, j) => (
                  <div key={j} style={{
                    padding: '6px 4px', textAlign: 'center',
                    background: cellBg(v),
                    color: v === null ? t.textFaint : v > 60 ? '#FFF' : t.text,
                    borderRadius: 4,
                    fontFamily: 'ui-monospace, monospace',
                  }}>{v === null ? '—' : v}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
