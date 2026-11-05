import { Card, Container, PageHero } from "@/ui/site/kit";
import GiftCardForm from "@/ui/messages/GiftCardForm";
import { T } from "@/ui/messages/T";
import { fetchShop } from "@/lib/shop";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gift cards", description: "Give the gift of a great meal." };

export default async function GiftCardsPage() {
    const shop = await fetchShop();
    return (
        <>
            <PageHero title={<T k="gcTitle" />} subtitle={<T k="gcSub" />} />
            <Container className="grid gap-10 py-12 lg:grid-cols-5 lg:py-16">
                <div className="lg:col-span-2">
                    {/* Decorative card */}
                    <div className="relative aspect-[8/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#F0A43A] via-[#E5902C] to-[#B8661A] p-6 text-[#FFFBEA] shadow-[0_24px_50px_-18px_rgba(150,90,20,.65)]" aria-hidden="true">
                        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#FFFBEA]/15" />
                        <div className="absolute -bottom-16 -left-8 h-52 w-52 rounded-full bg-[#4A3412]/15" />
                        <div className="relative flex h-full flex-col justify-between">
                            <div className="text-lg font-bold tracking-wide">{shop.name}</div>
                            <div>
                                <div className="text-4xl font-extrabold tracking-tight md:text-5xl">$25</div>
                                <div className="mt-1 text-sm font-semibold uppercase tracking-wider opacity-90"><T k="gcTitle" /></div>
                            </div>
                        </div>
                    </div>
                    <Card className="mt-6">
                        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#8A4F0E]"><T k="gcHow" /></h2>
                        <ol className="space-y-3">
                            {(["gcH1", "gcH2", "gcH3"] as const).map((k, i) => (
                                <li key={k} className="flex gap-3 text-[#4A3412]">
                                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[#E5902C] text-sm font-bold text-[#FFFBEA]">{i + 1}</span>
                                    <span className="pt-0.5"><T k={k} /></span>
                                </li>
                            ))}
                        </ol>
                    </Card>
                </div>
                <Card className="p-6 md:p-8 lg:col-span-3"><GiftCardForm /></Card>
            </Container>
        </>
    );
}
