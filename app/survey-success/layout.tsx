import { FruitBottomImage } from "@/ui/BottomImage";
import ImageKhmer from "@/ui/ImageKhmer";
import RightImage from "@/ui/RightImage";
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
          
            <div className="relative max-h-full">
                <ImageKhmer/>
                <RightImage/>
                <div className=" max-h-full flex items-center justify-center min-h-screen flex-col ">
                   {children}
                </div>
                <FruitBottomImage/>
            </div>
        </>
    );
}