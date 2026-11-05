import { fetchMenuSafe } from "@/lib/menu";
import { TXT } from "@/lib/homeMenuText";
import { Container, PageHero } from "@/ui/site/kit";
import { L } from "@/ui/site/L";
import MenuBrowser from "@/ui/menu/MenuBrowser";

// Menu is edited in the backend dashboard, so render per request.
export const dynamic = "force-dynamic";
export const metadata = { title: "Menu" };

export default async function Page() {
    const items = await fetchMenuSafe();
    return (
        <>
            <PageHero title={<L en={TXT.menuTitle.en} kh={TXT.menuTitle.kh} />} />
            <Container className="pb-16 pt-8"><MenuBrowser items={items} /></Container>
        </>
    );
}
