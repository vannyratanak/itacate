"use client"
import { useLargeDesktop } from "@/hooks/useMediaQuery";
import Image from "next/image";

export function MainBottomImage() {
    const { isDesktop, isLargeScreen } = useLargeDesktop();
    return (
        <>
            <Image
                src={"/flower1.png"}
                className="absolute bottom-0 right-0 transition-all"
                width={isLargeScreen ? 200 : (isDesktop ? 150 : 100)}
                height={90} alt="Flower Bottom"
            />
        </>
    )
}
export function FruitBottomImage(){
    const {isDesktop,isLargeScreen}=useLargeDesktop();
    return (
        <>
             <Image
                src={"/fruit.png"}
                className="absolute bottom-5 right-5 transition-all z-10"
                width={isLargeScreen ? 350 : (isDesktop ? 300 : 250)}
                height={90} alt="Flower Bottom"
            />
        </>
    )
}