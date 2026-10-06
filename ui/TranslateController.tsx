"use client";

import { TranslateContext, TranslateDispatchContext, initializeTranslate, translateReducer } from "@/hooks/useTranslate";
import { useEffect, useMemo, useReducer } from "react";

export default function TranslateController({
    children,
}: {
    children: React.ReactNode
}) {
    const [trans,dispatch]=useReducer(translateReducer,initializeTranslate);
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("lang");
            if (saved === "en" || saved === "kh") dispatch({ type: saved });
        } catch {}
    }, []);
    const cacheValue=useMemo(()=>({
        trans,dispatch
        }),[trans,dispatch],
    );
    return (
        <>
            <TranslateContext.Provider value={cacheValue.trans }>
                <TranslateDispatchContext.Provider value={dispatch}>
                    {children}
                </TranslateDispatchContext.Provider>
            </TranslateContext.Provider>
        </>
    )
}