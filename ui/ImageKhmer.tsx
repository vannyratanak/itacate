'use client';

import { useMediaQuery,useLargeDesktopSmallPhone } from "@/hooks/useMediaQuery";
import Image from "next/image";

export default function ImageKhmer() {
    const {isDesktop,isLargeScreen,isSmallPhone,isHeightSmall}=useLargeDesktopSmallPhone();
    return (
        <>
            <Image
                className='absolute top-0 left-0 transition-all z-10'
                src="/for_khmer.png"
                width={ isLargeScreen?350:(isDesktop ? 300 :(isSmallPhone?200:150))}
                height={90} alt={'Khmer New Year'}

            />
        </>
    )
}