"use client";

import { useTranslate } from "@/hooks/useTranslate";

export default function SurveyError({ reset }: { error: Error, reset: () => void }) {
    const trans = useTranslate();
    return (
        <div className="text-center my-20 px-4">
            <p className="text-primary text-2xl font-semibold mb-6">{trans.menu.error.submit_failed}</p>
            <button className="btn" onClick={reset}>OK</button>
        </div>
    );
}
