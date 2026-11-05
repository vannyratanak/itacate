import { apiGet } from "@/lib/api";
import { L } from "@/ui/site/L";
import { PageHero, Section } from "@/ui/site/kit";
import FaqList, { FaqItem } from "@/ui/faq/FaqList";

export const dynamic = "force-dynamic";
export const metadata = { title: "FAQ", description: "Answers to common questions about hours, reservations, parking, allergies and more." };

export default async function FaqPage() {
    const items = await apiGet<FaqItem[]>("/faq", []);
    // Structured data for search engines (English). "<" is escaped so the JSON can never close the script tag.
    const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(it => ({ "@type": "Question", name: it.question_en, acceptedAnswer: { "@type": "Answer", text: it.answer_en } })),
    }).replace(/</g, "\\u003c");
    return (
        <>
            {items.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /> : null}
            <PageHero
                title={<L en="Frequently asked questions" kh="សំណួរដែលសួរញឹកញាប់" />}
                subtitle={<L en="Quick answers about hours, booking, parking, allergies and more." kh="ចម្លើយរហ័សអំពីម៉ោងបើក ការកក់តុ កន្លែងចតរថយន្ត អាឡែស៊ី និងច្រើនទៀត។" />} />
            <Section><FaqList items={items} /></Section>
        </>
    );
}
