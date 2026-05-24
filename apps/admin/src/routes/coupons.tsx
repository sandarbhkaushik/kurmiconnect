import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/coupons')({
  component: Coupons,
});

const coupons = [
  { code: 'NAMASTE10', disc: '10% off', usage: '412 / 1,000', state: 'live', plan: 'Gold/Platinum' },
  { code: 'KURMI500', disc: '₹500 off', usage: '89 / 200', state: 'live', plan: 'Platinum only' },
  { code: 'SAWAN26', disc: '15% off', usage: '0 / 500', state: 'scheduled', plan: 'All plans' },
  { code: 'AKSHAYA', disc: '20% off', usage: '1,242 / 1,500', state: 'live', plan: 'All plans' },
  { code: 'DIWALI25', disc: '25% off', usage: '0 / 2,000', state: 'draft', plan: 'All plans' },
  { code: 'STUDENT', disc: '₹200 off', usage: '184 / 1,000', state: 'live', plan: 'Silver only' },
];

function Coupons() {
  return (
    <AdminShell
      active="coupons"
      title="Coupons & promotions"
      actions={<ABtn variant="primary">+ Create coupon</ABtn>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {coupons.map((c, i) => (
            <div key={i} style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div className="font-mono" style={{ fontSize: 16, color: t.primary, fontWeight: 500 }}>{c.code}</div>
                {c.state === 'live' && <APill kind="success">● Live</APill>}
                {c.state === 'scheduled' && <APill kind="info">Scheduled</APill>}
                {c.state === 'draft' && <APill kind="default">Draft</APill>}
              </div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 20, fontWeight: 500, color: t.text }}>{c.disc}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 4 }}>{c.plan}</div>
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${t.borderSoft}`, display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>
                <span>Used</span><span style={{ color: t.text }}>{c.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
