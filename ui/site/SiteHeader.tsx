"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LangSwitch from "@/ui/LangSwitch";
import { MAIN_NAV } from "@/lib/nav";
import { L } from "@/ui/site/L";

export default function SiteHeader({ name, logo, notice }: { name: string; logo: string; notice: string | null }) {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const active = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
    return (
        <header className="sticky top-0 z-40 border-b border-[#E5902C]/25 bg-[#FBF5DC]/95 backdrop-blur">
            {notice ? <div className="bg-[#E5902C] px-4 py-1.5 text-center text-sm font-semibold text-[#FFFBEA]">{notice}</div> : null}
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
                <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                    <Image src={logo} alt="" width={44} height={44} unoptimized className="h-11 w-11 rounded-full object-contain" />
                    <span className="text-lg font-bold text-[#4A3412]">{name}</span>
                </Link>
                <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
                    {MAIN_NAV.map(i => (
                        <Link key={i.href} href={i.href} aria-current={active(i.href) ? "page" : undefined}
                            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${active(i.href) ? "bg-[#E5902C] text-[#FFFBEA]" : "text-[#8A4F0E] hover:bg-[#E5902C]/15"}`}>
                            <L en={i.en} kh={i.kh} />
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <LangSwitch />
                    <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[#E5902C] text-[#8A4F0E] lg:hidden"
                        aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
                    </button>
                </div>
            </div>
            {open ? (
                <nav aria-label="Mobile" className="border-t border-[#E5902C]/25 bg-[#FBF5DC] px-5 pb-4 lg:hidden">
                    {MAIN_NAV.map(i => (
                        <Link key={i.href} href={i.href} onClick={() => setOpen(false)}
                            className={`block rounded-lg px-3 py-3 text-base font-semibold ${active(i.href) ? "bg-[#E5902C] text-[#FFFBEA]" : "text-[#8A4F0E]"}`}>
                            <L en={i.en} kh={i.kh} />
                        </Link>
                    ))}
                </nav>
            ) : null}
        </header>
    );
}
