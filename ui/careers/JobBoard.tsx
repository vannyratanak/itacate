"use client";
import { useState } from "react";
import { Card } from "@/ui/site/kit";
import { L, usePick } from "@/ui/site/L";
import ApplyForm from "@/ui/careers/ApplyForm";

export type Job = {
    id: number; title_en: string; title_kh: string | null; type_en: string | null; type_kh: string | null;
    description_en: string | null; description_kh: string | null;
};

export default function JobBoard({ jobs }: { jobs: Job[] }) {
    const pick = usePick();
    const [open, setOpen] = useState<number | null>(null);      // job whose details are expanded
    const [applying, setApplying] = useState<number | null>(null); // job whose form is showing
    const [general, setGeneral] = useState(false);

    return (
        <div className="mx-auto max-w-3xl space-y-4">
            {jobs.length === 0 ? (
                <Card className="text-center">
                    <p className="text-lg font-semibold text-[#4A3412]"><L en="No open positions right now." kh="បច្ចុប្បន្នមិនមានមុខតំណែងបើកជ្រើសរើសទេ" /></p>
                    <p className="mt-1 text-[#8A4F0E]"><L en="Send us your details below and we will keep them on file." kh="សូមផ្ញើព័ត៌មានរបស់អ្នកខាងក្រោម ហើយយើងនឹងរក្សាទុក។" /></p>
                </Card>
            ) : jobs.map(j => {
                const expanded = open === j.id || applying === j.id;
                const panel = `job-panel-${j.id}`;
                return (
                    <Card key={j.id}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <button type="button" aria-expanded={expanded} aria-controls={panel}
                                onClick={() => { setOpen(expanded ? null : j.id); if (expanded) setApplying(null); }}
                                className="flex min-w-0 flex-1 items-center gap-3 text-left">
                                <svg className={`h-5 w-5 shrink-0 text-[#E5902C] transition-transform ${expanded ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.5 6l6 6-6 6" /></svg>
                                <span className="min-w-0">
                                    <span className="block text-lg font-bold text-[#4A3412]">{pick(j, "title")}</span>
                                    {pick(j, "type") ? <span className="mt-0.5 inline-block rounded-full bg-[#E5902C]/15 px-3 py-0.5 text-xs font-semibold text-[#8A4F0E]">{pick(j, "type")}</span> : null}
                                </span>
                            </button>
                            {applying !== j.id ? (
                                <button type="button" onClick={() => { setOpen(j.id); setApplying(j.id); }}
                                    className="rounded-full bg-[#E5902C] px-5 py-2 text-sm font-bold text-[#FFFBEA] shadow hover:bg-[#d4801f] focus:outline-none focus:ring-2 focus:ring-[#E5902C] focus:ring-offset-2">
                                    <L en="Apply" kh="ដាក់ពាក្យ" />
                                </button>
                            ) : null}
                        </div>
                        {expanded ? (
                            <div id={panel} className="mt-4 border-t border-[#E5902C]/25 pt-4">
                                {pick(j, "description") ? <p className="whitespace-pre-line leading-relaxed text-[#4A3412]">{pick(j, "description")}</p> : null}
                                {applying === j.id ? <div className="relative mt-5"><ApplyForm jobId={j.id} onCancel={() => setApplying(null)} /></div> : null}
                            </div>
                        ) : null}
                    </Card>
                );
            })}

            <Card className="relative bg-[#F7EDC6]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-bold text-[#4A3412]"><L en="Don't see a role that fits?" kh="មិនឃើញតួនាទីដែលសមនឹងអ្នកទេ?" /></h3>
                        <p className="text-sm text-[#8A4F0E]"><L en="Send us your details and we will keep them on file." kh="ផ្ញើព័ត៌មានរបស់អ្នកមកយើង ហើយយើងនឹងរក្សាទុក។" /></p>
                    </div>
                    {!general ? (
                        <button type="button" onClick={() => setGeneral(true)} aria-expanded={general}
                            className="rounded-full border-2 border-[#E5902C] px-5 py-2 text-sm font-bold text-[#8A4F0E] hover:bg-[#E5902C]/10 focus:outline-none focus:ring-2 focus:ring-[#E5902C] focus:ring-offset-2">
                            <L en="Send your details" kh="ផ្ញើព័ត៌មានរបស់អ្នក" />
                        </button>
                    ) : null}
                </div>
                {general ? <div className="relative mt-5 border-t border-[#E5902C]/25 pt-5"><ApplyForm jobId={null} onCancel={() => setGeneral(false)} /></div> : null}
            </Card>
        </div>
    );
}
