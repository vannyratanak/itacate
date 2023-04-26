'use client';

import { useMediaQuery,useLargeDesktop } from "@/hooks/useMediaQuery";
import Image from "next/image";

export default function ImageKhmer() {
    const {isDesktop,isLargeScreen}=useLargeDesktop();
    return (
        <>
            <Image
                className='absolute top-0 left-0 transition-all z-10'
                src="/for_khmer.png"
                width={isLargeScreen?350:(isDesktop ? 300 :200)}
                height={90} alt={'Khmer New Year'}

            />
        </>
    )
}