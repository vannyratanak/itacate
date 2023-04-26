import { FruitBottomImage } from "@/ui/BottomImage";
import ImageKhmer from "@/ui/ImageKhmer";
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
          
            <div className="relative max-h-full">
                <ImageKhmer/>

                <div className=" max-h-full flex items-center justify-center min-h-screen flex-col ">
                   
                </div>
                <FruitBottomImage/>
            </div>
        </>
    );
}