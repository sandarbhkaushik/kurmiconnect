import { t } from '@/lib/theme';

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type BtnSize = 'sm' | 'md';

interface ABtnProps {
  variant?: BtnVariant;
  size?: BtnSize;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function ABtn({ variant = 'primary', size = 'sm', onClick, children }: ABtnProps) {
  const variants: Record<BtnVariant, { bg: string; fg: string; border: string }> = {
    primary: { bg: t.primary, fg: '#FFF', border: 'transparent' },
    secondary: { bg: t.surface, fg: t.text, border: t.border },
    ghost: { bg: 'transparent', fg: t.text, border: 'transparent' },
    danger: { bg: t.errorSoft, fg: t.error, border: 'transparent' },
    success: { bg: t.successSoft, fg: t.success, border: 'transparent' },
  };
  const sizes: Record<BtnSize, { h: number; fs: number; px: number }> = {
    sm: { h: 30, fs: 12, px: 12 },
    md: { h: 36, fs: 13, px: 16 },
  };
  const v = variants[variant];
  const s = sizes[size];
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        height: s.h, padding: `0 ${s.px}px`,
        background: v.bg, color: v.fg, border: `1px solid ${v.border}`,
        borderRadius: 7, fontFamily: '"Mukta", sans-serif', fontSize: s.fs, fontWeight: 500,
        whiteSpace: 'nowrap', cursor: 'pointer',
      }}
    >{children}</div>
  );
}
