"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { apiSend, errorText, publicApi } from "@/lib/api";
import { datepickerOptions } from "@/ui/datepickerOptions";
import { L, useLang } from "@/ui/site/L";
import { Card, errorClass, inputClass, labelClass, submitClass } from "@/ui/site/kit";
import { T, TKey } from "./text";

type Slot = { time: string; available: boolean };
type Availability = { open: boolean; slots: Slot[]; reason?: string };
type Done = { reference: string; date: string; time: string; party: number };

const t = (k: TKey) => <L en={T[k].en} kh={T[k].kh} />;
const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const MAX_PARTY = 20;

// Same calendar look as the survey form, limited to today ... +90 days.
const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const pickerOptions = () => {
    const max = startOfToday(); max.setDate(max.getDate() + 90);
    return { ...datepickerOptions, title: "Reservation date", minDate: startOfToday(), maxDate: max, defaultDate: startOfToday(), autoHide: true };
};

export default function ReservationForm({ phone }: { phone: string | null }) {
    const lang = useLang();
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<Date>(startOfToday());
    const [party, setParty] = useState(2);
    const [time, setTime] = useState<string | null>(null);
    const [av, setAv] = useState<Availability | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "", website: "" });
    const [errors, setErrors] = useState<Record<string, TKey>>({});
    const [serverError, setServerError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState<Done | null>(null);
    const options = useRef(pickerOptions());
    const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm(f => ({ ...f, [k]: e.target.value }));

    // Load the free time slots whenever the date or the party size changes.
    useEffect(() => {
        let alive = true;
        setLoading(true);
        fetch(`${publicApi}/reservations/availability?date=${ymd(date)}&party=${party}`, { cache: "no-store" })
            .then(r => (r.ok ? r.json() : Promise.reject()))
            .then((a: Availability) => { if (alive) { setAv(a); setTime(cur => (a.slots.some(s => s.time === cur && s.available) ? cur : null)); } })
            .catch(() => { if (alive) setAv(null); })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [date, party]);

    const anyFree = !!av?.slots.some(s => s.available);
    const unavailableMsg: TKey | null = !av ? null : av.open ? (anyFree ? null : "full") : av.reason === "past" ? "past" : "closed";

    async function submit(e: FormEvent) {
        e.preventDefault();
        setServerError(null);
        const errs: Record<string, TKey> = {};
        if (!form.name.trim()) errs.name = "errName";
        if (!/^\+?\d{8,15}$/.test(form.phone.replace(/[\s.\-()]/g, ""))) errs.phone = "errPhone";
        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "errEmail";
        if (!time) errs.time = "chooseTime";
        setErrors(errs);
        if (Object.keys(errs).length) return;
        setSending(true);
        const r = await apiSend<{ reference?: string }>("/reservations", "POST", {
            name: form.name, phone: form.phone, email: form.email || undefined, notes: form.notes || undefined,
            party_size: party, date: ymd(date), time, website: form.website,
        });
        setSending(false);
        if (r.ok && r.data.reference) { setDone({ reference: r.data.reference, date: ymd(date), time: time!, party }); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        if (r.status === 400 || r.status === 429) {
            // 400 usually means the slot was taken meanwhile: show the reason and reload the times
            setServerError(errorText(r, T.fail.en));
            if (r.status === 400) { setTime(null); setDate(d => new Date(d)); }
        } else setServerError("__fail__");
    }

    if (done) {
        return (
            <Card className="text-center">
                <div role="status" className="py-4 text-[#4A3412]">
                    <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-[#E5902C] text-[#FFFBEA]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold">{t("okTitle")}</h2>
                    <p className="mt-2 text-[#8A4F0E]">{t("okBody")}</p>
                    <div className="mx-auto mt-5 max-w-xs rounded-xl bg-[#F3EABF] p-4">
                        <div className="text-xs font-semibold uppercase tracking-widest text-[#8A4F0E]">{t("okRef")}</div>
                        <div className="mt-1 font-mono text-2xl font-bold tracking-wider">{done.reference}</div>
                        <div className="mt-2 text-sm">{done.date} · {done.time} · {done.party} {t("people")}</div>
                    </div>
                    <button type="button" className={`${submitClass} mt-6`} onClick={() => { setDone(null); setTime(null); setForm(f => ({ ...f, notes: "" })); setDate(d => new Date(d)); }}>{t("again")}</button>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <form onSubmit={submit} noValidate className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>{t("date")}</label>
                        <Datepicker options={options.current} show={show} setShow={setShow} onChange={(d: Date) => setDate(d)} />
                    </div>
                    <div>
                        <label className={labelClass} id="party-label">{t("guests")}</label>
                        <div className="flex items-center gap-3" role="group" aria-labelledby="party-label">
                            <button type="button" aria-label={lang === "kh" ? T.decrease.kh : T.decrease.en} disabled={party <= 1} onClick={() => setParty(p => Math.max(1, p - 1))}
                                className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#E5902C] text-xl font-bold text-[#8A4F0E] transition hover:bg-[#E5902C]/15 disabled:opacity-40">−</button>
                            <div className="min-w-[4.5rem] text-center text-xl font-bold text-[#4A3412]" aria-live="polite">{party} <span className="text-sm font-semibold text-[#8A4F0E]">{t("people")}</span></div>
                            <button type="button" aria-label={lang === "kh" ? T.increase.kh : T.increase.en} disabled={party >= MAX_PARTY} onClick={() => setParty(p => Math.min(MAX_PARTY, p + 1))}
                                className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#E5902C] text-xl font-bold text-[#8A4F0E] transition hover:bg-[#E5902C]/15 disabled:opacity-40">+</button>
                        </div>
                        {party >= MAX_PARTY ? <p className="mt-1 text-xs text-[#8A4F0E]">{t("largeParty")}</p> : null}
                    </div>
                </div>

                <div>
                    <div className={labelClass}>{t("time")}</div>
                    {loading && !av ? <p className="text-sm text-[#8A4F0E]">{t("loading")}</p> : null}
                    {!loading && !av ? <p className="text-sm text-[#8A4F0E]">{t("pickDate")}</p> : null}
                    {unavailableMsg ? (
                        <p className="rounded-lg bg-[#F3EABF] px-3 py-2 text-sm font-semibold text-[#8A4F0E]">
                            {av && !av.open && av.reason && !["closed", "past", "blocked"].includes(av.reason) ? <>{av.reason}. </> : null}{t(unavailableMsg)}
                        </p>
                    ) : null}
                    {av?.open && anyFree ? (
                        <div role="radiogroup" aria-label="Time" className={`flex flex-wrap gap-2 transition-opacity ${loading ? "opacity-50" : ""}`}>
                            {av.slots.map(s => (
                                <button key={s.time} type="button" role="radio" aria-checked={time === s.time} disabled={!s.available}
                                    onClick={() => { setTime(s.time); setErrors(x => ({ ...x, time: undefined as never })); }}
                                    className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#E5902C] ${time === s.time ? "border-[#E5902C] bg-[#E5902C] text-[#FFFBEA] shadow-md" : s.available ? "border-[#E5902C]/50 text-[#4A3412] hover:border-[#E5902C] hover:bg-[#E5902C]/10" : "cursor-not-allowed border-transparent bg-[#4A3412]/5 text-[#4A3412]/35 line-through"}`}>
                                    {s.time}
                                </button>
                            ))}
                        </div>
                    ) : null}
                    {errors.time ? <p className="mt-2 text-sm font-semibold text-rose-600" role="alert">{t(errors.time)}</p> : null}
                    <p className="mt-2 text-xs text-[#8A4F0E]">{t("slotNote")}</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="r-name" className={labelClass}>{t("name")}</label>
                        <input id="r-name" className={inputClass} value={form.name} onChange={set("name")} maxLength={100} autoComplete="name" aria-invalid={!!errors.name} />
                        {errors.name ? <p className="mt-1 text-sm font-semibold text-rose-600" role="alert">{t(errors.name)}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="r-phone" className={labelClass}>{t("phone")}</label>
                        <input id="r-phone" className={inputClass} value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="+855 12 345 678" aria-invalid={!!errors.phone} />
                        {errors.phone ? <p className="mt-1 text-sm font-semibold text-rose-600" role="alert">{t(errors.phone)}</p> : null}
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="r-email" className={labelClass}>{t("email")}</label>
                        <input id="r-email" type="email" className={inputClass} value={form.email} onChange={set("email")} maxLength={120} autoComplete="email" aria-invalid={!!errors.email} />
                        {errors.email ? <p className="mt-1 text-sm font-semibold text-rose-600" role="alert">{t(errors.email)}</p> : null}
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="r-notes" className={labelClass}>{t("notes")}</label>
                        <textarea id="r-notes" rows={3} maxLength={500} className={inputClass} value={form.notes} onChange={set("notes")} placeholder={lang === "kh" ? T.notesPh.kh : T.notesPh.en} />
                    </div>
                </div>

                {/* honeypot: hidden from people, bots fill it in */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></label>
                </div>

                {serverError ? (
                    <div className={errorClass} role="alert">
                        {serverError === "__fail__" ? <>{t("fail")}{phone ? <> <a className="font-bold underline" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></> : null}</> : serverError}
                    </div>
                ) : null}

                <div className="text-center">
                    <button type="submit" className={submitClass} disabled={sending}>{sending ? t("sending") : t("submit")}</button>
                </div>
            </form>
        </Card>
    );
}
