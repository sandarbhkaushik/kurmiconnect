import { createFileRoute } from '@tanstack/react-router';
import AdminShell from '@/components/AdminShell';
import APill from '@/components/APill';
import ABtn from '@/components/ABtn';
import { t } from '@/lib/theme';

export const Route = createFileRoute('/addons')({
  component: AddOns,
});

const items: [string, number, string, number][] = [
  ['Profile Boost 24h', 99, 'Visibility', 412],
  ['Profile Boost 72h', 249, 'Visibility', 184],
  ['Week Featured', 499, 'Visibility', 42],
  ['Kundli Basic', 199, 'Kundli', 1284],
  ['Kundli Astrologer', 599, 'Kundli', 142],
  ['Full Natal Chart', 999, 'Kundli', 18],
  ['Biodata PDF', 199, 'Biodata', 982],
  ['Designer Biodata', 499, 'Biodata', 84],
  ['Video Intro Slot', 149, 'Premium', 24],
  ['RM 30-min consult', 999, 'Premium', 18],
];

function AddOns() {
  return (
    <AdminShell
      active="addons"
      title="Add-ons"
      subtitle={`${items.length} active products`}
      actions={<ABtn variant="primary">+ Add product</ABtn>}
    >
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 120px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>Product</div><div>Category</div><div>Price</div><div>Sales (mtd)</div><div>Action</div>
          </div>
          {items.map(([n, p, c, s], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 120px', padding: '12px 14px', borderBottom: i < items.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div>{n}</div>
              <div><APill kind="default">{c}</APill></div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontWeight: 500 }}>₹{p}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{s.toLocaleString()}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <ABtn variant="secondary" size="sm">Edit</ABtn>
                <ABtn variant="ghost" size="sm">Pause</ABtn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
