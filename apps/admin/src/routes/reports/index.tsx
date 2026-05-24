import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/reports/')({
  component: Reports,
});

const rows = [
  { id: 'R-2014', target: 'Manoj Kumar', reporter: 'Anjali Sachan', reason: 'Fake photos', sev: 'high', when: '12 mins ago', hue: 100 },
  { id: 'R-2013', target: 'Sanjay Verma', reporter: 'Ritu Mahato', reason: 'Asking for money', sev: 'critical', when: '1 hr ago', hue: 220 },
  { id: 'R-2012', target: 'Ashok Patel', reporter: 'Pooja Verma', reason: 'Inappropriate messages', sev: 'med', when: '3 hrs ago', hue: 40 },
  { id: 'R-2011', target: 'Vinod Singh', reporter: 'Neha Katiyar', reason: 'False income claim', sev: 'med', when: 'Yesterday', hue: 80 },
  { id: 'R-2010', target: 'Anil Kushwaha', reporter: 'Kavita Singh', reason: 'Married already', sev: 'high', when: '2d ago', hue: 160 },
];

function Reports() {
  return (
    <AdminShell
      active="reports"
      title="Reports & flags"
      subtitle="12 open · 2 critical"
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {['All open 12', 'Critical 2', 'High 4', 'Medium 5', 'Low 1', 'Resolved'].map((c, i) => (
            <div key={i} style={{ padding: '6px 11px', borderRadius: 6, background: i === 0 ? t.text : t.surface, color: i === 0 ? '#FFF' : t.text, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 11.5, cursor: 'pointer' }}>{c}</div>
          ))}
        </div>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1.5fr 100px 120px 100px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>Reported</div><div>By</div><div>Reason</div><div>Severity</div><div>When</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1.5fr 100px 120px 100px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={r.target} size={26} hue={r.hue} />
                <span>{r.target}</span>
              </div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.reporter}</div>
              <div>{r.reason}</div>
              <div>
                {r.sev === 'critical' && <APill kind="error">⛔ Critical</APill>}
                {r.sev === 'high' && <APill kind="error">High</APill>}
                {r.sev === 'med' && <APill kind="warn">Medium</APill>}
                {r.sev === 'low' && <APill kind="default">Low</APill>}
              </div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.when}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11, cursor: 'pointer' }}>Investigate →</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
