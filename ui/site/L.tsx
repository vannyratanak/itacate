"use client";
import { ReactNode } from "react";
import { useTranslate } from "@/hooks/useTranslate";

// The site language lives in client state (sessionStorage + context), so anything bilingual renders in a client component.
export type Lang = "kh" | "en";
export const useLang = (): Lang => (useTranslate().name === "kh" ? "kh" : "en");

// <L en="Hello" kh="សួស្តី" />  (falls back to English when no Khmer is given)
export function L({ en, kh }: { en: ReactNode; kh?: ReactNode }) {
    const lang = useLang();
    return <>{lang === "kh" && kh ? kh : en}</>;
}

// Pick a field from API data that has <field>_en / <field>_kh columns:  pick(item, "title", lang)
export function pick(item: any, field: string, lang: Lang): string {
    const en = item?.[`${field}_en`] ?? "";
    const kh = item?.[`${field}_kh`] ?? "";
    return (lang === "kh" ? kh || en : en || kh) ?? "";
}

// Client hook form of pick(): const t = usePick(); t(item, "title")
export function usePick() {
    const lang = useLang();
    return (item: any, field: string) => pick(item, field, lang);
}
