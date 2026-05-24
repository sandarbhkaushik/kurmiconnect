// admin-screens.jsx — 24 admin screens
// Desktop 1200×780 layout with shared AdminShell sidebar.

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

const ADMIN_THEME = {
  bg: '#FAF8F4',
  surface: '#FFFFFF',
  border: '#E8E2D6',
  borderSoft: '#F0EAD9',
  text: '#1C1917',
  textMuted: '#6B5E52',
  textFaint: '#9D8E7F',
  primary: '#B7531A',
  primarySoft: '#F8E7D2',
  primaryDeep: '#7A2E0B',
  success: '#15803D',
  successSoft: '#DCFCE7',
  warn: '#A16207',
  warnSoft: '#FEF3C7',
  error: '#B91C1C',
  errorSoft: '#FEE2E2',
  info: '#1E40AF',
  infoSoft: '#DBEAFE',
};

function AdminShell({ active, title, subtitle, actions, children, theme }) {
  const t = theme || ADMIN_THEME;
  return (
    <div style={{
      width: 1200, height: 780,
      display: 'flex', background: t.bg,
      fontFamily: '"Mukta", Inter, system-ui, sans-serif',
      color: t.text, overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div style={{
        width: 232, flexShrink: 0,
        background: t.surface, borderRight: `1px solid ${t.borderSoft}`,
        display: 'flex', flexDirection: 'column',
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
                  }}>
                    <div style={{ width: 16, textAlign: 'center', color: isActive ? t.primary : t.textFaint, fontSize: 13 }}>{it.icon}</div>
                    <div style={{ flex: 1 }}>{it.label}</div>
                    {it.badge && (
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
          <Avatar name="Admin" size={28} hue={20} theme={t}/>
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

// Reusable admin atoms
function AStat({ label, value, delta, theme }) {
  const t = theme || ADMIN_THEME;
  const positive = delta && delta.startsWith('+');
  return (
    <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ marginTop: 6, fontFamily: '"Mukta", sans-serif', fontSize: 26, fontWeight: 500, color: t.text }}>{value}</div>
      {delta && (
        <div style={{ marginTop: 4, fontFamily: 'Inter, sans-serif', fontSize: 11, color: positive ? t.success : t.error }}>{delta}</div>
      )}
    </div>
  );
}

function ABtn({ children, variant = 'primary', size = 'sm', theme }) {
  const t = theme || ADMIN_THEME;
  const v = {
    primary: { bg: t.primary, fg: '#FFF', border: 'transparent' },
    secondary: { bg: t.surface, fg: t.text, border: t.border },
    ghost: { bg: 'transparent', fg: t.text, border: 'transparent' },
    danger: { bg: t.errorSoft, fg: t.error, border: 'transparent' },
    success: { bg: t.successSoft, fg: t.success, border: 'transparent' },
  }[variant];
  const s = { sm: { h: 30, fs: 12, px: 12 }, md: { h: 36, fs: 13, px: 16 } }[size];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: s.h, padding: `0 ${s.px}px`,
      background: v.bg, color: v.fg, border: `1px solid ${v.border}`,
      borderRadius: 7, fontFamily: '"Mukta", sans-serif', fontSize: s.fs, fontWeight: 500,
      whiteSpace: 'nowrap', cursor: 'pointer',
    }}>{children}</div>
  );
}

function APill({ children, kind = 'default', theme }) {
  const t = theme || ADMIN_THEME;
  const k = {
    default: { bg: t.borderSoft, fg: t.textMuted },
    success: { bg: t.successSoft, fg: t.success },
    warn: { bg: t.warnSoft, fg: t.warn },
    error: { bg: t.errorSoft, fg: t.error },
    info: { bg: t.infoSoft, fg: t.info },
    primary: { bg: t.primarySoft, fg: t.primaryDeep },
  }[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 7px', borderRadius: 4,
      background: k.bg, color: k.fg,
      fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500,
      whiteSpace: 'nowrap', letterSpacing: '0.01em',
    }}>{children}</span>
  );
}

