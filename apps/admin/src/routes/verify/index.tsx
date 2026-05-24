import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/verify/')({
  component: VerifyQueue,
});

const queue = [
  { id: 'V-4821', user: 'Rajesh Patel', kind: 'Aadhaar', when: '2 mins ago', state: 'priority', hue: 200 },
  { id: 'V-4820', user: 'Manoj Kumar', kind: 'Education', when: '8 mins ago', state: 'new', hue: 100 },
  { id: 'V-4819', user: 'Sneha Singh', kind: 'Employer', when: '12 mins ago', state: 'new', hue: 320 },
  { id: 'V-4818', user: 'Vikram Verma', kind: 'Income', when: '24 mins ago', state: 'new', hue: 220 },
  { id: 'V-4817', user: 'Anjali Sachan', kind: 'Aadhaar', when: '1 hr ago', state: 'review', hue: 60 },
  { id: 'V-4816', user: 'Pooja Verma', kind: 'Education', when: '2 hrs ago', state: 'review', hue: 340 },
  { id: 'V-4815', user: 'Ankit Patel', kind: 'Aadhaar', when: '3 hrs ago', state: 'new', hue: 40 },
];

function VerifyQueue() {
  return (
    <AdminShell
      active="verify-queue"
      title="Verification queue"
      subtitle="47 items · Avg resolve 2h 14m"
      actions={<>
        <ABtn variant="secondary">My queue (8)</ABtn>
        <ABtn variant="primary">Take next</ABtn>
      </>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          {([
            ['Aadhaar', 18, t.primary],
            ['Education', 14, t.info],
            ['Employer', 9, t.success],
            ['Income', 6, t.warn],
          ] as [string, number, string][]).map(([l, n, c], i) => (
            <div key={i} style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: c + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c, fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>{n}</div>
              <div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, fontWeight: 500 }}>{l}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted }}>pending</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {['All 47', 'Aadhaar 18', 'Education 14', 'Employer 9', 'Income 6'].map((c, i) => (
            <div key={i} style={{ padding: '6px 11px', borderRadius: 6, background: i === 0 ? t.text : t.surface, color: i === 0 ? '#FFF' : t.text, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 11.5, cursor: 'pointer' }}>{c}</div>
          ))}
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 140px 100px 120px 120px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>User</div><div>Type</div><div>State</div><div>Submitted</div><div>Action</div>
          </div>
          {queue.map((q, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 140px 100px 120px 120px', padding: '12px 14px', borderBottom: i < queue.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{q.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={q.user} size={26} hue={q.hue} />
                <span>{q.user}</span>
              </div>
              <div>{q.kind}</div>
              <div>
                {q.state === 'new' && <APill kind="info">New</APill>}
                {q.state === 'review' && <APill kind="warn">In review</APill>}
                {q.state === 'priority' && <APill kind="primary">⚡ Priority</APill>}
              </div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{q.when}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <ABtn variant="success" size="sm">Approve</ABtn>
                <ABtn variant="ghost" size="sm">Review</ABtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
