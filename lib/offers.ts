export type Offer = {
    id: number; kind: "offer" | "event";
    title_en: string; title_kh: string | null; body_en: string | null; body_kh: string | null;
    image_url: string | null; starts_at: string | null; ends_at: string | null;
};
export type Review = { id: number; message: string; first_name: string; created_at: string; score: number | null };
export type ReviewSummary = { responses: number; approved: number; average: number | null };

// Dates are shown in Cambodian time, formatted by hand (no locale data), so server and browser always render identical text.
const KH_MONTHS = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const khDigits = (n: number | string) => String(n).replace(/\d/g, d => "០១២៣៤៥៦៧៨៩"[Number(d)]);
const PARTS = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

export function formatDate(iso: string | null, lang: "kh" | "en", withTime = false): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const p = Object.fromEntries(PARTS.formatToParts(d).map(x => [x.type, x.value]));
    const day = Number(p.day), month = Number(p.month) - 1, year = Number(p.year);
    const time = withTime ? `${p.hour}:${p.minute}` : "";
    if (lang === "kh") return `${khDigits(day)} ${KH_MONTHS[month]} ${khDigits(year)}${time ? " " + khDigits(time) : ""}`;
    return `${day} ${EN_MONTHS[month]} ${year}${time ? ", " + time : ""}`;
}

// "12 Nov – 30 Nov 2026" style range; one side missing -> "Until ..." / "From ..."
export function formatRange(start: string | null, end: string | null, lang: "kh" | "en"): string {
    const s = formatDate(start, lang), e = formatDate(end, lang);
    if (s && e) return s === e ? s : `${s} – ${e}`;
    if (e) return (lang === "kh" ? "ដល់ " : "Until ") + e;
    if (s) return (lang === "kh" ? "ចាប់ពី " : "From ") + s;
    return lang === "kh" ? "គ្រប់ពេល" : "Always on";
}
