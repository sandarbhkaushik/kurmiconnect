import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import AStat from '@/components/AStat';
import AdminAvatar from '@/components/AdminAvatar';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/payments')({
  component: Payments,
});

const rows = [
  { id: 'TXN8K42P9M', user: 'Rajesh Patel', plan: 'Gold · 6 mo', amount: 1349, method: 'UPI · PhonePe', when: '23 May, 10:14', state: 'success', hue: 200 },
  { id: 'TXN8K41J3R', user: 'Anjali Sachan', plan: 'Silver · 3 mo', amount: 599, method: 'UPI · GPay', when: '23 May, 09:42', state: 'success', hue: 60 },
  { id: 'TXN8K40H2V', user: 'Manoj Kumar', plan: 'Boost 24h', amount: 99, method: 'Card · HDFC', when: '23 May, 08:18', state: 'failed', hue: 100 },
  { id: 'TXN8K39F1Z', user: 'Pooja Verma', plan: 'Platinum · 12 mo', amount: 3499, method: 'Net banking · SBI', when: '22 May, 22:30', state: 'success', hue: 340 },
  { id: 'TXN8K38D8X', user: 'Ankit Patel', plan: '10 contacts', amount: 249, method: 'UPI · Paytm', when: '22 May, 18:48', state: 'refund', hue: 40 },
  { id: 'TXN8K37C2L', user: 'Ritu Mahato', plan: 'Kundli Report', amount: 199, method: 'UPI · BHIM', when: '22 May, 16:14', state: 'success', hue: 280 },
];

function Payments() {
  return (
    <AdminShell
      active="payments"
      title="Payments"
      subtitle="₹18.4L MTD · 1,284 transactions today"
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          <AStat label="Revenue today" value="₹3.84L" delta="+12% dod" />
          <AStat label="Successful" value="1,184" delta="+8%" />
          <AStat label="Failed" value="42" delta="–2.1%" />
          <AStat label="Refunds (mtd)" value="₹62k" />
        </div>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1.2fr 1.2fr 90px 1.2fr 120px 100px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>Txn ID</div><div>User</div><div>Plan</div><div>Amount</div><div>Method</div><div>When</div><div>State</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1.2fr 1.2fr 90px 1.2fr 120px 100px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div className="font-mono" style={{ fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AdminAvatar name={r.user} size={26} hue={r.hue} />
                <span>{r.user}</span>
              </div>
              <div>{r.plan}</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontWeight: 500 }}>₹{r.amount.toLocaleString()}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.method}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.when}</div>
              <div>
                {r.state === 'success' && <APill kind="success">✓ Paid</APill>}
                {r.state === 'failed' && <APill kind="error">Failed</APill>}
                {r.state === 'refund' && <APill kind="warn">Refunded</APill>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
