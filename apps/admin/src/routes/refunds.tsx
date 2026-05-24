import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/refunds')({
  component: Refunds,
});

const rows = [
  { id: 'RF-018', user: 'Ankit Patel', txn: 'TXN8K38D8X', amount: 249, reason: 'Was within 7-day window · plan unused', when: '2h ago', hue: 40 },
  { id: 'RF-017', user: 'Vinod Singh', txn: 'TXN8J94K8L', amount: 1499, reason: 'Duplicate charge — bank confirmed', when: '4h ago', hue: 80 },
  { id: 'RF-016', user: 'Anjali Sachan', txn: 'TXN8J81H2N', amount: 99, reason: 'Boost did not activate', when: 'Yesterday', hue: 60 },
  { id: 'RF-015', user: 'Sneha Singh', txn: 'TXN8J78F1J', amount: 3499, reason: 'Cancelled — service issue with RM', when: 'Yesterday', hue: 320 },
  { id: 'RF-014', user: 'Priya Patel', txn: 'TXN8J60D9B', amount: 199, reason: 'Got married — not needed', when: '2d ago', hue: 20 },
];

function Refunds() {
  return (
    <AdminShell
      active="refunds"
      title="Refunds queue"
      subtitle="5 pending · SLA 3-5 business days"
    >
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1.2fr 160px 90px 2fr 100px 180px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>User</div><div>Original txn</div><div>Amount</div><div>Reason</div><div>When</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1.2fr 160px 90px 2fr 100px 180px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={r.user} size={26} hue={r.hue} />
                <span>{r.user}</span>
              </div>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{r.txn}</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontWeight: 500 }}>₹{r.amount.toLocaleString()}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11.5 }}>{r.reason}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.when}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <ABtn variant="danger" size="sm">Decline</ABtn>
                <ABtn variant="success" size="sm">✓ Approve</ABtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
