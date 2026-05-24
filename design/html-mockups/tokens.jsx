// tokens.jsx — KurmiConnect design system
// Palettes, typography, atoms. All screens use these.

const KC_PALETTES = {
  saffron: {
    name: 'Saffron',
    bg: '#FBF7F0',
    surface: '#FFFFFF',
    surfaceWarm: '#FBF1E3',
    surfaceWarmer: '#F6E6CC',
    text: '#1C1917',
    textMuted: '#6B5E52',
    textFaint: '#A39687',
    border: '#EAE0D2',
    borderSoft: '#F2EADC',
    primary: '#B7531A',       // burnt saffron, restrained
    primaryDeep: '#7A2E0B',
    primarySoft: '#F8E7D2',
    accent: '#7C2D12',         // maroon accent
    success: '#15803D',
    successSoft: '#DCFCE7',
    info: '#1E40AF',
    warn: '#A16207',
    warnSoft: '#FEF3C7',
    error: '#B91C1C',
    chipBg: '#F4EBDD',
    seal: '#9A3412',
  },
  maroon: {
    name: 'Maroon',
    bg: '#FAF5F4',
    surface: '#FFFFFF',
    surfaceWarm: '#F5E8E6',
    surfaceWarmer: '#EDD4D0',
    text: '#1C1917',
    textMuted: '#6B5959',
    textFaint: '#A89090',
    border: '#EBDDDB',
    borderSoft: '#F2E7E5',
    primary: '#881337',
    primaryDeep: '#4C0519',
    primarySoft: '#F4D9DF',
    accent: '#B7531A',
    success: '#15803D',
    successSoft: '#DCFCE7',
    info: '#1E40AF',
    warn: '#A16207',
    warnSoft: '#FEF3C7',
    error: '#B91C1C',
    chipBg: '#F1E2E0',
    seal: '#7F1D1D',
  },
  jade: {
    name: 'Jade',
    bg: '#F4F7F4',
    surface: '#FFFFFF',
    surfaceWarm: '#E2EEE6',
    surfaceWarmer: '#CFE2D5',
    text: '#1C1F1D',
    textMuted: '#5C6760',
    textFaint: '#9AA89E',
    border: '#DCE6DE',
    borderSoft: '#E8EFE9',
    primary: '#0F6E4A',
    primaryDeep: '#064E33',
    primarySoft: '#D7EBDF',
    accent: '#B7531A',
    success: '#15803D',
    successSoft: '#DCFCE7',
    info: '#1E40AF',
    warn: '#A16207',
    warnSoft: '#FEF3C7',
    error: '#B91C1C',
    chipBg: '#E3EDE6',
    seal: '#065F46',
  },
  midnight: {
    name: 'Midnight',
    bg: '#F5F6F9',
    surface: '#FFFFFF',
    surfaceWarm: '#E6EAF2',
    surfaceWarmer: '#D2D9E6',
    text: '#0F172A',
    textMuted: '#52607A',
    textFaint: '#94A0B5',
    border: '#DCE2EC',
    borderSoft: '#E8ECF3',
    primary: '#1E3A66',
    primaryDeep: '#0B1F40',
    primarySoft: '#D9E1EF',
    accent: '#B7531A',
    success: '#15803D',
    successSoft: '#DCFCE7',
    info: '#1E40AF',
    warn: '#A16207',
    warnSoft: '#FEF3C7',
    error: '#B91C1C',
    chipBg: '#E2E7F1',
    seal: '#1E3A66',
  },
};

// Default theme for non-tweakable contexts (canvas previews)
let KC_THEME = KC_PALETTES.saffron;
const setKCTheme = (key) => { KC_THEME = KC_PALETTES[key] || KC_PALETTES.saffron; };

