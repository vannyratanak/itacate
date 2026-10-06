"use client";

import { dispatchTranslate } from "@/hooks/useTranslate";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const TARGET = "/survey-user";

export default function ChooseLanguage() {
    const dispatch = dispatchTranslate();
    const router = useRouter();
    const [pending, setPending] = useState<"kh" | "en" | null>(null);
    const fallback = useRef<ReturnType<typeof setTimeout>>();

    const choose = (type: "kh" | "en") => {
        if (pending) return;
        dispatch({ type });
        try { sessionStorage.setItem("lang", type); } catch {}
        setPending(type);
        router.push(TARGET);
        // If client-side navigation stalls (e.g. backend slow), fall back to a full page load
        fallback.current = setTimeout(() => window.location.assign(TARGET), 6000);
    };

    return (
        <>
            <button className="btn disabled:opacity-60 disabled:cursor-wait" disabled={pending !== null} onClick={() => choose("kh")}>ខ្មែរ</button>
            <button className="btn disabled:opacity-60 disabled:cursor-wait" disabled={pending !== null} onClick={() => choose("en")}>English</button>
        </>
    );
}
