"use client";
import { useLargeDesktopSmallPhone } from "@/hooks/useMediaQuery";
import Image from "next/image";

export default function logoItacate() {
    const {isDesktop,isLargeScreen}=useLargeDesktopSmallPhone();
    return (<>
        <Image
            src={"/king.png"}
            width={isLargeScreen? 500:(isDesktop?400:300)}
            height={90}
            alt="King no title"
        />
    </>)
}