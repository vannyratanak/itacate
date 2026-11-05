"use client";
import { useState } from "react";
import { apiSend } from "@/lib/api";
import { TxtKey } from "@/ui/messages/text";

export type SendState = { sending: boolean; done: boolean; errorKey: TxtKey | null };

// Posts one form to the public POST /messages endpoint. Errors are returned as a translation key so the form can show them in the visitor's language.
export function useSendMessage() {
    const [state, setState] = useState<SendState>({ sending: false, done: false, errorKey: null });
    const send = async (payload: Record<string, unknown>) => {
        setState({ sending: true, done: false, errorKey: null });
        const r = await apiSend("/messages", "POST", payload);
        if (r.ok) setState({ sending: false, done: true, errorKey: null });
        else setState({ sending: false, done: false, errorKey: r.status === 429 ? "tooMany" : "errorGeneric" });
        return r.ok;
    };
    const reset = () => setState({ sending: false, done: false, errorKey: null });
    return { ...state, send, reset };
}
