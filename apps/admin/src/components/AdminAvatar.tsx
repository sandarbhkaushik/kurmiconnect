interface AdminAvatarProps {
  name: string;
  size?: number;
  hue?: number;
}

export default function AdminAvatar({ name, size = 32, hue = 20 }: AdminAvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: `hsl(${hue}, 48%, 82%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: `hsl(${hue}, 40%, 30%)`,
        fontFamily: '"Mukta", sans-serif',
        fontSize: size * 0.4,
        fontWeight: 500,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