// Tiny sparkline path (data 0-1)
function Sparkline({ data, color, width = 200, height = 36 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - ((d - min) / range) * (height - 4) - 2}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BarChart({ data, color, height = 140 }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: '100%', maxWidth: 28, height: `${(d.value / max) * (height - 24)}px`, background: color, borderRadius: '4px 4px 0 0', opacity: 0.8 }}/>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#9D8E7F' }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── A1. DASHBOARD ───
function A01_Dashboard() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="dashboard" title="Dashboard" subtitle="Today · 23 May 2026" actions={<>
      <ABtn variant="secondary">Last 30 days ▾</ABtn>
      <ABtn variant="primary">Export</ABtn>
    </>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          <AStat label="Active users" value="24,812" delta="+8.4% wow"/>
          <AStat label="New signups (24h)" value="312" delta="+12% wow"/>
          <AStat label="Paid members" value="3,184" delta="+2.1% wow"/>
          <AStat label="Revenue (mtd)" value="₹18.4L" delta="+18% wow"/>
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
              {label:'10', value:280},{label:'11', value:312},{label:'12', value:298},{label:'13', value:340},
              {label:'14', value:268},{label:'15', value:380},{label:'16', value:412},{label:'17', value:402},
              {label:'18', value:368},{label:'19', value:430},{label:'20', value:450},{label:'21', value:412},
              {label:'22', value:478},{label:'23', value:312},
            ]}/>
          </div>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Top states</div>
            {[
              ['Uttar Pradesh', 8214, 100],
              ['Bihar', 5410, 66],
              ['Madhya Pradesh', 3120, 38],
              ['Maharashtra', 2014, 24],
              ['Chhattisgarh', 1240, 15],
              ['Delhi NCR', 980, 12],
            ].map(([s, n, w], i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 3 }}>
                  <span style={{ color: t.text }}>{s}</span><span>{n.toLocaleString()}</span>
                </div>
                <div style={{ height: 4, background: t.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${w}%`, height: '100%', background: t.primary }}/>
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

// ─── A2. ALL USERS ───
function A02_Users() {
  const t = ADMIN_THEME;
  const rows = [
    { id: 'KC-24812', name: 'Priya Patel', age: 26, gen: 'F', city: 'Lucknow', sub: 'Patel', joined: '23 May 2026', status: 'verified', plan: 'Gold', hue: 20 },
    { id: 'KC-24811', name: 'Rajesh Patel', age: 28, gen: 'M', city: 'Lucknow', sub: 'Patel', joined: '22 May 2026', status: 'pending', plan: 'Free', hue: 200 },
    { id: 'KC-24810', name: 'Anjali Sachan', age: 25, gen: 'F', city: 'Kanpur', sub: 'Sachan', joined: '22 May 2026', status: 'verified', plan: 'Silver', hue: 60 },
    { id: 'KC-24809', name: 'Manoj Kumar', age: 30, gen: 'M', city: 'Patna', sub: 'Verma', joined: '21 May 2026', status: 'flagged', plan: 'Free', hue: 100 },
    { id: 'KC-24808', name: 'Aarti Patel', age: 28, gen: 'F', city: 'Lucknow', sub: 'Patel', joined: '21 May 2026', status: 'featured', plan: 'Platinum', hue: 30 },
    { id: 'KC-24807', name: 'Vikram Verma', age: 31, gen: 'M', city: 'Bengaluru', sub: 'Verma', joined: '20 May 2026', status: 'verified', plan: 'Gold', hue: 220 },
    { id: 'KC-24806', name: 'Ritu Mahato', age: 26, gen: 'F', city: 'Ranchi', sub: 'Mahato', joined: '20 May 2026', status: 'verified', plan: 'Silver', hue: 280 },
    { id: 'KC-24805', name: 'Sneha Singh', age: 27, gen: 'F', city: 'Mumbai', sub: 'Singh', joined: '19 May 2026', status: 'featured', plan: 'Platinum', hue: 320 },
    { id: 'KC-24804', name: 'Pooja Verma', age: 27, gen: 'F', city: 'Patna', sub: 'Verma', joined: '19 May 2026', status: 'verified', plan: 'Gold', hue: 340 },
    { id: 'KC-24803', name: 'Ankit Kushwaha', age: 29, gen: 'M', city: 'Delhi', sub: 'Kushwaha', joined: '18 May 2026', status: 'pending', plan: 'Free', hue: 160 },
  ];
  return (
    <AdminShell active="users" title="All users" subtitle="24,812 total · 3,184 paid" actions={<>
      <ABtn variant="secondary">Export CSV</ABtn>
      <ABtn variant="primary">+ Add user</ABtn>
    </>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
          <div style={{ flex: 1, height: 36, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textFaint }}>
            🔍 Search by ID, name, phone, email
          </div>
          {['Status: All', 'Plan: All', 'State: All', 'Verified: All'].map((f, i) => (
            <div key={i} style={{ height: 36, padding: '0 12px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.text }}>{f} ▾</div>
          ))}
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '32px 110px 1.5fr 60px 1fr 1fr 1fr 100px 80px 80px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div><input type="checkbox" /></div>
            <div>ID</div><div>Name</div><div>Age</div><div>City · Sub</div><div>Joined</div><div>Status</div><div>Plan</div><div>Actions</div><div></div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 110px 1.5fr 60px 1fr 1fr 1fr 100px 80px 80px', padding: '10px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
              <div><input type="checkbox" /></div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10.5, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={r.name} size={26} hue={r.hue} theme={t}/>
                <span>{r.name}</span>
              </div>
              <div>{r.age} {r.gen}</div>
              <div>{r.city} · {r.sub}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.joined}</div>
              <div>
                {r.status === 'verified' && <APill kind="success">✓ Verified</APill>}
                {r.status === 'pending' && <APill kind="warn">Pending</APill>}
                {r.status === 'flagged' && <APill kind="error">⚑ Flagged</APill>}
                {r.status === 'featured' && <APill kind="primary">★ Featured</APill>}
              </div>
              <div>
                {r.plan === 'Free' ? <APill kind="default">Free</APill> :
                  r.plan === 'Silver' ? <APill kind="info">Silver</APill> :
                  r.plan === 'Gold' ? <APill kind="primary">Gold</APill> :
                  <APill kind="primary">Platinum</APill>}
              </div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>View</div>
              <div style={{ color: t.textFaint, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>⋯</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>
          <span>Showing 1–10 of 24,812</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', '1', '2', '3', '4', '…', '2481', '›'].map((p, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: p === '1' ? t.primary : t.surface, border: `1px solid ${p === '1' ? t.primary : t.border}`, color: p === '1' ? '#FFF' : t.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A3. USER DETAIL ───
function A03_UserDetail() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="user-detail" title="Priya Patel · KC-24812" subtitle="Joined 23 May 2026 · Verified · Gold member" actions={<>
      <ABtn variant="secondary">Send message</ABtn>
      <ABtn variant="danger">Suspend</ABtn>
      <ABtn variant="primary">Edit</ABtn>
    </>}>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '300px 1fr', gap: 18 }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, textAlign: 'center' }}>
            <PhotoPlaceholder name="Priya" height={200} width={200} radius={10} theme={t} hue={20}/>
            <div style={{ marginTop: 12, fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>Priya Patel</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>26 · 5'4" · Patel</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
              <APill kind="success">✓ Aadhaar</APill>
              <APill kind="success">✓ Edu</APill>
              <APill kind="success">✓ Job</APill>
              <APill kind="success">✓ Photo</APill>
            </div>
          </div>
          <div style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Contact</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.text, lineHeight: 1.8 }}>
              <div>📞 +91 98765 43210</div>
              <div>✉ priya.patel@gmail.com</div>
              <div>📍 Lucknow, UP · India</div>
            </div>
          </div>
          <div style={{ padding: 14, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Activity stats</div>
            {[['Profile views', '1,124'], ['Interests sent', '14'], ['Interests received', '47'], ['Shortlisted by', '23'], ['Match rate', '32%']].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
                <span style={{ color: t.textMuted }}>{l}</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${t.borderSoft}`, paddingBottom: 0 }}>
            {['Profile', 'Verifications', 'Subscription', 'Interests', 'Reports', 'Activity log'].map((tab, i) => (
              <div key={i} style={{ padding: '8px 14px', borderBottom: i === 0 ? `2px solid ${t.primary}` : 'none', marginBottom: -1, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: i === 0 ? t.primary : t.textMuted, fontWeight: i === 0 ? 500 : 400 }}>{tab}</div>
            ))}
          </div>
          {/* Detail sections */}
          {[
            { title: 'Basic info', rows: [['First name', 'Priya'], ['Last name', 'Patel'], ['DOB', '04 Feb 1999'], ['Gender', 'Female'], ['Marital', 'Never married']] },
            { title: 'Community', rows: [['Religion', 'Hindu (locked)'], ['Caste', 'Kurmi (locked)'], ['Sub-caste', 'Patel'], ['Gotra', 'Kashyap'], ['Mother tongue', 'Hindi']] },
            { title: 'Education & profession', rows: [['Education', 'M.Sc Mathematics'], ['University', 'Lucknow University'], ['Profession', 'PGT Teacher'], ['Workplace', 'City Montessori'], ['Income', '5-10 lakh']] },
            { title: 'Family', rows: [['Father', 'Suresh Patel · Farmer'], ['Mother', 'Indu Patel · Homemaker'], ['Siblings', '1 brother (married)'], ['Native', 'Gopalganj, Bihar'], ['Family type', 'Joint']] },
          ].map((sec, i) => (
            <div key={i} style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500 }}>{sec.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>Edit</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {sec.rows.map(([l, v], j) => (
                  <div key={j}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, letterSpacing: '0.02em' }}>{l}</div>
                    <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A4. VERIFICATION QUEUE ───
function A04_VerifyQueue() {
  const t = ADMIN_THEME;
  const queue = [
    { id: 'V-4821', user: 'Rajesh Patel', kind: 'Aadhaar', when: '2 mins ago', state: 'priority', hue: 200 },
    { id: 'V-4820', user: 'Manoj Kumar', kind: 'Education', when: '8 mins ago', state: 'new', hue: 100 },
    { id: 'V-4819', user: 'Sneha Singh', kind: 'Employer', when: '12 mins ago', state: 'new', hue: 320 },
    { id: 'V-4818', user: 'Vikram Verma', kind: 'Income', when: '24 mins ago', state: 'new', hue: 220 },
    { id: 'V-4817', user: 'Anjali Sachan', kind: 'Aadhaar', when: '1 hr ago', state: 'review', hue: 60 },
    { id: 'V-4816', user: 'Pooja Verma', kind: 'Education', when: '2 hrs ago', state: 'review', hue: 340 },
    { id: 'V-4815', user: 'Ankit Patel', kind: 'Aadhaar', when: '3 hrs ago', state: 'new', hue: 40 },
  ];
  return (
    <AdminShell active="verify-queue" title="Verification queue" subtitle="47 items · Avg resolve 2h 14m" actions={<>
      <ABtn variant="secondary">My queue (8)</ABtn>
      <ABtn variant="primary">Take next</ABtn>
    </>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          {[
            ['Aadhaar', 18, t.primary],
            ['Education', 14, t.info],
            ['Employer', 9, t.success],
            ['Income', 6, t.warn],
          ].map(([l, n, c], i) => (
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
            <div key={i} style={{ padding: '6px 11px', borderRadius: 6, background: i === 0 ? t.text : t.surface, color: i === 0 ? '#FFF' : t.text, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 11.5 }}>{c}</div>
          ))}
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 140px 100px 120px 120px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>User</div><div>Type</div><div>State</div><div>Submitted</div><div>Action</div>
          </div>
          {queue.map((q, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 140px 100px 120px 120px', padding: '12px 14px', borderBottom: i < queue.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{q.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={q.user} size={26} hue={q.hue} theme={t}/>
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

// ─── A5. VERIFICATION DOCUMENT REVIEW ───
function A05_VerifyDoc() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="verify-doc" title="V-4821 · Aadhaar review" subtitle="Rajesh Patel · KC-24811 · Submitted 2 mins ago" actions={<>
      <ABtn variant="ghost">Skip</ABtn>
      <ABtn variant="danger">Reject</ABtn>
      <ABtn variant="success" size="md">✓ Approve</ABtn>
    </>}>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        {/* Doc preview */}
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 480 }}>
          <div style={{ width: 480, height: 280, background: `repeating-linear-gradient(45deg, ${t.borderSoft} 0 10px, ${t.surface} 10px 20px)`, border: `1px solid ${t.border}`, borderRadius: 8, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textFaint, fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>
            AADHAAR CARD · PHOTO
            <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: t.surface, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.text, border: `1px solid ${t.border}` }}>Page 1 of 1</div>
            <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text }}>−</div>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text }}>+</div>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text }}>↻</div>
            </div>
          </div>
        </div>

        {/* Verification panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Submitted by user</div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>Rajesh Patel</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted, marginTop: 4 }}>DOB: 14-Aug-1995</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>Aadhaar: XXXX XXXX 4287</div>
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Checks</div>
            {[
              ['Card is clearly visible', true],
              ['Name matches profile', true],
              ['DOB matches profile', true],
              ['Photo not obscured', true],
              ['No signs of editing', null],
            ].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontFamily: '"Mukta", sans-serif', fontSize: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: v === true ? t.success : v === false ? t.error : t.borderSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 10 }}>{v === true ? '✓' : v === false ? '✗' : '?'}</div>
                <span style={{ flex: 1 }}>{l}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>Note (internal)</div>
            <div style={{ padding: 10, background: t.bg, borderRadius: 6, minHeight: 60, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textFaint }}>Notes visible to admin team only…</div>
          </div>

          <div style={{ padding: 14, background: t.warnSoft, borderRadius: 8, fontFamily: '"Mukta", sans-serif', fontSize: 11.5, color: t.warn, lineHeight: 1.5 }}>
            ⚠ Reminder: Aadhaar numbers must be partially masked in our database. Only verify DOB and name match.
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A6. REPORTS LIST ───
function A06_Reports() {
  const t = ADMIN_THEME;
  const rows = [
    { id: 'R-2014', target: 'Manoj Kumar', reporter: 'Anjali Sachan', reason: 'Fake photos', sev: 'high', when: '12 mins ago', hue: 100 },
    { id: 'R-2013', target: 'Sanjay Verma', reporter: 'Ritu Mahato', reason: 'Asking for money', sev: 'critical', when: '1 hr ago', hue: 220 },
    { id: 'R-2012', target: 'Ashok Patel', reporter: 'Pooja Verma', reason: 'Inappropriate messages', sev: 'med', when: '3 hrs ago', hue: 40 },
    { id: 'R-2011', target: 'Vinod Singh', reporter: 'Neha Katiyar', reason: 'False income claim', sev: 'med', when: 'Yesterday', hue: 80 },
    { id: 'R-2010', target: 'Anil Kushwaha', reporter: 'Kavita Singh', reason: 'Married already', sev: 'high', when: '2d ago', hue: 160 },
  ];
  return (
    <AdminShell active="reports" title="Reports & flags" subtitle="12 open · 2 critical">
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {['All open 12', 'Critical 2', 'High 4', 'Medium 5', 'Low 1', 'Resolved'].map((c, i) => (
            <div key={i} style={{ padding: '6px 11px', borderRadius: 6, background: i === 0 ? t.text : t.surface, color: i === 0 ? '#FFF' : t.text, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 11.5 }}>{c}</div>
          ))}
        </div>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1.5fr 100px 120px 100px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>Reported</div><div>By</div><div>Reason</div><div>Severity</div><div>When</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 1.5fr 100px 120px 100px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={r.target} size={26} hue={r.hue} theme={t}/>
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
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>Investigate →</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A7. REPORT DETAIL ───
function A07_ReportDetail() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="report-detail" title="R-2013 · Asking for money" subtitle="Critical · Reported by Ritu Mahato (KC-24806) 1 hr ago" actions={<>
      <ABtn variant="ghost">Dismiss</ABtn>
      <ABtn variant="secondary">Warn user</ABtn>
      <ABtn variant="danger">Suspend & ban</ABtn>
    </>}>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Reporter's note</div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, lineHeight: 1.55, padding: 12, background: t.bg, borderRadius: 8, borderLeft: `3px solid ${t.error}` }}>
              "उन्होंने chat में पैसे माँगे — कहा कि emergency है, मेरे पिता बीमार हैं और ₹50,000 तुरंत चाहिए। मैंने मना किया तो abusive language में जवाब दिया।"
            </div>
            <div style={{ marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint }}>3 screenshots attached</div>
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Chat evidence (auto-extracted)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { from: 'reported', text: 'Mere papa hospital me hain, urgent ₹50k chahiye. UPI bhej do please.', flag: true },
                { from: 'reporter', text: 'Excuse me sir, hum abhi mile bhi nahi hain.', flag: false },
                { from: 'reported', text: 'Aap log Kurmi log paisa nahi dete? Insaaniyat naam ki chiz hai ya nahi?', flag: true },
              ].map((m, i) => (
                <div key={i} style={{ padding: '8px 12px', background: m.flag ? t.errorSoft : t.bg, borderRadius: 6, borderLeft: m.flag ? `3px solid ${t.error}` : 'none' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint, marginBottom: 3 }}>{m.from === 'reported' ? 'Sanjay Verma' : 'Ritu Mahato'} · 12:42 PM</div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Admin note</div>
            <div style={{ padding: 10, minHeight: 80, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.textFaint }}>
              Pattern matches our financial-scam regex. Recommend suspend + notify other users in conversation.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Reported user</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <Avatar name="Sanjay" size={44} hue={220} theme={t}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500 }}>Sanjay Verma</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, color: t.textFaint }}>KC-22184</div>
              </div>
            </div>
            {[['Joined', 'Jan 2026'], ['Verifications', '1 of 6'], ['Past reports', '3 · 1 resolved'], ['Plan', 'Free'], ['Last active', '2 hrs ago']].map(([l, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>
                <span style={{ color: t.textMuted }}>{l}</span><span style={{ color: t.text }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, background: t.errorSoft, borderRadius: 8 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.error, fontWeight: 500 }}>⚠ 3 prior reports</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.error, marginTop: 4, lineHeight: 1.5 }}>
              2 dismissed · 1 resolved (financial scam, March 2026). Consider permanent ban.
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A8. BLOCKED ───
function A08_Blocked() {
  const t = ADMIN_THEME;
  const rows = [
    { id: 'KC-22184', name: 'Sanjay Verma', reason: 'Financial scam', by: 'Aarti S.', when: '15 May 2026', hue: 220 },
    { id: 'KC-21092', name: 'Ravi Singh', reason: 'Fake identity', by: 'Mohit T.', when: '12 May 2026', hue: 60 },
    { id: 'KC-20018', name: 'Suresh Patel', reason: 'Married, multiple flags', by: 'Aarti S.', when: '08 May 2026', hue: 20 },
    { id: 'KC-19842', name: 'Vivek K.', reason: 'Abusive language', by: 'Pooja M.', when: '01 May 2026', hue: 280 },
  ];
  return (
    <AdminShell active="blocked" title="Blocked users" subtitle="124 total · 4 added this week">
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1.5fr 1fr 120px 120px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>User</div><div>Reason</div><div>Blocked by</div><div>When</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1.5fr 1fr 120px 120px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={r.name} size={26} hue={r.hue} theme={t}/>
                <span>{r.name}</span>
              </div>
              <div>{r.reason}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.by}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{r.when}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>Unblock</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A9. FEATURED PERSONALITIES ───
function A09_Featured() {
  const t = ADMIN_THEME;
  const rows = [
    { id: 'F-014', name: 'Aarti Patel', cred: 'IAS 2022', cat: 'Civil Services', state: 'live', views: 2814, hue: 30 },
    { id: 'F-013', name: 'Dr. Ritu Sachan', cred: 'AIIMS Cardiology', cat: 'Doctors', state: 'live', views: 1942, hue: 80 },
    { id: 'F-012', name: 'Vikram Verma', cred: 'IIT-D · Agri-tech founder', cat: 'Business', state: 'live', views: 1814, hue: 220 },
    { id: 'F-011', name: 'Sneha Singh', cred: 'CA · Deloitte Manager', cat: 'Business', state: 'live', views: 1240, hue: 320 },
    { id: 'F-010', name: 'Manoj Mahato', cred: 'IPS · DCP Patna', cat: 'Civil Services', state: 'draft', views: 0, hue: 200 },
    { id: 'F-009', name: 'Pooja Kushwaha', cred: 'NEET AIR 124', cat: 'Doctors', state: 'review', views: 0, hue: 280 },
    { id: 'F-008', name: 'Ashok Patel', cred: 'FPO Director · 14k farmers', cat: 'Agriculture', state: 'live', views: 982, hue: 60 },
    { id: 'F-007', name: 'Prof. Renu', cred: 'JNU · Sanskrit', cat: 'Academia', state: 'expired', views: 4012, hue: 340 },
  ];
  return (
    <AdminShell active="featured" title="Featured personalities" subtitle="124 live · 9 nominations pending · curated by editorial team" actions={<>
      <ABtn variant="secondary">Nominations (9)</ABtn>
      <ABtn variant="primary">+ Add personality</ABtn>
    </>}>
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 14, padding: 14, background: t.primarySoft, borderRadius: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: 18 }}>★</div>
          <div style={{ flex: 1, fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.primaryDeep, lineHeight: 1.5 }}>
            Featured Personalities have <strong>10× engagement</strong>. Curate carefully — never accept paid placement. All credentials must be independently verifiable.
          </div>
        </div>

        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1.5fr 1.5fr 1fr 80px 90px 80px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>Name</div><div>Credential</div><div>Category</div><div>State</div><div>Views</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1.5fr 1.5fr 1fr 80px 90px 80px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={r.name} size={28} hue={r.hue} theme={t}/>
                <span>{r.name}</span>
              </div>
              <div style={{ color: t.textMuted }}>{r.cred}</div>
              <div><APill kind="primary">{r.cat}</APill></div>
              <div>
                {r.state === 'live' && <APill kind="success">● Live</APill>}
                {r.state === 'draft' && <APill kind="default">Draft</APill>}
                {r.state === 'review' && <APill kind="warn">In review</APill>}
                {r.state === 'expired' && <APill kind="default">Expired</APill>}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.text }}>{r.views.toLocaleString()}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>Edit</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A10. FEATURED EDITOR ───
function A10_FeaturedEdit() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="featured-edit" title="Edit F-010 · Manoj Mahato" subtitle="Draft · last saved 8 mins ago" actions={<>
      <ABtn variant="ghost">Preview as user</ABtn>
      <ABtn variant="secondary">Save draft</ABtn>
      <ABtn variant="primary">Publish</ABtn>
    </>}>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Credential</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginBottom: 4 }}>Headline credential (shown as pill)</div>
              <div style={{ padding: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13 }}>IPS · DCP, Patna</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginBottom: 4 }}>Category</div>
              <div style={{ padding: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, fontFamily: '"Mukta", sans-serif', fontSize: 13 }}>Civil Services ▾</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, marginBottom: 4 }}>Sub-tags (max 3)</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Bihar cadre', 'UPSC 2018', 'AIR 87'].map((tag, i) => (
                  <div key={i} style={{ padding: '4px 8px', background: t.primarySoft, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primaryDeep }}>{tag} ×</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Editorial blurb</div>
            <div style={{ padding: 12, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, minHeight: 120, fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text, lineHeight: 1.5, fontStyle: 'italic' }}>
              "2018 UPSC, AIR 87. First in his village. Runs a quiet mentorship program for Kurmi students preparing for civil services. Reachable by family-led introduction only."
            </div>
            <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, display: 'flex', justifyContent: 'space-between' }}>
              <span>2-3 sentences, no marketing language</span><span>184/240</span>
            </div>
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 14 }}>Verified credentials</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                ['UPSC Gazette 2018', 'PDF · Verified by editorial', true],
                ['LBSNAA Mussoorie', 'Certificate · Verified', true],
                ['Aadhaar', 'KYC complete', true],
                ['Photo', 'Selfie + ID match', true],
              ].map(([l, sub, v], i) => (
                <div key={i} style={{ padding: 10, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: t.successSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.success, fontSize: 12 }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{l}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>Live preview</div>
          <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: 14, display: 'flex', gap: 12 }}>
              <PhotoPlaceholder name="Manoj" height={70} width={70} radius={10} theme={t} hue={200}/>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>Manoj Mahato</span>
                  <span style={{ color: t.info, fontSize: 11 }}>✓</span>
                </div>
                <div style={{ display: 'inline-flex', marginTop: 4, padding: '3px 8px', background: t.primarySoft, borderRadius: 4, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.primaryDeep }}>IPS · DCP, Patna</div>
                <div style={{ marginTop: 6, fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textMuted }}>30 · 5'10" · Mahato · Patna</div>
              </div>
            </div>
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ padding: 10, background: t.bg, borderLeft: `3px solid ${t.primary}`, fontFamily: '"Mukta", sans-serif', fontSize: 11, color: t.text, lineHeight: 1.5, fontStyle: 'italic' }}>
                "2018 UPSC, AIR 87. First in his village. Runs a quiet mentorship program for Kurmi students preparing for civil services. Reachable by family-led introduction only."
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A11. CONTENT & BANNERS ───
function A11_Content() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="content" title="Content & banners" subtitle="In-app messaging, banners, FAQ" actions={<ABtn variant="primary">+ New banner</ABtn>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {['Home banners 3', 'Plans banners 1', 'Empty states 6', 'FAQs 24', 'Push templates 8'].map((c, i) => (
            <div key={i} style={{ padding: '6px 11px', borderRadius: 6, background: i === 0 ? t.text : t.surface, color: i === 0 ? '#FFF' : t.text, border: `1px solid ${i === 0 ? t.text : t.border}`, fontFamily: '"Mukta", sans-serif', fontSize: 11.5 }}>{c}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {[
            { title: 'Akshaya Tritiya 2026', sub: 'Auspicious match suggestions', state: 'live', placement: 'Home top', tone: t.primary },
            { title: 'Gold annual offer', sub: '₹1,999 → ₹1,499 limited', state: 'live', placement: 'Plans header', tone: t.warn },
            { title: 'Profile boost', sub: 'During Sawan month', state: 'draft', placement: 'Home strip', tone: t.info },
          ].map((b, i) => (
            <div key={i} style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: 120, background: `linear-gradient(135deg, ${b.tone} 0%, ${b.tone}cc 100%)`, padding: 14, color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>{b.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, opacity: 0.9 }}>{b.sub}</div>
              </div>
              <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>Placement</div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12, color: t.text }}>{b.placement}</div>
                </div>
                {b.state === 'live' ? <APill kind="success">● Live</APill> : <APill kind="default">Draft</APill>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A12. PAYMENTS ───
function A12_Payments() {
  const t = ADMIN_THEME;
  const rows = [
    { id: 'TXN8K42P9M', user: 'Rajesh Patel', plan: 'Gold · 6 mo', amount: 1349, method: 'UPI · PhonePe', when: '23 May, 10:14', state: 'success', hue: 200 },
    { id: 'TXN8K41J3R', user: 'Anjali Sachan', plan: 'Silver · 3 mo', amount: 599, method: 'UPI · GPay', when: '23 May, 09:42', state: 'success', hue: 60 },
    { id: 'TXN8K40H2V', user: 'Manoj Kumar', plan: 'Boost 24h', amount: 99, method: 'Card · HDFC', when: '23 May, 08:18', state: 'failed', hue: 100 },
    { id: 'TXN8K39F1Z', user: 'Pooja Verma', plan: 'Platinum · 12 mo', amount: 3499, method: 'Net banking · SBI', when: '22 May, 22:30', state: 'success', hue: 340 },
    { id: 'TXN8K38D8X', user: 'Ankit Patel', plan: '10 contacts', amount: 249, method: 'UPI · Paytm', when: '22 May, 18:48', state: 'refund', hue: 40 },
    { id: 'TXN8K37C2L', user: 'Ritu Mahato', plan: 'Kundli Report', amount: 199, method: 'UPI · BHIM', when: '22 May, 16:14', state: 'success', hue: 280 },
  ];
  return (
    <AdminShell active="payments" title="Payments" subtitle="₹18.4L MTD · 1,284 transactions today">
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          <AStat label="Revenue today" value="₹3.84L" delta="+12% dod"/>
          <AStat label="Successful" value="1,184" delta="+8%"/>
          <AStat label="Failed" value="42" delta="–2.1%"/>
          <AStat label="Refunds (mtd)" value="₹62k"/>
        </div>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1.2fr 1.2fr 90px 1.2fr 120px 100px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>Txn ID</div><div>User</div><div>Plan</div><div>Amount</div><div>Method</div><div>When</div><div>State</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1.2fr 1.2fr 90px 1.2fr 120px 100px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={r.user} size={26} hue={r.hue} theme={t}/>
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

// ─── A13. REFUNDS QUEUE ───
function A13_Refunds() {
  const t = ADMIN_THEME;
  const rows = [
    { id: 'RF-018', user: 'Ankit Patel', txn: 'TXN8K38D8X', amount: 249, reason: 'Was within 7-day window · plan unused', when: '2h ago', hue: 40 },
    { id: 'RF-017', user: 'Vinod Singh', txn: 'TXN8J94K8L', amount: 1499, reason: 'Duplicate charge — bank confirmed', when: '4h ago', hue: 80 },
    { id: 'RF-016', user: 'Anjali Sachan', txn: 'TXN8J81H2N', amount: 99, reason: 'Boost did not activate', when: 'Yesterday', hue: 60 },
    { id: 'RF-015', user: 'Sneha Singh', txn: 'TXN8J78F1J', amount: 3499, reason: 'Cancelled — service issue with RM', when: 'Yesterday', hue: 320 },
    { id: 'RF-014', user: 'Priya Patel', txn: 'TXN8J60D9B', amount: 199, reason: 'Got married — not needed', when: '2d ago', hue: 20 },
  ];
  return (
    <AdminShell active="refunds" title="Refunds queue" subtitle="5 pending · SLA 3-5 business days">
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1.2fr 160px 90px 2fr 100px 180px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>ID</div><div>User</div><div>Original txn</div><div>Amount</div><div>Reason</div><div>When</div><div>Action</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1.2fr 160px 90px 2fr 100px 180px', padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{r.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={r.user} size={26} hue={r.hue} theme={t}/>
                <span>{r.user}</span>
              </div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{r.txn}</div>
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

// ─── A14. COUPONS ───
function A14_Coupons() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="coupons" title="Coupons & promotions" actions={<ABtn variant="primary">+ Create coupon</ABtn>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { code: 'NAMASTE10', disc: '10% off', usage: '412 / 1,000', state: 'live', plan: 'Gold/Platinum' },
            { code: 'KURMI500', disc: '₹500 off', usage: '89 / 200', state: 'live', plan: 'Platinum only' },
            { code: 'SAWAN26', disc: '15% off', usage: '0 / 500', state: 'scheduled', plan: 'All plans' },
            { code: 'AKSHAYA', disc: '20% off', usage: '1,242 / 1,500', state: 'live', plan: 'All plans' },
            { code: 'DIWALI25', disc: '25% off', usage: '0 / 2,000', state: 'draft', plan: 'All plans' },
            { code: 'STUDENT', disc: '₹200 off', usage: '184 / 1,000', state: 'live', plan: 'Silver only' },
          ].map((c, i) => (
            <div key={i} style={{ padding: 16, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 16, color: t.primary, fontWeight: 500 }}>{c.code}</div>
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

// ─── A15. PLANS CONFIG ───
function A15_Plans() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="plans" title="Plans & pricing" subtitle="Changes take effect immediately for new purchases" actions={<ABtn variant="primary">+ Add plan</ABtn>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
          {[
            { name: 'Silver', price: 599, dur: '3 months', sales: 412, color: '#94A3B8' },
            { name: 'Gold', price: 1499, dur: '6 months', sales: 1840, color: t.primary, recommended: true },
            { name: 'Platinum', price: 3499, dur: '12 months', sales: 184, color: t.primaryDeep },
          ].map((p, i) => (
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
            {[['3 contacts', 99], ['10 contacts', 249], ['25 contacts', 499]].map(([l, p], i) => (
              <div key={i} style={{ padding: 12, background: t.bg, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, color: t.text }}>{l}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{Math.floor(p / (l === '3 contacts' ? 3 : l === '10 contacts' ? 10 : 25))}/contact</div>
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

// ─── A16. ADD-ONS CONFIG ───
function A16_AddOns() {
  const t = ADMIN_THEME;
  const items = [
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
  return (
    <AdminShell active="addons" title="Add-ons" subtitle={`${items.length} active products`} actions={<ABtn variant="primary">+ Add product</ABtn>}>
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

// ─── A17. MATCH ANALYTICS ───
function A17_Analytics() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="analytics" title="Match analytics" subtitle="How matches form & convert" actions={<ABtn variant="secondary">Last 30 days ▾</ABtn>}>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          <AStat label="Interests sent" value="48,124" delta="+18%"/>
          <AStat label="Interests accepted" value="14,840" delta="+8% · 31% rate"/>
          <AStat label="Chats opened" value="11,212" delta="+12%"/>
          <AStat label="Marriages reported" value="84" delta="last 6 mo"/>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, marginBottom: 18 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Acceptance funnel · last 30 days</div>
            {[
              { label: 'Profile views', value: 248124, pct: 100 },
              { label: 'Profile detail opened', value: 142840, pct: 57.6 },
              { label: 'Interest sent', value: 48124, pct: 19.4 },
              { label: 'Interest accepted', value: 14840, pct: 6.0 },
              { label: 'First message exchanged', value: 11212, pct: 4.5 },
              { label: 'Chat continued (1 wk+)', value: 6840, pct: 2.8 },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: t.text }}>{s.label}</span>
                  <span style={{ color: t.textMuted }}>{s.value.toLocaleString()} · {s.pct}%</span>
                </div>
                <div style={{ height: 16, background: t.borderSoft, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: `linear-gradient(90deg, ${t.primary} 0%, ${t.primaryDeep} 100%)` }}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Most active sub-castes</div>
            {[['Patel', 32], ['Sachan', 18], ['Verma', 14], ['Katiyar', 10], ['Singh', 8], ['Kushwaha', 7], ['Maurya', 6], ['Mahato', 5]].map(([n, p], i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 3 }}>
                  <span style={{ color: t.text }}>{n}</span><span>{p}%</span>
                </div>
                <div style={{ height: 4, background: t.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${p * 3.125}%`, height: '100%', background: t.primary }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Daily interest activity · last 14d</div>
          <BarChart color={t.primary} height={180} data={[
            {label:'10', value:1480},{label:'11', value:1320},{label:'12', value:1690},{label:'13', value:2010},
            {label:'14', value:1820},{label:'15', value:2480},{label:'16', value:2640},{label:'17', value:2780},
            {label:'18', value:2280},{label:'19', value:2680},{label:'20', value:2980},{label:'21', value:3140},
            {label:'22', value:3360},{label:'23', value:1840},
          ]}/>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A18. FUNNEL & COHORTS ───
function A18_Funnel() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="funnel" title="Funnel & cohorts" subtitle="Activation, retention, conversion">
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
          <AStat label="Signup → complete profile" value="62%" delta="+4%"/>
          <AStat label="Profile → first interest" value="48%" delta="+2%"/>
          <AStat label="Signup → paid (D30)" value="12.8%" delta="+1.2%"/>
        </div>

        <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, marginBottom: 18 }}>
          <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Retention cohorts · % active in week N</div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(8, 1fr)', gap: 4, fontFamily: 'Inter, sans-serif', fontSize: 10.5 }}>
            <div style={{ color: t.textMuted, padding: '6px 4px' }}>Signup cohort</div>
            {['W0', 'W1', 'W2', 'W3', 'W4', 'W6', 'W8', 'W12'].map(h => (
              <div key={h} style={{ color: t.textMuted, padding: '6px 4px', textAlign: 'center' }}>{h}</div>
            ))}
            {[
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
            ].map((row, i) => (
              <React.Fragment key={i}>
                <div style={{ color: t.text, padding: '6px 4px' }}>{row[0]}</div>
                {row[1].map((v, j) => (
                  <div key={j} style={{
                    padding: '6px 4px', textAlign: 'center',
                    background: v === null ? 'transparent' : `oklch(${0.95 - v / 250} 0.1 ${30 + v * 0.5})`,
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

// ─── A19. RM CONSOLE ───
function A19_RM() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="rm" title="RM console · Aarti Sharma" subtitle="42 active Platinum clients · 8 unread updates" actions={<ABtn variant="primary">+ Log call</ABtn>}>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 18 }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>My clients (42)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { name: 'Sneha Singh', sub: 'Platinum · Mumbai · 27', updates: 2, urgent: true, hue: 320 },
              { name: 'Aarti Patel', sub: 'Platinum · Lucknow · 28', updates: 1, hue: 30 },
              { name: 'Vikram Verma', sub: 'Platinum · Bengaluru · 31', updates: 0, hue: 220 },
              { name: 'Pooja Verma', sub: 'Gold · Patna · 27', updates: 1, hue: 340 },
              { name: 'Ritu Mahato', sub: 'Platinum · Ranchi · 26', updates: 0, hue: 280 },
              { name: 'Dr. Ritu Sachan', sub: 'Platinum · Delhi · 29', updates: 3, urgent: true, hue: 80 },
            ].map((c, i) => (
              <div key={i} style={{ padding: 10, background: i === 0 ? t.primarySoft : t.surface, border: `1px solid ${i === 0 ? t.primary : t.borderSoft}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={c.name} size={36} hue={c.hue} theme={t}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint }}>{c.sub}</div>
                </div>
                {c.updates > 0 && (
                  <div style={{ padding: '1px 6px', background: c.urgent ? t.error : t.primary, borderRadius: 999, fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#FFF', fontWeight: 500 }}>{c.updates}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <PhotoPlaceholder name="Sneha" height={56} width={56} radius={10} theme={t} hue={320}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>Sneha Singh</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted }}>Platinum · KC-24805 · Manager at Deloitte · Mumbai</div>
              </div>
              <ABtn variant="secondary">Open profile</ABtn>
              <ABtn variant="primary">Suggest matches</ABtn>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
              {[['Engagement', 'High'], ['Matches sent', '14'], ['Replied', '5'], ['Days active', '32']].map(([l, v], i) => (
                <div key={i} style={{ padding: 10, background: t.bg, borderRadius: 6 }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 9.5, color: t.textFaint }}>{l}</div>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, color: t.text, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Recent activity</div>
            {[
              { t: 'Call logged · 14 min', sub: 'Discussed Vikram V. · positive · family meeting next week', when: '2h ago', icon: '📞' },
              { t: 'Note added', sub: 'Family wants Bengaluru-based, willing to relocate for IAS/IIT', when: 'Yesterday', icon: '✎' },
              { t: 'Family introduced', sub: 'Sneha\'s parents ↔ Vikram\'s mama ji · meeting set 30 May', when: '3d ago', icon: '🤝' },
              { t: 'Profile suggested · Vikram Verma', sub: 'KC-24807 · IIT-D founder · Bengaluru', when: '5d ago', icon: '★' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? `1px solid ${t.borderSoft}` : 'none' }}>
                <div style={{ fontSize: 16 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text }}>{a.t}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{a.sub}</div>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textFaint, whiteSpace: 'nowrap' }}>{a.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A20. BULK OPS ───
function A20_Bulk() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="bulk" title="Bulk operations" subtitle="Import, export, batch actions">
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {[
          { title: 'Import users', sub: 'CSV with phone, name, basic fields', icon: '⇣', cta: 'Choose file', last: 'Last imported 14 May · 412 rows' },
          { title: 'Export users', sub: 'Filtered or full database', icon: '⇡', cta: 'Configure export', last: 'Last export 22 May · 24,812 rows' },
          { title: 'Bulk verify', sub: 'Approve in batch via CSV (admin-only)', icon: '✓', cta: 'Upload approval list', last: '12 batches this month' },
          { title: 'Bulk message', sub: 'WhatsApp / SMS / push to segment', icon: '✉', cta: 'Compose message', last: 'Last sent to 8.2k Gold members' },
          { title: 'Profile cleanup', sub: 'Inactive 180+ days · 1,284 candidates', icon: '⌫', cta: 'Review candidates', last: 'Run weekly · last 16 May' },
          { title: 'Featured invitations', sub: 'CSV of nominations to invite', icon: '★', cta: 'Upload nominations', last: '14 invitations sent this month' },
        ].map((b, i) => (
          <div key={i} style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: t.primarySoft, color: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>{b.title}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginTop: 2 }}>{b.sub}</div>
              </div>
            </div>
            <div style={{ padding: '8px 0', borderTop: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint }}>{b.last}</div>
            <div style={{ marginTop: 8 }}>
              <ABtn variant="primary" size="sm">{b.cta}</ABtn>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

// ─── A21. TEAM & ROLES ───
function A21_Team() {
  const t = ADMIN_THEME;
  const team = [
    { name: 'Aarti Sharma', role: 'Editorial admin', email: 'aarti@kurmi.in', perms: 'Featured · Reports · Verify', state: 'active', hue: 30 },
    { name: 'Mohit Tiwari', role: 'Verification lead', email: 'mohit@kurmi.in', perms: 'Verify · Reports · Users', state: 'active', hue: 200 },
    { name: 'Pooja Mishra', role: 'Support · Refunds', email: 'pooja@kurmi.in', perms: 'Refunds · Support · Users (read)', state: 'active', hue: 340 },
    { name: 'Sanjay Kumar', role: 'RM · Platinum', email: 'sanjay@kurmi.in', perms: 'RM console · Users (read)', state: 'active', hue: 100 },
    { name: 'Renu Patel', role: 'Editorial', email: 'renu@kurmi.in', perms: 'Featured · Content', state: 'invited', hue: 60 },
    { name: 'Karan Verma', role: 'Engineering', email: 'karan@kurmi.in', perms: 'All access · audit', state: 'active', hue: 220 },
  ];
  return (
    <AdminShell active="team" title="Team & roles" subtitle="6 admins · 4 active roles" actions={<ABtn variant="primary">+ Invite admin</ABtn>}>
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1.4fr 2fr 100px 80px', padding: '10px 14px', background: t.bg, borderBottom: `1px solid ${t.borderSoft}`, fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
            <div>Name</div><div>Role</div><div>Email</div><div>Permissions</div><div>State</div><div>Action</div>
          </div>
          {team.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1.4fr 2fr 100px 80px', padding: '12px 14px', borderBottom: i < team.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={m.name} size={32} hue={m.hue} theme={t}/>
                <span style={{ fontWeight: 500 }}>{m.name}</span>
              </div>
              <div>{m.role}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: t.textMuted }}>{m.email}</div>
              <div style={{ color: t.textMuted, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{m.perms}</div>
              <div>{m.state === 'active' ? <APill kind="success">● Active</APill> : <APill kind="warn">Invited</APill>}</div>
              <div style={{ color: t.primary, fontFamily: 'Inter, sans-serif', fontSize: 11 }}>Edit</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A22. AUDIT LOG ───
function A22_Audit() {
  const t = ADMIN_THEME;
  const logs = [
    { who: 'Aarti S.', what: 'Approved verification V-4820', target: 'Anjali Sachan · Education', when: '12:08 PM', kind: 'verify' },
    { who: 'Pooja M.', what: 'Refunded ₹1,499', target: 'TXN8J94K8L · Vinod Singh', when: '11:42 AM', kind: 'refund' },
    { who: 'Mohit T.', what: 'Suspended user', target: 'Sanjay Verma · KC-22184', when: '11:18 AM', kind: 'mod' },
    { who: 'Aarti S.', what: 'Published Featured', target: 'F-014 · Aarti Patel · IAS', when: '10:30 AM', kind: 'editorial' },
    { who: 'Karan V.', what: 'Updated plan pricing', target: 'Gold: ₹1,499 → ₹1,499 (no change)', when: '09:14 AM', kind: 'config' },
    { who: 'Aarti S.', what: 'Rejected verification', target: 'V-4798 · Aadhaar · low quality', when: 'Yesterday 17:22', kind: 'verify' },
    { who: 'Pooja M.', what: 'Issued coupon NAMASTE10', target: '1 user · KC-22014', when: 'Yesterday 16:08', kind: 'commerce' },
    { who: 'System', what: 'Auto-flagged for review', target: '12 chats · financial-scam regex', when: 'Yesterday 12:14', kind: 'system' },
  ];
  const kindColor = { verify: t.success, refund: t.warn, mod: t.error, editorial: t.primary, config: t.info, commerce: t.primary, system: t.textMuted };
  return (
    <AdminShell active="audit" title="Audit log" subtitle="All admin actions · last 30 days">
      <div style={{ padding: 28 }}>
        <div style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10, overflow: 'hidden' }}>
          {logs.map((l, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '8px 140px 1.4fr 2fr 120px', padding: '14px 16px', borderBottom: i < logs.length - 1 ? `1px solid ${t.borderSoft}` : 'none', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: kindColor[l.kind] }}/>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, fontWeight: 500 }}>{l.who}</div>
              <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5, color: t.text }}>{l.what}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: t.textMuted }}>{l.target}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textFaint, textAlign: 'right' }}>{l.when}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── A23. APP SETTINGS ───
function A23_Settings() {
  const t = ADMIN_THEME;
  return (
    <AdminShell active="settings" title="App settings" subtitle="Global toggles · feature flags · webhooks">
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {[
          { title: 'Features', items: [
            ['Same-gotra matching', 'Allow users to match same gotra', false],
            ['Other-caste matching', 'OBC inter-caste suggestions', true],
            ['Video intro slots', 'New 30-sec video feature', false],
            ['AI biodata drafting', 'LLM-assisted About me', false],
          ]},
          { title: 'Verification', items: [
            ['Auto-approve Aadhaar', 'If KYC API matches DOB+name', false],
            ['Photo selfie required', 'For blue tick badge', true],
            ['Re-verify yearly', 'Force re-verification after 12 months', true],
            ['Manual review threshold', 'Flag if confidence < 95%', true],
          ]},
          { title: 'Communication', items: [
            ['WhatsApp OTP', 'Send via Business API', true],
            ['Voice OTP', 'Fallback for poor connectivity', true],
            ['Push notifications', 'Match suggestions daily 9am', true],
            ['Email digests', 'Weekly summary to family', false],
          ]},
          { title: 'Commerce', items: [
            ['Auto-renew', 'Enable subscription auto-renewal', false],
            ['UPI cash via agent', 'Tier 2/3 cash payments', true],
            ['Refund grace period', '7 days from purchase', true],
            ['GST shown separately', 'Tax breakdown on invoice', false],
          ]},
          { title: 'Safety', items: [
            ['Phone number masking', 'Hide before acceptance', true],
            ['Financial scam regex', 'Auto-flag money requests', true],
            ['Photo download lock', 'Watermark + block for free users', true],
            ['Suspicious link blocker', 'Strip URLs in first 7 days', true],
          ]},
          { title: 'Editorial', items: [
            ['Featured editorial review', 'All edits go through 2 admins', true],
            ['Public credentials check', 'Require third-party source', true],
            ['Featured expiry', 'Auto-expire after 365 days', true],
            ['Paid placement allowed', 'NEVER', false],
          ]},
        ].map((sec, i) => (
          <div key={i} style={{ padding: 18, background: t.surface, border: `1px solid ${t.borderSoft}`, borderRadius: 10 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{sec.title}</div>
            {sec.items.map(([n, sub, on], j) => (
              <div key={j} style={{ padding: '10px 0', borderTop: j > 0 ? `1px solid ${t.borderSoft}` : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 12.5 }}>{n}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: t.textFaint, marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{ width: 34, height: 20, borderRadius: 999, background: on ? t.primary : t.borderSoft, position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 2, [on ? 'right' : 'left']: 2, width: 16, height: 16, borderRadius: '50%', background: '#FFF' }}/>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

// ─── A24. LOGIN ───
function A24_Login() {
  const t = ADMIN_THEME;
  return (
    <div style={{ width: 1200, height: 780, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", Inter, system-ui, sans-serif', color: t.text }}>
      <div style={{ display: 'flex', width: 880, height: 540, background: t.surface, borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
        <div style={{ flex: 1, background: `linear-gradient(135deg, ${t.primaryDeep} 0%, ${t.primary} 100%)`, padding: 40, color: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 18, fontWeight: 500 }}>K</div>
              <div>
                <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 16, fontWeight: 500 }}>KurmiConnect</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.7, letterSpacing: '0.08em' }}>ADMIN</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 22, fontWeight: 500, lineHeight: 1.4, marginBottom: 8 }}>
              विश्वसनीय रिश्ते,<br/>सम्मानित परिवार
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, opacity: 0.8, fontStyle: 'italic' }}>
              "We build with the dignity our community deserves."
            </div>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, opacity: 0.55, letterSpacing: '0.05em' }}>
            Admin v2.4.1 · Build a3f24c · 23 May 2026
          </div>
        </div>
        <div style={{ flex: 1, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: '"Mukta", sans-serif', fontSize: 22, fontWeight: 500 }}>Sign in</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.textMuted, marginTop: 4 }}>Use your @kurmi.in admin account</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>Email</div>
              <div style={{ height: 42, padding: '0 12px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>aarti@kurmi.in</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>Password</div>
              <div style={{ height: 42, padding: '0 12px', background: t.surface, border: `1.5px solid ${t.primary}`, borderRadius: 8, display: 'flex', alignItems: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 13, letterSpacing: '0.2em' }}>••••••••••</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.textMuted, marginBottom: 4 }}>2FA · code from Authenticator</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['9','2','4','7','1','3'].map((d, i) => (
                  <div key={i} style={{ flex: 1, height: 42, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace, monospace', fontSize: 16, fontWeight: 500 }}>{d}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon size={11} color="#FFF"/></div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: t.textMuted }}>Trust this device for 7 days</div>
          </div>
          <div style={{ height: 48, background: t.primary, color: '#FFF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Mukta", sans-serif', fontSize: 14, fontWeight: 500 }}>Sign in</div>
          <div style={{ textAlign: 'center', marginTop: 14, fontFamily: 'Inter, sans-serif', fontSize: 11, color: t.primary }}>Forgot password? · Contact engineering</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ADMIN_THEME, ADMIN_NAV, AdminShell, AStat, ABtn, APill, Sparkline, BarChart,
  A01_Dashboard, A02_Users, A03_UserDetail, A04_VerifyQueue, A05_VerifyDoc,
  A06_Reports, A07_ReportDetail, A08_Blocked, A09_Featured, A10_FeaturedEdit,
  A11_Content, A12_Payments, A13_Refunds, A14_Coupons, A15_Plans, A16_AddOns,
  A17_Analytics, A18_Funnel, A19_RM, A20_Bulk, A21_Team, A22_Audit, A23_Settings,
  A24_Login,
});
