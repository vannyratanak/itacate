"use client";
import { useEffect, useState } from "react";
import { DAY_NAMES, DayHours } from "@/lib/settings";
import { TXT } from "@/lib/homeMenuText";
import { useLang } from "@/ui/site/L";

const mins = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

// "Now" in the restaurant's timezone, not the visitor's.
function nowInPhnomPenh(): { day: number; minutes: number } {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Phnom_Penh", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    const get = (t: string) => parts.find(p => p.type === t)?.value ?? "";
    const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
    return { day: day < 0 ? 0 : day, minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

export function isOpen(hours: DayHours[], day: number, minutes: number) {
    const today = hours[day], prev = hours[(day + 6) % 7];
    if (today && !today.closed) {
        const o = mins(today.open), c = mins(today.close);
        if (o <= c ? minutes >= o && minutes < c : minutes >= o) return true;
    }
    if (prev && !prev.closed && mins(prev.open) > mins(prev.close) && minutes < mins(prev.close)) return true; // overnight from yesterday
    return false;
}

export default function HoursCard({ hours }: { hours: DayHours[] }) {
    const lang = useLang();
    const [now, setNow] = useState<{ day: number; minutes: number } | null>(null);
    useEffect(() => { setNow(nowInPhnomPenh()); const id = setInterval(() => setNow(nowInPhnomPenh()), 60000); return () => clearInterval(id); }, []);
    const open = now ? isOpen(hours, now.day, now.minutes) : null;
    return (
        <div className="rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] p-6 shadow-[0_10px_30px_-14px_rgba(150,90,20,.35)]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-[#4A3412]">{TXT.hours[lang]}</h3>
                {open === null ? null : (
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${open ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`} role="status">
                        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {open ? TXT.openNow[lang] : TXT.closedNow[lang]}
                    </span>
                )}
            </div>
            <ul className="divide-y divide-[#E5902C]/15">
                {hours.map(d => {
                    const isToday = now?.day === d.day;
                    return (
                        <li key={d.day} className={`flex justify-between gap-4 py-2 text-sm ${isToday ? "font-bold text-[#4A3412]" : "text-[#6b4a1f]"}`}>
                            <span>{DAY_NAMES[lang][d.day]}{isToday ? ` · ${TXT.today[lang]}` : ""}</span>
                            <span>{d.closed ? TXT.closed[lang] : `${d.open} – ${d.close}`}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
