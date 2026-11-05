"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/lib/menu";
import { Settings } from "@/lib/settings";
import { TXT } from "@/lib/homeMenuText";
import { assetUrl } from "@/lib/shop";
import { useLang } from "@/ui/site/L";
import { ButtonLink, Container, Section } from "@/ui/site/kit";
import HoursCard from "@/ui/home/HoursCard";
import { DishImage, TagChip } from "@/ui/menu/MenuBrowser";

const Icon = ({ d }: { d: string }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const FEATURES = [
    { t: TXT.f1, d: TXT.f1d, icon: "M12 22c4-3 7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 3 8 7 11zM12 8v6M9 11h6" },
    { t: TXT.f2, d: TXT.f2d, icon: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" },
    { t: TXT.f3, d: TXT.f3d, icon: "M4 11h16M5 11a7 7 0 0 0 14 0M9 4c0 2 2 2 2 4M14 4c0 2 2 2 2 4" },
];

export default function HomeView({ name, tagline, logo, picks, settings }: { name: string; tagline: string; logo: string; picks: MenuItem[]; settings: Settings }) {
    const lang = useLang();
    const address = (lang === "kh" ? settings.address_kh || settings.address_en : settings.address_en) ?? "";
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFBEA] via-[#F7EDC6] to-[#F3EABF]">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E5902C]/15 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#E5902C]/10 blur-3xl" />
                <Container className="relative flex flex-col items-center py-14 text-center md:py-24">
                    <Image src={logo} alt={name} width={176} height={176} unoptimized priority className="h-36 w-36 object-contain drop-shadow-md md:h-44 md:w-44" />
                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#4A3412] md:text-6xl">{name}</h1>
                    {tagline ? <p className="mt-3 max-w-xl text-lg text-[#8A4F0E] md:text-xl">{tagline}</p> : null}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <ButtonLink href="/reservations">{TXT.reserve[lang]}</ButtonLink>
                        <ButtonLink href="/menu" variant="outline">{TXT.seeMenu[lang]}</ButtonLink>
                    </div>
                </Container>
            </section>

            {/* Chef's picks */}
            {picks.length ? (
                <Section title={TXT.chefsPicks[lang]} subtitle={TXT.chefsPicksSub[lang]}>
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {picks.map(item => {
                            const nm = (lang === "kh" ? item.name_kh || item.name_en : item.name_en || item.name_kh) ?? "";
                            const desc = lang === "kh" ? item.description_kh || item.description_en : item.description_en || item.description_kh;
                            return (
                                <li key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E5902C]/15">
                                        <DishImage src={assetUrl(item.image_url)} alt={nm} />
                                        <span className="absolute bottom-3 right-3 rounded-full bg-[#E5902C] px-3 py-1 text-sm font-bold text-[#FFFBEA] shadow">${Number(item.price).toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2 p-4">
                                        <h3 className="text-lg font-bold text-[#4A3412]">{nm}</h3>
                                        {desc ? <p className="line-clamp-2 text-sm text-[#6b4a1f]">{desc}</p> : null}
                                        {item.tags?.length ? <div className="mt-auto flex flex-wrap gap-1.5 pt-1">{item.tags.map(t => <TagChip key={t} tag={t} lang={lang} small />)}</div> : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-8 text-center"><ButtonLink href="/menu" variant="outline">{TXT.viewFullMenu[lang]}</ButtonLink></div>
                </Section>
            ) : null}

            {/* Three features */}
            <Section title={TXT.why[lang]} tone="soft">
                <ul className="grid gap-6 md:grid-cols-3">
                    {FEATURES.map((f, i) => (
                        <li key={i} className="rounded-2xl border border-[#E5902C]/20 bg-[#FFFBEA] p-6 text-center">
                            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#E5902C]/15 text-[#E5902C]"><Icon d={f.icon} /></span>
                            <h3 className="text-lg font-bold text-[#4A3412]">{f.t[lang]}</h3>
                            <p className="mt-2 text-sm text-[#6b4a1f]">{f.d[lang]}</p>
                        </li>
                    ))}
                </ul>
            </Section>

            {/* About teaser */}
            <Section>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-bold text-[#4A3412] md:text-3xl">{TXT.story[lang]}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-[#6b4a1f]">{TXT.storyBody[lang]}</p>
                    <div className="mt-6"><ButtonLink href="/about" variant="outline">{TXT.readMore[lang]}</ButtonLink></div>
                </div>
            </Section>

            {/* Hours + visit */}
            <Section title={TXT.visit[lang]} tone="soft">
                <div className="grid gap-6 lg:grid-cols-2">
                    <HoursCard hours={settings.hours} />
                    <div className="flex flex-col gap-4 rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] p-6 shadow-[0_10px_30px_-14px_rgba(150,90,20,.35)]">
                        {settings.map_embed ? (
                            <iframe title="Map" src={settings.map_embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-56 w-full rounded-xl border-0" />
                        ) : null}
                        <dl className="space-y-3 text-[#4A3412]">
                            {address ? <div><dt className="text-xs font-bold uppercase tracking-widest text-[#E5902C]">{TXT.address[lang]}</dt><dd className="mt-0.5">{address}</dd></div> : null}
                            {settings.phone ? <div><dt className="text-xs font-bold uppercase tracking-widest text-[#E5902C]">{TXT.phone[lang]}</dt><dd className="mt-0.5"><a className="font-semibold hover:underline" href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a></dd></div> : null}
                        </dl>
                        {settings.map_url ? <a href={settings.map_url} target="_blank" rel="noopener noreferrer" className="mt-auto self-start rounded-full border-2 border-[#E5902C] px-5 py-2 text-sm font-semibold text-[#8A4F0E] hover:bg-[#E5902C]/10">{TXT.directions[lang]} →</a> : null}
                    </div>
                </div>
            </Section>

            {/* Survey invitation */}
            <section className="bg-[#E5902C] py-12 text-center">
                <Container>
                    <h2 className="text-2xl font-bold text-[#FFFBEA] md:text-3xl">{TXT.surveyTitle[lang]}</h2>
                    <p className="mx-auto mt-2 max-w-xl text-[#FFFBEA]/90">{TXT.surveySub[lang]}</p>
                    <Link href="/survey" className="mt-6 inline-flex items-center rounded-full bg-[#FFFBEA] px-7 py-3 font-bold text-[#8A4F0E] shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFFBEA] focus:ring-offset-2 focus:ring-offset-[#E5902C]">{TXT.takeSurvey[lang]}</Link>
                </Container>
            </section>
        </>
    );
}
