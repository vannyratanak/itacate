"use client";
import { TXT, TxtKey } from "@/ui/messages/text";
import { L, useLang } from "@/ui/site/L";

// <T k="name" /> renders the English or Khmer string for the current site language.
export function T({ k }: { k: TxtKey }) {
    return <L en={TXT[k].en} kh={TXT[k].kh} />;
}

// For attributes that can't hold JSX (placeholder, aria-label): const t = useT(); t("name")
export function useT() {
    const lang = useLang();
    return (k: TxtKey) => TXT[k][lang];
}
