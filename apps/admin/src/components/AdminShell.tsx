import React from 'react';
import { t } from '@/lib/theme';
import AdminAvatar from './AdminAvatar';

const ADMIN_NAV = [
  { group: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: '◫' },
  ]},
  { group: 'Members', items: [
    { id: 'users', label: 'All users', icon: '◉', badge: '24.8k' },
    { id: 'user-detail', label: 'Profile detail', icon: '◯' },
    { id: 'verify-queue', label: 'Verification queue', icon: '✓', badge: 47 },
    { id: 'verify-doc', label: 'Document review', icon: '◧' },
    { id: 'reports', label: 'Reports & flags', icon: '⚑', badge: 12 },
    { id: 'report-detail', label: 'Report detail', icon: '⊙' },
    { id: 'blocked', label: 'Blocked', icon: '⊘' },
  ]},
  { group: 'Editorial', items: [
    { id: 'featured', label: 'Featured personalities', icon: '★' },
    { id: 'featured-edit', label: 'Featured editor', icon: '✎' },
    { id: 'content', label: 'Content & banners', icon: '☰' },
  ]},
  { group: 'Commerce', items: [
    { id: 'payments', label: 'Payments', icon: '₹' },
    { id: 'refunds', label: 'Refunds queue', icon: '↺', badge: 5 },
    { id: 'coupons', label: 'Coupons', icon: '%' },
    { id: 'plans', label: 'Plans & pricing', icon: '◆' },
    { id: 'addons', label: 'Add-ons', icon: '◇' },
  ]},
  { group: 'Insight', items: [
    { id: 'analytics', label: 'Match analytics', icon: '⌬' },
    { id: 'funnel', label: 'Funnel & cohorts', icon: '⌭' },
  ]},
  { group: 'Operations', items: [
    { id: 'rm', label: 'RM console', icon: '☏' },
    { id: 'bulk', label: 'Bulk operations', icon: '⇅' },
    { id: 'team', label: 'Team & roles', icon: '◐' },
    { id: 'audit', label: 'Audit log', icon: '◑' },
    { id: 'settings', label: 'App settings', icon: '⚙' },
  ]},
];

interface AdminShellProps {
  active: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminShell({ active, title, subtitle, actions, children }: AdminShellProps) {
  return (
    <div style={{
      minWidth: 1200, minHeight: 780,
      display: 'flex', background: t.bg,
      fontFamily: '"Mukta", Inter, system-ui, sans-serif',
      color: t.text, overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 232, flexShrink: 0,
        background: t.surface, borderRight: `1px solid ${t.borderSoft}`,
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{ padding: '18px 20px 16px', borderBottom: `1px solid ${t.borderSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFF', fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>K</span>
            </div>
            <div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>KurmiConnect</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, letterSpacing: '0.05em' }}>ADMIN · v2.4.1</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px 16px' }}>
          {ADMIN_NAV.map((g, gi) => (
            <div key={gi} style={{ marginTop: gi === 0 ? 4 : 12 }}>
              <div style={{ padding: '6px 12px 4px', fontFamily: 'Inter, sans-serif', fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: t.textFaint, fontWeight: 500 }}>{g.group}</div>
              {g.items.map(it => {
                const isActive = it.id === active;
                return (
                  <div key={it.id} style={{
                    padding: '7px 12px', margin: '1px 0', borderRadius: 7,
                    background: isActive ? t.primarySoft : 'transparent',
                    display: 'flex', alignItems: 'center', gap: 9,
                    fontFamily: '"Mukta", sans-serif', fontSize: 12.5,
                    color: isActive ? t.primaryDeep : t.text,
                    fontWeight: isActive ? 500 : 400,
                    cursor: 'pointer',
                  }}>
                    <div style={{ width: 16, textAlign: 'center', color: isActive ? t.primary : t.textFaint, fontSize: 13 }}>{it.icon}</div>
                    <div style={{ flex: 1 }}>{it.label}</div>
                    {it.badge !== undefined && (
                      <div style={{
                        padding: '1px 6px', borderRadius: 999,
                        background: typeof it.badge === 'number' ? t.primary : t.borderSoft,
                        color: typeof it.badge === 'number' ? '#FFF' : t.textMuted,
                        fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 500,
                      }}>{it.badge}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ padding: 12, borderTop: `1px solid ${t.borderSoft}`, display: 'flex', alignItems: 'center', gap: 9 }}>
          <AdminAvatar name="Aarti" size={28} hue={20} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>Aarti Sharma</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint }}>Editorial admin</div>
          </div>
          <div style={{ color: t.textFaint, fontSize: 14 }}>⏏</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '16px 28px', borderBottom: `1px solid ${t.borderSoft}`, background: t.surface, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500 }}>{title}</div>
            {subtitle && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: t.textMuted, marginTop: 2 }}>{subtitle}</div>}
          </div>
          {actions}
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}
