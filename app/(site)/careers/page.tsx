import { apiGet } from "@/lib/api";
import JobBoard, { Job } from "@/ui/careers/JobBoard";
import { PERKS } from "@/ui/careers/perks";
import { Card, PageHero, Section } from "@/ui/site/kit";
import { L } from "@/ui/site/L";

export const dynamic = "force-dynamic";
export const metadata = { title: "Careers", description: "Join our team" };

export default async function CareersPage() {
    const jobs = await apiGet<Job[]>("/careers", []);
    return (
        <>
            <PageHero
                title={<L en="Join our team" kh="ចូលរួមជាមួយក្រុមរបស់យើង" />}
                subtitle={<L en="Good food is made by good people. Come and be part of our family." kh="ម្ហូបឆ្ងាញ់កើតចេញពីមនុស្សល្អ។ សូមចូលមកជាផ្នែកមួយនៃគ្រួសាររបស់យើង។" />}
            />
            <Section tone="soft" title={<L en="Why work with us" kh="ហេតុអ្វីបានជាធ្វើការជាមួយយើង" />}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PERKS.map(p => (
                        <Card key={p.en} className="text-center">
                            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#E5902C]/15 text-[#E5902C]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.icon} /></svg>
                            </div>
                            <p className="font-semibold text-[#4A3412]"><L en={p.en} kh={p.kh} /></p>
                        </Card>
                    ))}
                </div>
            </Section>
            <Section title={<L en="Open positions" kh="មុខតំណែងដែលកំពុងជ្រើសរើស" />}>
                <JobBoard jobs={jobs} />
            </Section>
        </>
    );
}
