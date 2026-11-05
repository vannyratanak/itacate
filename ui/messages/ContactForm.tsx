"use client";
import { FormEvent, useState } from "react";
import { Done, Field, FormError, Honeypot, SubmitRow, inputCls } from "@/ui/messages/Field";
import { T, useT } from "@/ui/messages/T";
import { useSendMessage } from "@/ui/messages/useSendMessage";
import { TxtKey } from "@/ui/messages/text";

export default function ContactForm() {
    const t = useT();
    const { sending, done, errorKey, send, reset } = useSendMessage();
    const [v, setV] = useState({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
    const [localError, setLocalError] = useState<TxtKey | null>(null);
    const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV(p => ({ ...p, [k]: e.target.value }));

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (!v.email.trim() && !v.phone.trim()) { setLocalError("emailOrPhone"); return; }
        setLocalError(null);
        if (await send({ kind: "contact", ...v })) setV({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
    };

    if (done) return <Done message="contactDone" onAgain={reset} />;
    return (
        <form onSubmit={submit} className="relative space-y-4" noValidate>
            <Honeypot value={v.website} onChange={website => setV(p => ({ ...p, website }))} />
            <Field id="c-name" label={<T k="name" />}><input id="c-name" required maxLength={100} autoComplete="name" className={inputCls} value={v.name} onChange={set("name")} /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="c-email" label={<T k="email" />}><input id="c-email" type="email" maxLength={254} autoComplete="email" inputMode="email" className={inputCls} value={v.email} onChange={set("email")} /></Field>
                <Field id="c-phone" label={<T k="phone" />}><input id="c-phone" type="tel" maxLength={20} autoComplete="tel" inputMode="tel" className={inputCls} value={v.phone} onChange={set("phone")} /></Field>
            </div>
            <Field id="c-subject" label={<T k="subject" />} optional><input id="c-subject" maxLength={150} className={inputCls} value={v.subject} onChange={set("subject")} /></Field>
            <Field id="c-message" label={<T k="message" />}><textarea id="c-message" required rows={6} maxLength={3000} className={inputCls} placeholder={t("message")} value={v.message} onChange={set("message")} /></Field>
            <FormError errorKey={localError ?? errorKey} />
            <SubmitRow sending={sending} label="contactSend" />
        </form>
    );
}
