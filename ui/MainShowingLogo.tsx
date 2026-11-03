"use client";
import { useLargeDesktopSmallPhone } from "@/hooks/useMediaQuery";
import Image from "next/image";

export default function logoItacate({ src, alt }: { src: string, alt: string }) {
    const {isDesktop,isLargeScreen}=useLargeDesktopSmallPhone();
    return (<>
        <Image
            src={src}
            width={isLargeScreen? 500:(isDesktop?400:300)}
            height={90}
            alt={alt}
            // Square or tall logos would otherwise push the page content down.
            style={{ maxHeight: isDesktop ? 220 : 160, width: "auto" }}
            // Backend-hosted logos aren't in next.config's image domains, so skip the optimizer for them.
            unoptimized={src.startsWith("http")}
            priority
        />
    </>)
}
