// 0-5 stars, filled proportionally (4.3 fills 86% of the row). Decorative: the number is also given as text.
export default function Stars({ score, size = 18 }: { score: number | null; size?: number }) {
    const pct = score == null ? 0 : Math.max(0, Math.min(5, score)) / 5 * 100;
    const row = (color: string) => (
        <span style={{ color, fontSize: size, letterSpacing: 2, lineHeight: 1 }} aria-hidden="true">★★★★★</span>
    );
    return (
        <span className="relative inline-block whitespace-nowrap" role="img" aria-label={score == null ? "No rating" : `${score} out of 5 stars`}>
            {row("#E5902C33")}
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>{row("#E5902C")}</span>
        </span>
    );
}
