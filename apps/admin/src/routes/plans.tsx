import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/plans')({
  component: Plans,
});

const plans = [
  { name: 'Silver', price: 599, dur: '3 months', sales: 412, color: '#94A3B8' },
  { name: 'Gold', price: 1499, dur: '6 months', sales: 1840, color: t.primary, recommended: true },
  { name: 'Platinum', price: 3499, dur: '12 months', sales: 184, color: t.primaryDeep },
];

function Plans() {
  return (
    <AdminShell
      active="plans"
      title="Plans & pricing"
      subtitle="Changes take effect immediately for new purchases"
      actions={<ABtn variant="primary">+ Add plan</ABtn>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ padding: 18, background: t.surface, border: `1.5px solid ${p.recommended ? t.primary : t.borderSoft}`, borderRadius: 10, position: 'relative' }}>
              {p.recommended && (
                <div style={{ position: 'absolute', top: -8, right: 14, padding: '2px 8px', background: t.primary, borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#FFF', fontWeight: 500 }}>RECOMMENDED</div>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500, color: p.color }}>{p.name}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>{p.dur}</span>
              </div>
              <div style={{ marginTop: 10, fontFamily: '"Mukta", sans-serif', fontSize: 28, fontWeight: 500 }}>₹{p.price.toLocaleString()}</div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.borderSoft}`, display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>
                <span style={{ color: t.textMuted }}>Sales mtd</span><span style={{ color: t.text }}>{p.sales}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>
                <span style={{ color: t.textMuted }}>Revenue mtd</span><span style={{ color: t.text }}>₹{(p.price * p.sales / 1000).toFixed(0)}k</span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
                <ABtn variant="secondary" size="sm">Edit</ABtn>
                <ABtn variant="ghost" size="sm">A/B test</ABtn>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Pay-per-contact</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {([['3 contacts', 99, 3], ['10 contacts', 249, 10], ['25 contacts', 499, 25]] as [string, number, number][]).map(([l, p, count], i) => (
              <div key={i} style={{ padding: 12, background: t.bg, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{l}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{Math.floor(p / count)}/contact</div>
                </div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 15, fontWeight: 500, color: t.primary }}>₹{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
