import { fetchShop, logoSrc } from "@/lib/shop";
import { fetchSettings } from "@/lib/settings";
import SiteHeader from "@/ui/site/SiteHeader";
import SiteFooter from "@/ui/site/SiteFooter";

// Every public page that lives in app/(site)/ gets the shared header + footer. Always fresh: shop + settings come from the backend.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
    const [shop, settings] = await Promise.all([fetchShop(), fetchSettings()]);
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader name={shop.name} logo={logoSrc(shop)} notice={settings.notice} />
            <main className="flex-1">{children}</main>
            <SiteFooter name={shop.name} settings={settings} />
        </div>
    );
}
