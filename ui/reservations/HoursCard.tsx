"use client";
import { DAY_NAMES, Settings } from "@/lib/settings";
import { L, useLang } from "@/ui/site/L";
import { Card } from "@/ui/site/kit";
import { T } from "./text";

export default function HoursCard({ settings }: { settings: Settings }) {
    const lang = useLang();
    const today = (new Date().getDay() + 6) % 7; // Monday = 0
    return (
        <Card>
            <h2 className="text-lg font-bold text-[#4A3412]"><L en={T.hours.en} kh={T.hours.kh} /></h2>
            <ul className="mt-3 space-y-1.5 text-sm">
                {settings.hours.map(d => (
                    <li key={d.day} className={`flex justify-between gap-3 rounded-md px-2 py-1 ${d.day === today ? "bg-[#E5902C]/15 font-bold text-[#4A3412]" : "text-[#8A4F0E]"}`}>
                        <span>{DAY_NAMES[lang][d.day]}</span>
                        <span>{d.closed ? (lang === "kh" ? T.closedDay.kh : T.closedDay.en) : `${d.open} – ${d.close}`}</span>
                    </li>
                ))}
            </ul>
            {settings.phone ? (
                <div className="mt-5 border-t border-[#E5902C]/25 pt-4 text-sm">
                    <div className="text-[#8A4F0E]"><L en={T.callUs.en} kh={T.callUs.kh} /></div>
                    <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="mt-1 block text-xl font-bold text-[#4A3412] hover:underline">{settings.phone}</a>
                </div>
            ) : null}
        </Card>
    );
}
