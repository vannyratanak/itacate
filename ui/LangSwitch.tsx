"use client";
import { dispatchTranslate, useTranslate } from "@/hooks/useTranslate";

// Same persistence as the survey's language chooser (sessionStorage "lang").
export default function LangSwitch() {
    const dispatch = dispatchTranslate();
    const current = useTranslate().name;
    const pick = (type: "kh" | "en") => {
        dispatch({ type });
        try { sessionStorage.setItem("lang", type); } catch {}
    };
    return (
        <div role="group" aria-label="Language" className="inline-flex rounded-full border border-[#E5902C] p-0.5 text-sm font-semibold">
            {(["kh", "en"] as const).map(l => (
                <button
                    key={l}
                    type="button"
                    aria-pressed={current === l}
                    onClick={() => pick(l)}
                    className={`rounded-full px-4 py-1 transition ${current === l ? "bg-[#E5902C] text-[#F3EABF]" : "text-[#E5902C] hover:bg-[#E5902C]/10"}`}
                >
                    {l === "kh" ? "ខ្មែរ" : "English"}
                </button>
            ))}
        </div>
    );
}
