import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import AStat from '@/components/AStat';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/')({
  component: Dashboard,
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

function Dashboard() {
  return (
    <AdminShell
      active="dashboard"
      title="Dashboard"
      subtitle="Today · 23 May 2026"
      actions={<>
        <ABtn variant="secondary">Last 30 days ▾</ABtn>
        <ABtn variant="primary">Export</ABtn>
      </>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          <AStat label="Active users" value="24,812" delta="+8.4% wow" />
          <AStat label="New signups (24h)" value="312" delta="+12% wow" />
          <AStat label="Paid members" value="3,184" delta="+2.1% wow" />
          <AStat label="Revenue (mtd)" value="₹18.4L" delta="+18% wow" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>Signups · last 14 days</div>
              <div style={{ display: 'flex', gap: 12, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>
                <span><span style={{ color: t.primary }}>●</span> Total signups</span>
                <span><span style={{ color: t.success }}>●</span> Verified</span>
              </div>
            </div>
            <BarChart color={t.primary} height={170} data={[
              { label: '10', value: 280 }, { label: '11', value: 312 }, { label: '12', value: 298 }, { label: '13', value: 340 },
              { label: '14', value: 268 }, { label: '15', value: 380 }, { label: '16', value: 412 }, { label: '17', value: 402 },
              { label: '18', value: 368 }, { label: '19', value: 430 }, { label: '20', value: 450 }, { label: '21', value: 412 },
              { label: '22', value: 478 }, { label: '23', value: 312 },
            ]} />
          </div>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Top states</div>
            {([
              ['Uttar Pradesh', 8214, 100],
              ['Bihar', 5410, 66],
              ['Madhya Pradesh', 3120, 38],
              ['Maharashtra', 2014, 24],
              ['Chhattisgarh', 1240, 15],
              ['Delhi NCR', 980, 12],
            ] as [string, number, number][]).map(([s, n, w], i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 3 }}>
                  <span style={{ color: t.text }}>{s}</span><span>{n.toLocaleString()}</span>
                </div>
                <div style={{ height: 4, background: t.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${w}%`, height: '100%', background: t.primary }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { label: 'Awaiting Aadhaar review', count: 47, color: t.warn },
            { label: 'Awaiting education docs', count: 18, color: t.warn },
            { label: 'Flagged profiles', count: 12, color: t.error },
            { label: 'Refunds pending', count: 5, color: t.error },
            { label: 'Featured nominations', count: 9, color: t.primary },
            { label: 'New support tickets', count: 23, color: t.info },
          ].map((q, i) => (
            <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: q.color + '15', color: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>{q.count}</div>
              <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text }}>{q.label}</div>
              <div style={{ color: t.textFaint }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
