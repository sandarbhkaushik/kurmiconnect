import { t } from '@/lib/theme';

type PillKind = 'success' | 'error' | 'warn' | 'info' | 'default' | 'primary';

interface APillProps {
  kind?: PillKind;
  children: React.ReactNode;
}

export default function APill({ kind = 'default', children }: APillProps) {
  const styles: Record<PillKind, { bg: string; fg: string }> = {
    default: { bg: t.borderSoft, fg: t.textMuted },
    success: { bg: t.successSoft, fg: t.success },
    warn: { bg: t.warnSoft, fg: t.warn },
    error: { bg: t.errorSoft, fg: t.error },
    info: { bg: t.infoSoft, fg: t.info },
    primary: { bg: t.primarySoft, fg: t.primaryDeep },
  };
  const s = styles[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 7px', borderRadius: 4,
      background: s.bg, color: s.fg,
      fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500,
      whiteSpace: 'nowrap', letterSpacing: '0.01em',
    }}>{children}</span>
  );
}
