"use client";
import { useCallback, useEffect, useRef } from "react";
import { L } from "@/ui/site/L";

export type LightboxImage = { src: string; alt: string; caption: string };

// Accessible full-screen viewer: Esc closes, ←/→ move, Tab stays inside, swipe on touch, focus returns to the opener.
export default function Lightbox({ images, index, onClose, onIndex }: {
    images: LightboxImage[]; index: number; onClose: () => void; onIndex: (i: number) => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const touchX = useRef<number | null>(null);
    const count = images.length;
    const go = useCallback((d: number) => onIndex((index + d + count) % count), [index, count, onIndex]);

    useEffect(() => {
        const opener = document.activeElement as HTMLElement | null;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        return () => { document.body.style.overflow = prevOverflow; opener?.focus?.(); };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { e.preventDefault(); onClose(); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
            else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
            else if (e.key === "Tab") {
                const f = [closeRef.current, prevRef.current, nextRef.current].filter(Boolean) as HTMLElement[];
                const i = f.indexOf(document.activeElement as HTMLElement);
                e.preventDefault();
                f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [go, onClose]);

    // Warm the neighbours so next/prev feel instant.
    useEffect(() => {
        [index - 1, index + 1].forEach(i => { const im = images[(i + count) % count]; if (im) new window.Image().src = im.src; });
    }, [index, images, count]);

    const img = images[index];
    const btn = "grid h-12 w-12 place-items-center rounded-full bg-black/45 text-[#FFFBEA] backdrop-blur transition hover:bg-[#E5902C] focus:outline-none focus:ring-2 focus:ring-[#FFFBEA]";
    return (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer"
            className="fixed inset-0 z-[60] flex flex-col bg-[#1d1308]/95"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
                if (touchX.current == null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}>
            <div className="flex items-center justify-between px-4 py-3 text-[#F3EABF]">
                <span aria-live="polite" className="text-sm font-semibold tabular-nums">{index + 1} / {count}</span>
                <button ref={closeRef} type="button" onClick={onClose} className={btn} aria-label="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-20" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
                {count > 1 && <button ref={prevRef} type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${btn} absolute left-2 top-1/2 z-10 -translate-y-1/2 md:left-5`}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 6l-6 6 6 6" /></svg></button>}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={img.src} src={img.src} alt={img.alt} className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl" draggable={false} />
                {count > 1 && <button ref={nextRef} type="button" onClick={() => go(1)} aria-label="Next photo" className={`${btn} absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-5`}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 6l6 6-6 6" /></svg></button>}
            </div>
            <div className="min-h-[3.5rem] px-6 py-4 text-center text-base text-[#FFFBEA]">{img.caption || <span className="sr-only"><L en="No caption" kh="គ្មានចំណងជើង" /></span>}</div>
        </div>
    );
}
