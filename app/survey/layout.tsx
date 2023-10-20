import { MainBottomImage } from "@/ui/BottomImage";
import ImageKhmer from "@/ui/ImageKhmer";
import MainShowingLogo from "@/ui/MainShowingLogo";
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="relative max-h-full">
                <ImageKhmer/>
                <div className=" max-h-full flex items-center justify-center min-h-screen flex-col gap-4 text-center z-50">
                   <MainShowingLogo/>
                   {children}
                </div>
                <MainBottomImage/>
            </div>
        </>
    );
}