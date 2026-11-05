"use client";
import { useId, useMemo, useState } from "react";
import { L, useLang, usePick } from "@/ui/site/L";
import { ButtonLink, Card, inputClass } from "@/ui/site/kit";

export type FaqItem = { id: number; question_en: string; question_kh: string | null; answer_en: string; answer_kh: string | null };

export default function FaqList({ items }: { items: FaqItem[] }) {
    const t = usePick();
    const lang = useLang();
    const uid = useId();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState<Set<number>>(new Set());

    const q = query.trim().toLowerCase();
    const shown = useMemo(() => !q ? items : items.filter(it =>
        [it.question_en, it.question_kh, it.answer_en, it.answer_kh].some(s => s && s.toLowerCase().includes(q))), [items, q]);

    const toggle = (id: number) => setOpen(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    const allOpen = shown.length > 0 && shown.every(it => open.has(it.id));

    return (
        <div className="mx-auto max-w-3xl">
            {items.length > 0 && (
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex-1">
                        <label htmlFor={`${uid}-search`} className="mb-1 block text-sm font-semibold text-[#4A3412]"><L en="Search questions" kh="ស្វែងរកសំណួរ" /></label>
                        <input id={`${uid}-search`} type="search" value={query} onChange={e => setQuery(e.target.value)}
                            placeholder={lang === "kh" ? "វាយពាក្យ ដូចជា ចតរថយន្ត" : "Type a word, e.g. parking"} className={inputClass} autoComplete="off" />
                    </div>
                    {shown.length > 1 && (
                        <button type="button" onClick={() => setOpen(allOpen ? new Set() : new Set(shown.map(i => i.id)))}
                            className="rounded-full border-2 border-[#E5902C] px-5 py-2.5 text-sm font-semibold text-[#8A4F0E] transition hover:bg-[#E5902C]/10 focus:outline-none focus:ring-2 focus:ring-[#E5902C]">
                            {allOpen ? <L en="Collapse all" kh="បិទទាំងអស់" /> : <L en="Expand all" kh="បើកទាំងអស់" />}
                        </button>
                    )}
                </div>
            )}

            <p className="sr-only" role="status" aria-live="polite">{q ? (lang === "kh" ? `រកឃើញ ${shown.length} សំណួរ` : `${shown.length} question${shown.length === 1 ? "" : "s"} found`) : ""}</p>

            {items.length === 0 ? (
                <Card className="text-center">
                    <p className="text-lg font-semibold text-[#4A3412]"><L en="Questions are coming soon" kh="សំណួរនឹងមកដល់ឆាប់ៗនេះ" /></p>
                </Card>
            ) : shown.length === 0 ? (
                <Card className="text-center">
                    <p className="font-semibold text-[#4A3412]"><L en="No questions match your search." kh="គ្មានសំណួរដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។" /></p>
                </Card>
            ) : (
                <ul className="space-y-3">
                    {shown.map(it => {
                        const isOpen = open.has(it.id);
                        const bid = `${uid}-q${it.id}`;
                        return (
                            <li key={it.id} className="overflow-hidden rounded-2xl border border-[#E5902C]/30 bg-[#FFFBEA] shadow-[0_8px_24px_-14px_rgba(150,90,20,.35)]">
                                <h3>
                                    <button type="button" id={`${bid}-btn`} aria-expanded={isOpen} aria-controls={`${bid}-panel`} onClick={() => toggle(it.id)}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[#4A3412] transition hover:bg-[#E5902C]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E5902C] md:text-lg">
                                        <span>{t(it, "question")}</span>
                                        <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E5902C]/15 text-[#E5902C] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                                        </span>
                                    </button>
                                </h3>
                                <div id={`${bid}-panel`} role="region" aria-labelledby={`${bid}-btn`} hidden={!isOpen}
                                    className="whitespace-pre-line border-t border-[#E5902C]/20 px-5 pb-5 pt-4 leading-relaxed text-[#5b3d12]">
                                    {t(it, "answer")}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <Card className="mt-10 flex flex-col items-center gap-3 text-center">
                <h2 className="text-xl font-bold text-[#4A3412]"><L en="Still need help?" kh="នៅត្រូវការជំនួយទេ?" /></h2>
                <p className="max-w-md text-[#8A4F0E]"><L en="Can't find your answer? Send us a message or call us, we are happy to help." kh="រកមិនឃើញចម្លើយ? សូមផ្ញើសារ ឬទូរស័ព្ទមកយើង យើងរីករាយជួយ។" /></p>
                <ButtonLink href="/contact"><L en="Contact us" kh="ទាក់ទងយើង" /></ButtonLink>
            </Card>
        </div>
    );
}
