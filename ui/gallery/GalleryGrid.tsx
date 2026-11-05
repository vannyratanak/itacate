"use client";
import { useState } from "react";
import { assetUrl } from "@/lib/shop";
import { L, usePick } from "@/ui/site/L";
import { Card } from "@/ui/site/kit";
import Lightbox from "@/ui/gallery/Lightbox";

export type GalleryItem = { id: number; url: string; caption_en: string | null; caption_kh: string | null };

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
    const t = usePick();
    const [open, setOpen] = useState<number | null>(null);

    if (!items.length) {
        return (
            <Card className="mx-auto max-w-xl text-center">
                <p className="text-lg font-semibold text-[#4A3412]"><L en="Photos are coming soon" kh="រូបថតនឹងមកដល់ឆាប់ៗនេះ" /></p>
                <p className="mt-1 text-[#8A4F0E]"><L en="Check back in a little while." kh="សូមត្រឡប់មកមើលម្តងទៀតក្រោយមួយភ្លែត។" /></p>
            </Card>
        );
    }

    const images = items.map(it => ({ src: assetUrl(it.url) ?? it.url, alt: t(it, "caption"), caption: t(it, "caption") }));
    return (
        <>
            <ul className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4" aria-label="Photo gallery">
                {images.map((im, i) => (
                    <li key={items[i].id} className="mb-3 break-inside-avoid md:mb-4">
                        <button type="button" onClick={() => setOpen(i)} aria-label={im.alt ? `Open photo: ${im.alt}` : `Open photo ${i + 1}`}
                            className="group relative block w-full overflow-hidden rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] shadow-[0_10px_30px_-14px_rgba(150,90,20,.4)] transition focus:outline-none focus:ring-2 focus:ring-[#E5902C] focus:ring-offset-2 focus:ring-offset-[#F3EABF]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={im.src} alt={im.alt} loading="lazy" decoding="async" className="block h-auto w-full transition duration-500 group-hover:scale-[1.04]" />
                            {im.caption ? (
                                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2b1a05]/80 to-transparent px-3 pb-2.5 pt-8 text-left text-sm font-semibold text-[#FFFBEA] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">{im.caption}</span>
                            ) : null}
                        </button>
                    </li>
                ))}
            </ul>
            {open !== null ? <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} /> : null}
        </>
    );
}
