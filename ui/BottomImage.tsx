"use client"
import { useLargeDesktopSmallPhone, useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

export function MainBottomImage() {
    const { isDesktop, isLargeScreen } = useLargeDesktopSmallPhone();
    return (
        <>
            <Image
                src={"/flower1.png"}
                className="absolute bottom-0 right-0 transition-all"
                width={isLargeScreen ? 200 : (isDesktop ? 150 : 100)}
                height={10} alt="Flower Bottom"
                priority
            />
        </>
    )
}
export function FruitBottomImage(){
    const {isDesktop,isLargeScreen,isSmallPhone}=useLargeDesktopSmallPhone();
    return (
        <>
             <Image
                src={"/fruit.png"}
                className="absolute bottom-5 right-5 transition-all"
                width={isLargeScreen ? 350 : (isDesktop ? 300 : ( isSmallPhone? 250:150))}
                height={90} alt="Flower Bottom"
                priority
            />
        </>
    )
}