import { fetchMenu } from "@/lib/menu";
import { fetchShop, logoSrc } from "@/lib/shop";
import { ShopTextSkeleton } from "@/ui/ShopSkeleton";
import LangSwitch from "@/ui/LangSwitch";
import MenuList from "@/ui/MenuList";

// Menu is edited in the backend dashboard, so render per request.
export const dynamic = 'force-dynamic';
export const metadata = {
    title: 'Menu'
};

export default async function Page() {
    const [shop, items] = await Promise.all([fetchShop(), fetchMenu()]);
    const logo = logoSrc(shop);
    return (
        <div className="container mx-auto max-w-screen-sm px-3 pb-16 lg:max-w-screen-lg">
            <header className="flex flex-col items-center gap-3 pb-6 pt-8 text-center">
                <div className="self-end"><LangSwitch /></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt={shop.name} className="h-32 w-auto object-contain md:h-40" />
                {shop.name?.trim() || shop.title?.trim() ? (
                    <div>
                        <h1 className="text-3xl font-bold text-[#E5902C] md:text-4xl">{shop.name}</h1>
                        <p className="mt-1 text-gray-600">{shop.title}</p>
                    </div>
                ) : <ShopTextSkeleton />}
            </header>
            <MenuList items={items} />
        </div>
    );
}
