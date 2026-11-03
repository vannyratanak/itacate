"use client";
import { useLargeDesktopSmallPhone } from "@/hooks/useMediaQuery";
import Image from "next/image";

export default function RightImage({ src }: { src: string }) {
    const {isDesktop,isLargeScreen}=useLargeDesktopSmallPhone();
    return (
        <>
            <div className="absolute top-10 right-10">
                <Image
                    className="transition"
                    src={src}
                    unoptimized={src.startsWith("http")}
                    width={isLargeScreen?250:(isDesktop?200:150)}
                    height={90}
                    priority
                    alt={""} />
            </div>
        </>
    )
}