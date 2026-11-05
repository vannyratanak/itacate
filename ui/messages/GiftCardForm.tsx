"use client";
import { FormEvent, useState } from "react";
import { Done, Field, FormError, Honeypot, SubmitRow, inputCls } from "@/ui/messages/Field";
import { T } from "@/ui/messages/T";
import { useSendMessage } from "@/ui/messages/useSendMessage";
import { TxtKey } from "@/ui/messages/text";

const AMOUNTS = [10, 25, 50, 100];
const EMPTY = { name: "", email: "", phone: "", recipient: "", message: "", website: "" };

export default function GiftCardForm() {
    const { sending, done, errorKey, send, reset } = useSendMessage();
    const [v, setV] = useState(EMPTY);
    const [amount, setAmount] = useState<number | "other">(25);
    const [other, setOther] = useState("");
    const [localError, setLocalError] = useState<TxtKey | null>(null);
    const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV(p => ({ ...p, [k]: e.target.value }));

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const value = amount === "other" ? Number(other) : amount;
        if (!Number.isFinite(value) || value < 5 || value > 1000) { setLocalError("gcBadAmount"); return; }
        if (!v.email.trim() && !v.phone.trim()) { setLocalError("emailOrPhone"); return; }
        setLocalError(null);
        const ok = await send({
            kind: "gift_card", name: v.name, email: v.email, phone: v.phone, website: v.website,
            subject: `Gift card $${value}`, message: v.message,
            data: { amount: value, recipient_name: v.recipient || undefined },
        });
        if (ok) { setV(EMPTY); setAmount(25); setOther(""); }
    };

    if (done) return <Done message="gcDone" onAgain={reset} />;
    return (
        <form onSubmit={submit} className="relative space-y-5" noValidate>
            <Honeypot value={v.website} onChange={website => setV(p => ({ ...p, website }))} />
            <fieldset>
                <legend className="mb-2 text-sm font-semibold text-[#4A3412]"><T k="gcChoose" /></legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {AMOUNTS.map(a => (
                        <label key={a} className={`flex min-h-[3.25rem] cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-3 text-center text-lg font-bold transition focus-within:ring-2 focus-within:ring-[#E5902C] ${amount === a ? "border-[#E5902C] bg-[#E5902C] text-[#FFFBEA] shadow-md" : "border-[#E5902C]/50 bg-[#FFFBEA] text-[#8A4F0E] hover:border-[#E5902C]"}`}>
                            <input type="radio" name="amount" className="sr-only" checked={amount === a} onChange={() => setAmount(a)} />${a}
                        </label>
                    ))}
                    <label className={`flex min-h-[3.25rem] cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-3 text-center text-base font-bold transition focus-within:ring-2 focus-within:ring-[#E5902C] ${amount === "other" ? "border-[#E5902C] bg-[#E5902C] text-[#FFFBEA] shadow-md" : "border-[#E5902C]/50 bg-[#FFFBEA] text-[#8A4F0E] hover:border-[#E5902C]"}`}>
                        <input type="radio" name="amount" className="sr-only" checked={amount === "other"} onChange={() => setAmount("other")} /><T k="evOther" />
                    </label>
                </div>
                {amount === "other" ? (
                    <div className="mt-3 max-w-xs">
                        <label htmlFor="g-other" className="sr-only"><T k="gcOtherHint" /></label>
                        <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#8A4F0E]">$</span>
                            <input id="g-other" type="number" min={5} max={1000} step="1" inputMode="decimal" autoFocus className={`${inputCls} pl-7`} value={other} onChange={e => setOther(e.target.value)} />
                        </div>
                        <p className="mt-1 text-xs text-[#8A4F0E]"><T k="gcOtherHint" /></p>
                    </div>
                ) : null}
            </fieldset>
            <Field id="g-recipient" label={<T k="gcRecipient" />}><input id="g-recipient" maxLength={100} className={inputCls} value={v.recipient} onChange={set("recipient")} /></Field>
            <Field id="g-message" label={<T k="gcMessage" />} optional><textarea id="g-message" rows={3} maxLength={500} className={inputCls} value={v.message} onChange={set("message")} /></Field>
            <Field id="g-name" label={<T k="gcYourName" />}><input id="g-name" required maxLength={100} autoComplete="name" className={inputCls} value={v.name} onChange={set("name")} /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="g-email" label={<T k="email" />}><input id="g-email" type="email" maxLength={254} autoComplete="email" inputMode="email" className={inputCls} value={v.email} onChange={set("email")} /></Field>
                <Field id="g-phone" label={<T k="phone" />}><input id="g-phone" type="tel" maxLength={20} autoComplete="tel" inputMode="tel" className={inputCls} value={v.phone} onChange={set("phone")} /></Field>
            </div>
            <p className="rounded-lg bg-[#E5902C]/12 px-3 py-2 text-sm font-semibold text-[#8A4F0E]"><T k="gcNote" /></p>
            <FormError errorKey={localError ?? errorKey} />
            <SubmitRow sending={sending} label="gcSend" />
        </form>
    );
}
