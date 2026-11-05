"use client";
import { useEffect, useMemo, useState } from "react";
import { MenuItem } from "@/lib/menu";
import { assetUrl } from "@/lib/shop";
import { TAGS, TAG_KEYS, TXT } from "@/lib/homeMenuText";
import { useLang } from "@/ui/site/L";

const slug = (c: string) => "cat-" + c.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const price = (p: string) => `$${Number(p).toFixed(2)}`;

export function TagChip({ tag, lang, small }: { tag: string; lang: "kh" | "en"; small?: boolean }) {
    const t = TAGS[tag];
    if (!t) return null;
    return (
        <span className={`inline-flex items-center gap-1 rounded-full border border-[#E5902C]/35 bg-[#FFFBEA] font-semibold text-[#8A4F0E] ${small ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-sm"}`}>
            <span aria-hidden="true">{t.icon}</span>{t[lang]}
        </span>
    );
}

export function DishImage({ src, alt }: { src: string | null; alt: string }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) {
        return (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#F3EABF] to-[#E5902C]/30" role="img" aria-label={alt}>
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#E5902C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="13" r="7" /><circle cx="12" cy="13" r="3.5" /><path d="M4 4v6M2.5 4v3a1.5 1.5 0 0 0 3 0V4M21 4c-1.5 1.5-2 3-2 5h2z" />
                </svg>
            </div>
        );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />;
}

export default function MenuBrowser({ items }: { items: MenuItem[] }) {
    const lang = useLang();
    const [q, setQ] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [activeCat, setActiveCat] = useState<string | null>(null);

    const usedTags = useMemo(() => TAG_KEYS.filter(t => items.some(i => i.tags?.includes(t))), [items]);
    const categories = useMemo(() => Array.from(new Set(items.map(i => i.category))), [items]);
    const khCat = useMemo(() => new Map(items.map(i => [i.category, i.category_kh] as const)), [items]);
    const catLabel = (c: string) => (lang === "kh" && khCat.get(c)) || c;

    const needle = q.trim().toLowerCase();
    const shown = useMemo(() => items.filter(i =>
        (!tags.length || tags.every(t => i.tags?.includes(t))) &&
        (!needle || [i.name_en, i.name_kh, i.description_en, i.description_kh, i.category].some(v => (v ?? "").toLowerCase().includes(needle)))
    ), [items, tags, needle]);
    const shownCats = categories.filter(c => shown.some(i => i.category === c));

    // Highlight the category tab for the section currently on screen.
    useEffect(() => {
        const els = shownCats.map(c => document.getElementById(slug(c))).filter(Boolean) as HTMLElement[];
        if (!els.length || typeof IntersectionObserver === "undefined") return;
        const io = new IntersectionObserver(entries => {
            const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
            if (vis) setActiveCat(vis.target.getAttribute("data-cat"));
        }, { rootMargin: "-130px 0px -60% 0px" });
        els.forEach(e => io.observe(e));
        return () => io.disconnect();
    }, [shown.length, q, tags.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

    if (items.length === 0) {
        return <p className="py-24 text-center text-lg text-[#8A4F0E]">{TXT.soon[lang]}</p>;
    }
    const filtering = !!needle || tags.length > 0;
    const toggle = (t: string) => setTags(cur => cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);

    return (
        <div>
            {/* Search + tag filters */}
            <div className="mx-auto mb-6 max-w-3xl">
                <div className="relative">
                    <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#E5902C]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
                    <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={TXT.search[lang]} aria-label={TXT.search[lang]}
                        className="w-full rounded-full border border-[#E5902C] bg-[#FFFBEA] py-3 pl-12 pr-4 text-[#4A3412] placeholder:text-[#E5902C]/70 shadow-sm focus:border-[#E5902C] focus:ring-1 focus:ring-[#E5902C]" />
                </div>
                {usedTags.length ? (
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter">
                        {usedTags.map(t => (
                            <button key={t} type="button" aria-pressed={tags.includes(t)} onClick={() => toggle(t)}
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${tags.includes(t) ? "border-[#E5902C] bg-[#E5902C] text-[#FFFBEA]" : "border-[#E5902C]/50 bg-[#FFFBEA] text-[#8A4F0E] hover:bg-[#E5902C]/15"}`}>
                                <span aria-hidden="true">{TAGS[t].icon}</span>{TAGS[t][lang]}
                            </button>
                        ))}
                        {filtering ? <button type="button" onClick={() => { setQ(""); setTags([]); }} className="px-2 text-sm font-semibold text-[#8A4F0E] underline">{TXT.clear[lang]}</button> : null}
                    </div>
                ) : null}
            </div>

            {/* Sticky category tabs (under the site header) */}
            <nav aria-label="Menu categories" className="sticky top-[68px] z-30 -mx-5 mb-8 border-y border-[#E5902C]/20 bg-[#F3EABF]/95 px-5 py-2.5 backdrop-blur">
                <ul className="flex gap-2 overflow-x-auto md:justify-center [scrollbar-width:none]">
                    {shownCats.map(c => (
                        <li key={c} className="shrink-0">
                            <a href={`#${slug(c)}`} aria-current={activeCat === c ? "true" : undefined}
                                className={`block rounded-full border px-4 py-1.5 text-sm font-semibold transition ${activeCat === c ? "border-[#E5902C] bg-[#E5902C] text-[#FFFBEA]" : "border-[#E5902C]/60 text-[#8A4F0E] hover:bg-[#E5902C]/15"}`}>
                                {catLabel(c)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <p className="sr-only" role="status" aria-live="polite">{shown.length} {TXT.dishes.en}</p>
            {shown.length === 0 ? <p className="py-16 text-center text-lg text-[#8A4F0E]">{TXT.noMatch[lang]}</p> : null}

            {shownCats.map(category => (
                <section key={category} id={slug(category)} data-cat={category} className="mb-12 scroll-mt-36">
                    <h2 className="mb-5 flex items-center gap-4 text-2xl font-bold text-[#E5902C] md:text-3xl">
                        {catLabel(category)}
                        <span aria-hidden="true" className="h-px flex-1 bg-[#E5902C]/30" />
                    </h2>
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {shown.filter(i => i.category === category).map(item => {
                            const name = (lang === "kh" ? item.name_kh || item.name_en : item.name_en || item.name_kh) ?? "";
                            const desc = lang === "kh" ? item.description_kh || item.description_en : item.description_en || item.description_kh;
                            return (
                                <li key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E5902C]/15">
                                        <DishImage src={assetUrl(item.image_url)} alt={name} />
                                        {item.chefs_pick ? (
                                            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#4A3412] px-3 py-1 text-xs font-bold text-[#FFFBEA] shadow">
                                                <span aria-hidden="true">★</span>{TXT.chefsPick[lang]}
                                            </span>
                                        ) : null}
                                        <span className="absolute bottom-3 right-3 rounded-full bg-[#E5902C] px-3 py-1 text-sm font-bold text-[#FFFBEA] shadow">{price(item.price)}</span>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2 p-4">
                                        <h3 className="text-lg font-bold leading-snug text-[#4A3412]">{name}</h3>
                                        {desc ? <p className="line-clamp-3 text-sm text-[#6b4a1f]">{desc}</p> : null}
                                        {item.tags?.length ? <div className="mt-auto flex flex-wrap gap-1.5 pt-1">{item.tags.map(t => <TagChip key={t} tag={t} lang={lang} small />)}</div> : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ))}
        </div>
    );
}
