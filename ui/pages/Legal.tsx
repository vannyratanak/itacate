import { ReactNode } from "react";
import { Container, PageHero } from "@/ui/site/kit";
import { L } from "@/ui/site/L";

export type Bi = { en: string; kh: string };
export type LegalSection = { title: Bi; body: Bi[]; list?: Bi[] };

// Shared layout for the legal pages: hero, "last updated" line, numbered sections.
export default function Legal({ title, intro, updated, sections, footer }: { title: Bi; intro: Bi; updated: Bi; sections: LegalSection[]; footer?: ReactNode }) {
    return (
        <>
            <PageHero title={<L en={title.en} kh={title.kh} />} subtitle={<L en={intro.en} kh={intro.kh} />} />
            <Container className="max-w-3xl py-12 md:py-16">
                <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-[#E5902C]"><L en={updated.en} kh={updated.kh} /></p>
                <div className="space-y-10">
                    {sections.map((s, i) => (
                        <section key={i} aria-labelledby={`sec-${i}`}>
                            <h2 id={`sec-${i}`} className="mb-3 text-xl font-bold text-[#4A3412] md:text-2xl">
                                <span className="mr-2 text-[#E5902C]">{i + 1}.</span><L en={s.title.en} kh={s.title.kh} />
                            </h2>
                            {s.body.map((p, k) => <p key={k} className="mb-3 leading-relaxed text-[#4A3412]/90"><L en={p.en} kh={p.kh} /></p>)}
                            {s.list ? (
                                <ul className="ml-5 list-disc space-y-1.5 text-[#4A3412]/90">
                                    {s.list.map((li, k) => <li key={k}><L en={li.en} kh={li.kh} /></li>)}
                                </ul>
                            ) : null}
                        </section>
                    ))}
                </div>
                {footer}
            </Container>
        </>
    );
}
