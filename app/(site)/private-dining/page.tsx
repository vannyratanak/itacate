import { Card, Container, PageHero, Section } from "@/ui/site/kit";
import CateringForm from "@/ui/messages/CateringForm";
import { T } from "@/ui/messages/T";
import { TxtKey } from "@/ui/messages/text";

export const metadata = { title: "Private dining & catering", description: "Birthdays, weddings and company dinners at Itacate or at your place." };

// Placeholder packages (the text lives in ui/messages/text.ts).
const PACKAGES: { title: TxtKey; cap: TxtKey; desc: TxtKey; items: TxtKey[]; icon: string }[] = [
    { title: "pk1", cap: "pk1cap", desc: "pk1d", items: ["pk1a", "pk1b", "pk1c"], icon: "M4 11h16M6 11v8M18 11v8M8 7a4 4 0 018 0M3 19h18" },
    { title: "pk2", cap: "pk2cap", desc: "pk2d", items: ["pk2a", "pk2b", "pk2c", "pk2e"], icon: "M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z" },
    { title: "pk3", cap: "pk3cap", desc: "pk3d", items: ["pk3a", "pk3b", "pk3c", "pk3e"], icon: "M3 12a9 9 0 0118 0M3 12h18M12 3v2M7 21h10M9 12v9m6-9v9" },
];

export default function PrivateDiningPage() {
    return (
        <>
            <PageHero title={<T k="pdTitle" />} subtitle={<T k="pdSub" />} />
            <Section title={<T k="packages" />} subtitle={<T k="packagesSub" />}>
                <div className="grid gap-6 md:grid-cols-3">
                    {PACKAGES.map(p => (
                        <Card key={p.title} className="flex flex-col">
                            <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#E5902C] text-[#FFFBEA]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.icon} /></svg>
                            </span>
                            <h3 className="text-xl font-bold text-[#4A3412]"><T k={p.title} /></h3>
                            <p className="mt-1 text-sm font-bold uppercase tracking-wider text-[#E5902C]"><span className="sr-only"><T k="capacity" />: </span><T k={p.cap} /></p>
                            <p className="mt-3 text-[#4A3412]/90"><T k={p.desc} /></p>
                            <h4 className="mb-2 mt-5 text-xs font-bold uppercase tracking-widest text-[#8A4F0E]"><T k="included" /></h4>
                            <ul className="space-y-1.5 text-[#4A3412]">
                                {p.items.map(i => (
                                    <li key={i} className="flex gap-2"><svg className="mt-1 h-4 w-4 flex-none text-[#E5902C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg><span><T k={i} /></span></li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Section>
            <Section tone="soft" className="scroll-mt-20">
                <Container className="grid max-w-5xl gap-8 !px-0 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-[#4A3412] md:text-3xl"><T k="pdFormTitle" /></h2>
                        <p className="mt-3 text-[#8A4F0E]"><T k="quoteNote" /></p>
                    </div>
                    <Card className="p-6 md:p-8 lg:col-span-3"><CateringForm /></Card>
                </Container>
            </Section>
        </>
    );
}
