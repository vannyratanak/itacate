import { fetchShop, logoSrc } from "@/lib/shop";
import { fetchSettings } from "@/lib/settings";
import SiteHeader from "@/ui/site/SiteHeader";
import SiteFooter from "@/ui/site/SiteFooter";
import { ButtonLink, Container } from "@/ui/site/kit";
import { L } from "@/ui/site/L";

// Lives outside the (site) group, so it renders the shared header/footer itself.
export const dynamic = "force-dynamic";
export const metadata = { title: "Page not found" };

export default async function NotFound() {
    const [shop, settings] = await Promise.all([fetchShop(), fetchSettings()]);
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader name={shop.name} logo={logoSrc(shop)} notice={settings.notice} />
            <main className="flex-1">
                <Container className="flex flex-col items-center py-16 text-center md:py-24">
                    <svg viewBox="0 0 200 120" className="w-56" aria-hidden="true">
                        <path d="M20 100a80 80 0 0 1 160 0z" fill="#F0B45A" /><path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="#E5902C" strokeWidth="6" />
                        <circle cx="70" cy="70" r="7" fill="#C8321F" /><circle cx="110" cy="58" r="6" fill="#3a7d33" /><circle cx="138" cy="82" r="7" fill="#C8321F" />
                    </svg>
                    <p className="mt-4 text-7xl font-extrabold tracking-tight text-[#E5902C] md:text-8xl">404</p>
                    <h1 className="mt-3 text-2xl font-bold text-[#4A3412] md:text-3xl"><L en="This page is off the menu" kh="ទំព័រនេះមិនមាននៅលើម៉ឺនុយទេ" /></h1>
                    <p className="mt-3 max-w-md text-[#8A4F0E]"><L en="We could not find what you were looking for. It may have moved, or the link may be wrong." kh="យើងរកមិនឃើញអ្វីដែលអ្នកកំពុងស្វែងរកទេ។ ទំព័រនេះប្រហែលបានផ្លាស់ទី ឬតំណភ្ជាប់មិនត្រឹមត្រូវ។" /></p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <ButtonLink href="/"><L en="Back to home" kh="ត្រឡប់ទៅទំព័រដើម" /></ButtonLink>
                        <ButtonLink href="/menu" variant="outline"><L en="See the menu" kh="មើលម៉ឺនុយ" /></ButtonLink>
                        <ButtonLink href="/reservations" variant="outline"><L en="Book a table" kh="កក់តុ" /></ButtonLink>
                    </div>
                </Container>
            </main>
            <SiteFooter name={shop.name} settings={settings} />
        </div>
    );
}
