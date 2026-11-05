import { fetchSettings } from "@/lib/settings";
import { Card, Container, PageHero } from "@/ui/site/kit";
import ContactForm from "@/ui/messages/ContactForm";
import ContactInfo from "@/ui/messages/ContactInfo";
import { T } from "@/ui/messages/T";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact", description: "Get in touch, find us and see our opening hours." };

// Only embed real Google Maps embed URLs.
const safeEmbed = (u: string | null) => (u && /^https:\/\/www\.google\.com\/maps\/embed/.test(u) ? u : null);

export default async function ContactPage() {
    const s = await fetchSettings();
    const embed = safeEmbed(s.map_embed);
    return (
        <>
            <PageHero title={<T k="contactTitle" />} subtitle={<T k="contactSub" />} />
            <Container className="grid gap-8 py-12 lg:grid-cols-5 lg:gap-10 lg:py-16">
                <div className="lg:col-span-3">
                    <Card className="p-6 md:p-8">
                        <h2 className="mb-5 text-2xl font-bold text-[#4A3412]"><T k="contactFormTitle" /></h2>
                        <ContactForm />
                    </Card>
                </div>
                <div className="lg:col-span-2"><ContactInfo settings={s} /></div>
            </Container>
            <Container className="pb-4">
                <div className="overflow-hidden rounded-2xl border border-[#E5902C]/30 bg-[#FFFBEA] shadow-[0_10px_30px_-14px_rgba(150,90,20,.35)]">
                    {embed ? (
                        <iframe src={embed} title="Map" className="h-80 w-full border-0 md:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                    ) : (
                        <div className="grid h-64 place-items-center bg-[repeating-linear-gradient(45deg,#FBF5DC,#FBF5DC_14px,#F3EABF_14px,#F3EABF_28px)] text-center">
                            {s.map_url ? (
                                <a href={s.map_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#E5902C] px-7 py-3 text-base font-bold text-[#FFFBEA] shadow-md hover:bg-[#d4801f]"><T k="openMaps" /></a>
                            ) : <p className="font-semibold text-[#8A4F0E]">{s.address_en}</p>}
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
}
