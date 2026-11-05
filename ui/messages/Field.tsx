"use client";
import { ReactNode } from "react";
import { errorClass, inputClass, labelClass, submitClass, successClass } from "@/ui/site/kit";
import { T } from "@/ui/messages/T";
import { TxtKey } from "@/ui/messages/text";

export function Field({ id, label, optional, children }: { id: string; label: ReactNode; optional?: boolean; children: ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className={labelClass}>
                {label}
                {optional ? <span className="ml-1 font-normal text-[#8A4F0E]/70">(<T k="optional" />)</span> : null}
            </label>
            {children}
        </div>
    );
}

// Bots fill every field they see; real visitors never see this one. The backend rejects any message that has it filled.
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label>Website<input tabIndex={-1} autoComplete="off" name="website" value={value} onChange={e => onChange(e.target.value)} /></label>
        </div>
    );
}

export function FormError({ errorKey, text }: { errorKey?: TxtKey | null; text?: string | null }) {
    if (!errorKey && !text) return null;
    return <p role="alert" className={errorClass}>{text ?? (errorKey ? <T k={errorKey} /> : null)}</p>;
}

export function SubmitRow({ sending, label }: { sending: boolean; label: TxtKey }) {
    return (
        <div className="pt-2">
            <button type="submit" disabled={sending} className={submitClass}>{sending ? <T k="sending" /> : <T k={label} />}</button>
        </div>
    );
}

export function Done({ message, onAgain }: { message: TxtKey; onAgain: () => void }) {
    return (
        <div role="status" className={successClass}>
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[#E5902C] text-[#FFFBEA]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h3 className="text-xl font-bold"><T k="thanks" /></h3>
            <p className="mt-1"><T k={message} /></p>
            <button type="button" onClick={onAgain} className="mt-4 text-sm font-semibold text-[#8A4F0E] underline"><T k="sendAnother" /></button>
        </div>
    );
}

export const inputCls = inputClass;
