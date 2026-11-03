import { MainBottomImage } from "@/ui/BottomImage";
import ImageKhmer from "@/ui/ImageKhmer";
import MainShowingLogo from "@/ui/MainShowingLogo";
import { fetchShop, logoSrc } from "@/lib/shop";
import { ShopTextSkeleton } from "@/ui/ShopSkeleton";

// Shop identity is edited in the backend dashboard, so render per request.
export const dynamic = 'force-dynamic';

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const shop = await fetchShop();
    const logo = logoSrc(shop);
    return (
        <>
            <div className="relative max-h-full">
                <ImageKhmer/>
                <div className=" max-h-full flex items-center justify-center min-h-screen flex-col gap-4 text-center z-50">
                   <MainShowingLogo src={logo} alt={shop.name} />
                   {shop.name?.trim() || shop.title?.trim() ? (
                       <div>
                           <div className="text-xl font-bold text-primary">{shop.name}</div>
                           <div className="text-sm text-gray-500">{shop.title}</div>
                       </div>
                   ) : <ShopTextSkeleton />}
                   {children}
                </div>
                <MainBottomImage/>
            </div>
        </>
    );
}
