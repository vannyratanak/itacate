"use client";
import { FormEvent, useMemo, useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { datepickerOptions } from "@/ui/datepickerOptions";
import { Done, Field, FormError, Honeypot, SubmitRow, inputCls } from "@/ui/messages/Field";
import { T, useT } from "@/ui/messages/T";
import { useSendMessage } from "@/ui/messages/useSendMessage";
import { TxtKey } from "@/ui/messages/text";

const EVENT_TYPES: [string, TxtKey][] = [["Birthday", "evBirthday"], ["Wedding", "evWedding"], ["Corporate dinner", "evCorporate"], ["Family gathering", "evFamily"], ["Other", "evOther"]];
const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const inTwoWeeks = () => { const d = new Date(); d.setDate(d.getDate() + 14); return d; };
const EMPTY = { name: "", email: "", phone: "", eventType: "Birthday", guests: "", message: "", website: "" };

export default function CateringForm() {
    const t = useT();
    const { sending, done, errorKey, send, reset } = useSendMessage();
    const [v, setV] = useState(EMPTY);
    const [date, setDate] = useState<Date>(inTwoWeeks);
    const [show, setShow] = useState(false);
    const [localError, setLocalError] = useState<TxtKey | null>(null);
    const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV(p => ({ ...p, [k]: e.target.value }));

    // Same calendar as the survey's visit date, but future dates only and starting two weeks from today.
    const options = useMemo(() => ({
        ...datepickerOptions,
        title: t("eventDate"),
        defaultDate: date, // the field shows this date, and it is what gets sent unless the visitor picks another
        minDate: new Date(),
        maxDate: new Date(new Date().getFullYear() + 2, 11, 31),
        inputPlaceholderProp: t("selectDate"),
    }), [t]); // date is only the initial value, the picker keeps its own state afterwards

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (!v.email.trim() && !v.phone.trim()) { setLocalError("emailOrPhone"); return; }
        setLocalError(null);
        const ok = await send({
            kind: "catering", name: v.name, email: v.email, phone: v.phone, website: v.website,
            subject: `${v.eventType}${v.guests ? ` · ${v.guests} guests` : ""}`,
            message: v.message,
            data: { event_type: v.eventType, event_date: ymd(date), guests: v.guests ? Number(v.guests) : undefined },
        });
        if (ok) { setV(EMPTY); setDate(inTwoWeeks()); }
    };

    if (done) return <Done message="pdDone" onAgain={reset} />;
    return (
        <form onSubmit={submit} className="relative space-y-4" noValidate>
            <Honeypot value={v.website} onChange={website => setV(p => ({ ...p, website }))} />
            <Field id="p-name" label={<T k="name" />}><input id="p-name" required maxLength={100} autoComplete="name" className={inputCls} value={v.name} onChange={set("name")} /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="p-email" label={<T k="email" />}><input id="p-email" type="email" maxLength={254} autoComplete="email" inputMode="email" className={inputCls} value={v.email} onChange={set("email")} /></Field>
                <Field id="p-phone" label={<T k="phone" />}><input id="p-phone" type="tel" maxLength={20} autoComplete="tel" inputMode="tel" className={inputCls} value={v.phone} onChange={set("phone")} /></Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id="p-type" label={<T k="eventType" />}>
                    <select id="p-type" className={inputCls} value={v.eventType} onChange={set("eventType")}>
                        {EVENT_TYPES.map(([val, key]) => <option key={val} value={val}>{t(key)}</option>)}
                    </select>
                </Field>
                <Field id="p-guests" label={<T k="guests" />}><input id="p-guests" type="number" min={1} max={2000} inputMode="numeric" className={inputCls} value={v.guests} onChange={set("guests")} /></Field>
            </div>
            <Field id="date" label={<T k="eventDate" />}>
                <Datepicker options={options as any} onChange={(d: Date) => setDate(d)} show={show} setShow={setShow} />
            </Field>
            <Field id="p-message" label={<T k="pdMessage" />}><textarea id="p-message" required rows={5} maxLength={3000} className={inputCls} value={v.message} onChange={set("message")} /></Field>
            <FormError errorKey={localError ?? errorKey} />
            <SubmitRow sending={sending} label="pdSend" />
        </form>
    );
}
