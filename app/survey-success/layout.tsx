import { FruitBottomImage } from "@/ui/BottomImage";
import ImageKhmer from "@/ui/ImageKhmer";
import RightImage from "@/ui/RightImage";
import { fetchShop, logoSrc } from "@/lib/shop";

// Logo is edited in the backend dashboard, so render per request.
export const dynamic = 'force-dynamic';
export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const shop = await fetchShop();
    return (
        <>
          
            <div className="relative max-h-full">
                <ImageKhmer/>
                <RightImage src={logoSrc(shop)} />
                <div className=" max-h-full flex items-center justify-center min-h-screen flex-col ">
                   {children}
                </div>
                <FruitBottomImage/>
            </div>
        </>
    );
}