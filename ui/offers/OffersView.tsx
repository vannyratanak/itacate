"use client";
import { ButtonLink, Card, PageHero, Section } from "@/ui/site/kit";
import { L, useLang, usePick } from "@/ui/site/L";
import { Offer, formatDate, formatRange } from "@/lib/offers";
import { assetUrl } from "@/lib/shop";

function Cover({ src, kind }: { src: string | null; kind: "offer" | "event" }) {
    const url = assetUrl(src);
    return (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#F3EABF] to-[#E5902C]/40">
            {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
                <div className="grid h-full w-full place-items-center text-5xl" aria-hidden="true">{kind === "event" ? "🎺" : "🌮"}</div>
            )}
        </div>
    );
}

function OfferCard({ o }: { o: Offer }) {
    const lang = useLang();
    const t = usePick();
    const isEvent = o.kind === "event";
    const when = isEvent ? formatDate(o.starts_at, lang, true) : formatRange(o.starts_at, o.ends_at, lang);
    return (
        <Card className="flex h-full flex-col gap-4 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(150,90,20,.45)]">
            <Cover src={o.image_url} kind={o.kind} />
            <div className="flex flex-1 flex-col gap-3">
                <span className="w-fit rounded-full bg-[#E5902C] px-3 py-1 text-xs font-bold tracking-wide text-[#FFFBEA]">
                    {isEvent ? "📅 " : "🏷 "}{when}
                </span>
                <h3 className="text-xl font-bold text-[#4A3412]">{t(o, "title")}</h3>
                {o.body_en || o.body_kh ? <p className="flex-1 leading-relaxed text-[#6B4A1E]">{t(o, "body")}</p> : <span className="flex-1" />}
                <div><ButtonLink href="/reservations" variant="outline"><L en="Reserve a table" kh="កក់តុ" /></ButtonLink></div>
            </div>
        </Card>
    );
}

function Empty({ icon, en, kh }: { icon: string; en: string; kh: string }) {
    return (
        <Card className="mx-auto max-w-xl text-center">
            <div className="text-4xl" aria-hidden="true">{icon}</div>
            <p className="mt-2 font-semibold text-[#4A3412]"><L en={en} kh={kh} /></p>
            <p className="mt-1 text-sm text-[#8A4F0E]"><L en="Check back soon, or follow us on social media." kh="សូមត្រឡប់មកវិញឆាប់ៗ ឬតាមដានយើងលើបណ្តាញសង្គម។" /></p>
        </Card>
    );
}

export default function OffersView({ offers, events }: { offers: Offer[]; events: Offer[] }) {
    return (
        <>
            <PageHero
                title={<L en="Offers & Events" kh="ការផ្តល់ជូន និងព្រឹត្តិការណ៍" />}
                subtitle={<L en="Good food is better with a good deal, and a good night out." kh="អាហារឆ្ងាញ់កាន់តែល្អជាមួយការផ្តល់ជូន និងរាត្រីដ៏អស្ចារ្យ។" />}
            />
            <Section title={<L en="Offers" kh="ការផ្តល់ជូន" />} subtitle={<L en="Current deals, available while they last." kh="ការផ្តល់ជូនបច្ចុប្បន្ន មានរហូតដល់អស់ពេលកំណត់។" />}>
                {offers.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{offers.map(o => <OfferCard key={o.id} o={o} />)}</div>
                    : <Empty icon="🏷" en="No offers right now" kh="មិនមានការផ្តល់ជូនទេនៅពេលនេះ" />}
            </Section>
            <Section tone="soft" title={<L en="Upcoming events" kh="ព្រឹត្តិការណ៍ខាងមុខ" />} subtitle={<L en="Live music, tastings and celebrations." kh="តន្ត្រីបន្តផ្ទាល់ ការភ្លក់ និងការអបអរសាទរ។" />}>
                {events.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{events.map(o => <OfferCard key={o.id} o={o} />)}</div>
                    : <Empty icon="📅" en="No upcoming events" kh="មិនមានព្រឹត្តិការណ៍ខាងមុខទេ" />}
            </Section>
        </>
    );
}
