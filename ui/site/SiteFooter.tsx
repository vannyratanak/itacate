"use client";
import Link from "next/link";
import { DAY_NAMES, Settings } from "@/lib/settings";
import { LEGAL_NAV, MAIN_NAV, MORE_NAV } from "@/lib/nav";
import { L, useLang } from "@/ui/site/L";

export default function SiteFooter({ name, settings }: { name: string; settings: Settings }) {
    const lang = useLang();
    const socials = [["Facebook", settings.facebook], ["Instagram", settings.instagram], ["Telegram", settings.telegram], ["TikTok", settings.tiktok]].filter(([, u]) => u) as [string, string][];
    return (
        <footer className="mt-16 border-t border-[#E5902C]/30 bg-[#4A3412] text-[#F3EABF]">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-4">
                <div>
                    <div className="text-xl font-bold text-[#FFFBEA]">{name}</div>
                    <p className="mt-3 text-sm leading-relaxed text-[#F3EABF]/80">{lang === "kh" ? settings.address_kh || settings.address_en : settings.address_en}</p>
                    {settings.phone ? <a className="mt-2 block text-sm font-semibold hover:underline" href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a> : null}
                    {settings.email ? <a className="block text-sm hover:underline" href={`mailto:${settings.email}`}>{settings.email}</a> : null}
                    <div className="mt-4 flex flex-wrap gap-3">{socials.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#F3EABF]/40 px-3 py-1 text-xs font-semibold hover:bg-[#F3EABF]/10">{n}</a>)}</div>
                </div>
                <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#E5902C]"><L en="Opening hours" kh="ម៉ោងបើក" /></h3>
                    <ul className="space-y-1 text-sm">
                        {settings.hours.map(d => (
                            <li key={d.day} className="flex justify-between gap-3"><span>{DAY_NAMES[lang][d.day]}</span><span className="text-[#F3EABF]/80">{d.closed ? (lang === "kh" ? "បិទ" : "Closed") : `${d.open} – ${d.close}`}</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#E5902C]"><L en="Explore" kh="ស្វែងរក" /></h3>
                    <ul className="space-y-1.5 text-sm">{MAIN_NAV.map(i => <li key={i.href}><Link className="hover:underline" href={i.href}><L en={i.en} kh={i.kh} /></Link></li>)}</ul>
                </div>
                <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#E5902C]"><L en="More" kh="ផ្សេងៗ" /></h3>
                    <ul className="space-y-1.5 text-sm">{MORE_NAV.map(i => <li key={i.href}><Link className="hover:underline" href={i.href}><L en={i.en} kh={i.kh} /></Link></li>)}</ul>
                </div>
            </div>
            <div className="border-t border-[#F3EABF]/15 px-5 py-4 text-center text-xs text-[#F3EABF]/70">
                © {new Date().getFullYear()} {name} · {LEGAL_NAV.map((i, k) => <span key={i.href}>{k ? " · " : ""}<Link className="hover:underline" href={i.href}><L en={i.en} kh={i.kh} /></Link></span>)}
            </div>
        </footer>
    );
}