// ────────────────────────────────────────────────
// Bilingual label primitive — Hindi top, English below
// ────────────────────────────────────────────────
function BiLabel({ hi, en, size = 'md', align = 'left', muted = false, theme }) {
  const t = theme || KC_THEME;
  const sizes = {
    xs: { hi: 11, en: 9, gap: 0 },
    sm: { hi: 13, en: 10, gap: 1 },
    md: { hi: 15, en: 11, gap: 2 },
    lg: { hi: 19, en: 12, gap: 3 },
    xl: { hi: 24, en: 13, gap: 4 },
    xxl: { hi: 30, en: 14, gap: 5 },
  };
  const s = sizes[size];
  return (
    <div style={{ textAlign: align, lineHeight: 1.2 }}>
      <div style={{
        fontFamily: '"Mukta", system-ui, sans-serif',
        fontWeight: 500, fontSize: s.hi,
        color: muted ? t.textMuted : t.text,
        letterSpacing: '0.005em',
      }}>{hi}</div>
      {en && (
        <div style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 400, fontSize: s.en,
          color: t.textFaint, marginTop: s.gap,
          letterSpacing: '0.01em',
        }}>{en}</div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// Avatar — warm initial circle
// ────────────────────────────────────────────────
function Avatar({ name = '?', size = 44, hue, theme, ring = false, online = false }) {
  const t = theme || KC_THEME;
  const ch = name.charCodeAt(0) || 65;
  const h = hue ?? ((ch * 37 + name.length * 13) % 360);
  const bg = `oklch(0.86 0.05 ${h})`;
  const fg = `oklch(0.32 0.07 ${h})`;
  const initial = (name.match(/[A-Za-z\u0900-\u097F]/) || [''])[0].toUpperCase();
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: bg, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Mukta", sans-serif', fontWeight: 500,
        fontSize: size * 0.38, letterSpacing: 0,
        boxShadow: ring ? `0 0 0 2px ${t.surface}, 0 0 0 3.5px ${t.primary}` : 'none',
      }}>{initial}</div>
      {online && (
        <div style={{
          position: 'absolute', right: 0, bottom: 0,
          width: Math.max(8, size * 0.22), height: Math.max(8, size * 0.22),
          borderRadius: '50%', background: t.success,
          boxShadow: `0 0 0 2px ${t.surface}`,
        }}/>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// Photo placeholder card — warm gradient bg w/ centered initial
// Used for hero photos on profile cards/detail
// ────────────────────────────────────────────────
function PhotoPlaceholder({ name = '?', height = 200, width = '100%', radius = 12, theme, hue, label }) {
  const t = theme || KC_THEME;
  const ch = name.charCodeAt(0) || 65;
  const h = hue ?? ((ch * 37 + name.length * 13) % 360);
  const initial = (name.match(/[A-Za-z\u0900-\u097F]/) || ['?'])[0].toUpperCase();
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: `linear-gradient(135deg, oklch(0.88 0.06 ${h}) 0%, oklch(0.78 0.08 ${(h + 30) % 360}) 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: `oklch(0.3 0.08 ${h})`,
      fontFamily: '"Mukta", sans-serif', fontWeight: 500,
      fontSize: typeof height === 'number' ? height * 0.34 : 64,
      position: 'relative', overflow: 'hidden',
    }}>
      {initial}
      {label && (
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          fontSize: 9, fontFamily: 'ui-monospace, monospace',
          color: `oklch(0.3 0.08 ${h})`, opacity: 0.7,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// Badge — small pill, optional icon
// ────────────────────────────────────────────────
function Badge({ children, kind = 'default', icon, theme }) {
  const t = theme || KC_THEME;
  const styles = {
    default: { bg: t.chipBg, fg: t.textMuted, border: 'transparent' },
    verified: { bg: '#E8F0FE', fg: '#1E40AF', border: 'transparent' },
    success: { bg: t.successSoft, fg: t.success, border: 'transparent' },
    warn: { bg: t.warnSoft, fg: t.warn, border: 'transparent' },
    featured: { bg: t.primarySoft, fg: t.primaryDeep, border: 'transparent' },
    outline: { bg: 'transparent', fg: t.textMuted, border: t.border },
    match: { bg: t.surface, fg: t.primary, border: t.primary },
    premium: { bg: 'linear-gradient(90deg, #C2410C 0%, #7C2D12 100%)', fg: '#FFF', border: 'transparent' },
  };
  const s = styles[kind] || styles.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', borderRadius: 999,
      background: s.bg, color: s.fg,
      border: `1px solid ${s.border}`,
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 10, fontWeight: 500, letterSpacing: '0.02em',
      lineHeight: 1.4, whiteSpace: 'nowrap',
    }}>
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
    </span>
  );
}

// ────────────────────────────────────────────────
// Button
// ────────────────────────────────────────────────
function Button({ children, variant = 'primary', size = 'md', icon, full = false, disabled = false, onClick, theme }) {
  const t = theme || KC_THEME;
  const sizes = {
    sm: { h: 36, px: 12, fs: 13 },
    md: { h: 44, px: 16, fs: 14 },
    lg: { h: 52, px: 20, fs: 15 },
  };
  const s = sizes[size];
  const variants = {
    primary: { bg: t.primary, fg: '#FFF', border: 'transparent' },
    secondary: { bg: t.surface, fg: t.text, border: t.border },
    ghost: { bg: 'transparent', fg: t.primary, border: 'transparent' },
    accent: { bg: t.accent, fg: '#FFF', border: 'transparent' },
    soft: { bg: t.primarySoft, fg: t.primaryDeep, border: 'transparent' },
    danger: { bg: t.error, fg: '#FFF', border: 'transparent' },
    outline: { bg: 'transparent', fg: t.text, border: t.border },
  };
  const v = variants[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height: s.h, padding: `0 ${s.px}px`,
      background: disabled ? t.borderSoft : v.bg,
      color: disabled ? t.textFaint : v.fg,
      border: `1px solid ${v.border}`,
      borderRadius: 10,
      fontFamily: '"Mukta", sans-serif', fontWeight: 500, fontSize: s.fs,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: full ? '100%' : 'auto',
      whiteSpace: 'nowrap',
      transition: 'transform 120ms, background 120ms',
    }}>
      {icon}
      {children}
    </button>
  );
}

// ────────────────────────────────────────────────
// Field — label (bilingual) + input
// ────────────────────────────────────────────────
function Field({ hi, en, value, placeholder, type = 'text', help, error, disabled, theme, children }) {
  const t = theme || KC_THEME;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {hi && <BiLabel hi={hi} en={en} size="sm" theme={t} />}
      {children ?? (
        <div style={{
          height: 48, padding: '0 14px',
          background: disabled ? t.borderSoft : t.surface,
          border: `1px solid ${error ? t.error : t.border}`,
          borderRadius: 10,
          display: 'flex', alignItems: 'center',
          fontFamily: '"Mukta", sans-serif', fontSize: 14,
          color: value ? t.text : t.textFaint,
        }}>
          {value || placeholder}
        </div>
      )}
      {help && !error && <div style={{ fontSize: 11, color: t.textFaint, fontFamily: 'Inter, sans-serif' }}>{help}</div>}
      {error && <div style={{ fontSize: 11, color: t.error, fontFamily: 'Inter, sans-serif' }}>{error}</div>}
    </div>
  );
}

// ────────────────────────────────────────────────
// Card — generic surface
// ────────────────────────────────────────────────
function Card({ children, padding = 16, theme, style = {}, accent = false }) {
  const t = theme || KC_THEME;
  return (
    <div style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding,
      borderLeft: accent ? `3px solid ${t.primary}` : undefined,
      ...style,
    }}>{children}</div>
  );
}

// ────────────────────────────────────────────────
// Progress bar
// ────────────────────────────────────────────────
function ProgressBar({ value = 0, max = 100, theme, height = 4 }) {
  const t = theme || KC_THEME;
  return (
    <div style={{ width: '100%', height, background: t.borderSoft, borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: t.primary, borderRadius: 999, transition: 'width 200ms' }}/>
    </div>
  );
}

// ────────────────────────────────────────────────
// Mandala divider — subtle decorative break
// ────────────────────────────────────────────────
function MandalaDivider({ theme, width = 120 }) {
  const t = theme || KC_THEME;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0.5 }}>
      <div style={{ height: 1, background: t.border, width }}/>
      <svg width="12" height="12" viewBox="0 0 12 12">
        <circle cx="6" cy="6" r="1.5" fill={t.primary} opacity="0.4"/>
        <circle cx="6" cy="6" r="4" fill="none" stroke={t.primary} strokeWidth="0.5" opacity="0.4"/>
      </svg>
      <div style={{ height: 1, background: t.border, width }}/>
    </div>
  );
}

// ────────────────────────────────────────────────
// Section header
// ────────────────────────────────────────────────
function SectionHeader({ hi, en, action, theme }) {
  const t = theme || KC_THEME;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
      <BiLabel hi={hi} en={en} size="md" theme={t} />
      {action && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.primary }}>{action}</div>}
    </div>
  );
}

// ────────────────────────────────────────────────
// Mobile screen frame — fixed 380×744, scrollable inner
// ────────────────────────────────────────────────
function MobileScreen({ children, theme, statusBar = true, bottomNav, padding = 0, scrollable = true }) {
  const t = theme || KC_THEME;
  return (
    <div style={{
      width: 380, height: 744,
      background: t.bg,
      fontFamily: '"Mukta", "Inter", system-ui, sans-serif',
      color: t.text,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {statusBar && <MobileStatusBar theme={t} />}
      <div style={{
        flex: 1, overflow: scrollable ? 'auto' : 'hidden',
        padding,
      }}>{children}</div>
      {bottomNav}
    </div>
  );
}

function MobileStatusBar({ theme, dark = false }) {
  const t = theme || KC_THEME;
  const c = dark ? '#FFF' : t.text;
  return (
    <div style={{
      height: 38, padding: '12px 22px 6px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590,
      fontSize: 13.5, color: c, flexShrink: 0,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="16" height="10" viewBox="0 0 17 11">
          <rect x="0" y="6.5" width="3" height="4" rx="0.5" fill={c}/>
          <rect x="4.3" y="4.5" width="3" height="6" rx="0.5" fill={c}/>
          <rect x="8.6" y="2.5" width="3" height="8" rx="0.5" fill={c}/>
          <rect x="12.9" y="0" width="3" height="10.5" rx="0.5" fill={c}/>
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 11">
          <rect x="0.5" y="0.5" width="19" height="10" rx="3" stroke={c} fill="none" opacity="0.4"/>
          <rect x="2" y="2" width="16" height="7" rx="1.5" fill={c}/>
        </svg>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Bottom nav — 5 tabs
// ────────────────────────────────────────────────
function BottomNav({ active = 'home', theme, badges = {} }) {
  const t = theme || KC_THEME;
  const tabs = [
    { id: 'home', hi: 'घर', en: 'Home', icon: HomeIcon },
    { id: 'search', hi: 'खोज', en: 'Search', icon: SearchIcon },
    { id: 'interests', hi: 'रुचि', en: 'Interests', icon: HeartIcon },
    { id: 'chats', hi: 'चैट', en: 'Chats', icon: ChatIcon },
    { id: 'profile', hi: 'मेरी', en: 'Profile', icon: UserIcon },
  ];
  return (
    <div style={{
      height: 70, background: t.surface,
      borderTop: `1px solid ${t.borderSoft}`,
      display: 'flex', flexShrink: 0,
      padding: '6px 0 14px',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const Icon = tab.icon;
        const badge = badges[tab.id];
        return (
          <div key={tab.id} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: isActive ? t.primary : t.textFaint,
            position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              <Icon size={22} color={isActive ? t.primary : t.textFaint} filled={isActive}/>
              {badge && (
                <div style={{
                  position: 'absolute', top: -3, right: -8,
                  background: t.primary, color: '#FFF',
                  fontSize: 9, fontFamily: 'Inter', fontWeight: 500,
                  padding: '1px 5px', borderRadius: 999, minWidth: 14,
                  textAlign: 'center',
                }}>{badge}</div>
              )}
            </div>
            <div style={{ fontSize: 9.5, fontFamily: 'Inter', fontWeight: 500, letterSpacing: '0.01em' }}>
              {tab.en}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────
// Icons — minimal stroke-based set
// ────────────────────────────────────────────────
const iconBase = (size, color) => ({
  width: size, height: size, fill: 'none', stroke: color, strokeWidth: 1.6,
  strokeLinecap: 'round', strokeLinejoin: 'round',
});
const HomeIcon = ({ size = 20, color = 'currentColor', filled }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z" fill={filled ? color : 'none'} fillOpacity={filled ? 0.12 : 0}/>
  </svg>
);
const SearchIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
  </svg>
);
const HeartIcon = ({ size = 20, color = 'currentColor', filled }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" fill={filled ? color : 'none'} fillOpacity={filled ? 0.12 : 0}/>
  </svg>
);
const ChatIcon = ({ size = 20, color = 'currentColor', filled }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M21 12a8 8 0 11-3.5-6.6L21 4l-1.4 3.5A8 8 0 0121 12z" fill={filled ? color : 'none'} fillOpacity={filled ? 0.12 : 0}/>
  </svg>
);
const UserIcon = ({ size = 20, color = 'currentColor', filled }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <circle cx="12" cy="8" r="4" fill={filled ? color : 'none'} fillOpacity={filled ? 0.12 : 0}/>
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
  </svg>
);
const CheckIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}><path d="M5 12l5 5L20 7"/></svg>
);
const ChevronIcon = ({ size = 16, color = 'currentColor', dir = 'right' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)} style={{ transform: dir === 'left' ? 'rotate(180deg)' : dir === 'down' ? 'rotate(90deg)' : 'none' }}><path d="M9 6l6 6-6 6"/></svg>
);
const PlusIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}><path d="M12 5v14M5 12h14"/></svg>
);
const XIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}><path d="M6 6l12 12M6 18L18 6"/></svg>
);
const ShieldIcon = ({ size = 16, color = 'currentColor', filled }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M12 3l8 3v6c0 5-4 8.5-8 9-4-.5-8-4-8-9V6l8-3z" fill={filled ? color : 'none'} fillOpacity={filled ? 0.12 : 0}/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);
const StarIcon = ({ size = 16, color = 'currentColor', filled }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M12 3l2.6 5.5 5.9.6-4.4 4.1 1.2 6.1L12 16.5l-5.4 2.8 1.2-6.1L3.5 9.1l5.9-.6L12 3z" fill={filled ? color : 'none'} fillOpacity={filled ? 0.15 : 0}/>
  </svg>
);
const BellIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M6 8a6 6 0 1112 0v5l2 3H4l2-3V8z"/><path d="M10 19a2 2 0 004 0"/>
  </svg>
);
const CameraIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M3 8a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
    <circle cx="12" cy="13" r="3.5"/>
  </svg>
);
const PhoneIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/>
  </svg>
);
const LockIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>
  </svg>
);
const EditIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M11 4H5a2 2 0 00-2 2v13a2 2 0 002 2h13a2 2 0 002-2v-6"/><path d="M18.5 2.5a2 2 0 012.8 2.8L12 14.5l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"/>
  </svg>
);
const ArrowIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
const BackIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
);
const KebabIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <circle cx="12" cy="5" r="0.5" fill={color}/><circle cx="12" cy="12" r="0.5" fill={color}/><circle cx="12" cy="19" r="0.5" fill={color}/>
  </svg>
);
const ShareIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/>
  </svg>
);
const SettingsIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" {...iconBase(size, color)}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.5-2.4.9a7 7 0 00-2.1-1.2l-.4-2.5h-4l-.4 2.5a7 7 0 00-2.1 1.2l-2.4-.9-2 3.5 2 1.5a7 7 0 000 2.4l-2 1.5 2 3.5 2.4-.9a7 7 0 002.1 1.2l.4 2.5h4l.4-2.5a7 7 0 002.1-1.2l2.4.9 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z"/>
  </svg>
);

// Export to window
Object.assign(window, {
  KC_PALETTES, KC_THEME, setKCTheme,
  BiLabel, Avatar, PhotoPlaceholder, Badge, Button, Field, Card,
  ProgressBar, MandalaDivider, SectionHeader, MobileScreen, MobileStatusBar, BottomNav,
  HomeIcon, SearchIcon, HeartIcon, ChatIcon, UserIcon, CheckIcon, ChevronIcon,
  PlusIcon, XIcon, ShieldIcon, StarIcon, BellIcon, CameraIcon, PhoneIcon,
  LockIcon, EditIcon, TrashIcon, ArrowIcon, BackIcon, KebabIcon, ShareIcon, SettingsIcon,
});
