// Generated placeholder portraits (no photos needed): swap for real photos later.
type Props = { bg: string; skin: string; hair: string; style: 0 | 1 | 2 | 3; label: string };

export default function Avatar({ bg, skin, hair, style, label }: Props) {
    return (
        <svg viewBox="0 0 120 120" role="img" aria-label={label} className="h-28 w-28 rounded-full shadow-md ring-4 ring-[#FFFBEA]">
            <rect width="120" height="120" fill={bg} />
            <path d="M18 120c2-26 20-40 42-40s40 14 42 40z" fill="#4A3412" opacity=".85" />
            <rect x="52" y="66" width="16" height="16" rx="6" fill={skin} />
            {style === 1 ? <path d="M30 62c-4-30 12-46 30-46s34 16 30 46c-6-14-14-22-30-22S36 48 30 62z" fill={hair} /> : null}
            {style === 3 ? <circle cx="60" cy="30" r="14" fill={hair} /> : null}
            <ellipse cx="60" cy="52" rx="23" ry="26" fill={skin} />
            {style === 0 ? <path d="M36 50c-2-22 12-30 24-30s26 8 24 30c-4-10-12-14-24-14s-20 4-24 14z" fill={hair} /> : null}
            {style === 2 ? <path d="M36 48c0-20 12-26 24-26s24 6 24 26c-6-8-14-10-24-10s-18 2-24 10z" fill={hair} /> : null}
            {style === 3 ? <path d="M37 48c0-16 10-22 23-22s23 6 23 22c-6-6-12-8-23-8s-17 2-23 8z" fill={hair} /> : null}
            <circle cx="51" cy="54" r="2.4" fill="#2b1a05" /><circle cx="69" cy="54" r="2.4" fill="#2b1a05" />
            <path d="M52 64c4 4 12 4 16 0" stroke="#2b1a05" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
    );
}
