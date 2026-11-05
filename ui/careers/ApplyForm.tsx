"use client";
import { FormEvent, useState } from "react";
import { apiSend, errorText } from "@/lib/api";
import { errorClass, inputClass, labelClass, submitClass, successClass } from "@/ui/site/kit";
import { L, useLang } from "@/ui/site/L";

const PHONE = /^\+?\d{8,15}$/;

// jobId = null -> a general application ("send us your details")
export default function ApplyForm({ jobId, onCancel }: { jobId: number | null; onCancel?: () => void }) {
    const lang = useLang();
    const t = (en: string, kh: string) => (lang === "kh" ? kh : en);
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const v = (k: string) => String(f.get(k) ?? "").trim();
        const errs: Record<string, string> = {};
        if (!v("name")) errs.name = t("Please enter your name", "សូមបញ្ចូលឈ្មោះរបស់អ្នក");
        if (!PHONE.test(v("phone").replace(/[\s.\-()]/g, ""))) errs.phone = t("Please enter a valid phone number", "សូមបញ្ចូលលេខទូរស័ព្ទឱ្យត្រឹមត្រូវ");
        if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = t("Please enter a valid email", "សូមបញ្ចូលអ៊ីមែលឱ្យត្រឹមត្រូវ");
        if (!v("message")) errs.message = t("Please tell us a little about yourself", "សូមប្រាប់យើងបន្តិចអំពីខ្លួនអ្នក");
        setFieldErrors(errs);
        if (Object.keys(errs).length) return;

        setBusy(true); setError(null);
        const res = await apiSend("/careers/apply", "POST", {
            job_id: jobId, name: v("name"), phone: v("phone"), email: v("email") || undefined,
            experience: v("experience") || undefined, message: v("message"), website: v("website"),
        });
        setBusy(false);
        if (res.ok) setDone(true);
        else setError(res.status === 429
            ? t("Too many applications from your connection. Please try again later.", "មានការដាក់ពាក្យច្រើនពេក សូមព្យាយាមម្តងទៀតពេលក្រោយ។")
            : res.status === 0
                ? t("Could not reach the server. Please try again.", "មិនអាចតភ្ជាប់ម៉ាស៊ីនបម្រើបានទេ សូមព្យាយាមម្តងទៀត។")
                : errorText(res, t("Something went wrong. Please try again.", "មានបញ្ហាកើតឡើង សូមព្យាយាមម្តងទៀត។")));
    }

    if (done) {
        return (
            <div className={successClass} role="status">
                <div className="text-lg font-bold"><L en="Thank you! Your application was sent." kh="សូមអរគុណ! ពាក្យសុំរបស់អ្នកត្រូវបានផ្ញើហើយ។" /></div>
                <p className="mt-1 text-sm"><L en="We will contact you soon." kh="យើងនឹងទាក់ទងអ្នកឆាប់ៗនេះ។" /></p>
            </div>
        );
    }

    const err = (k: string) => fieldErrors[k] ? <p className="mt-1 text-sm text-rose-600" role="alert">{fieldErrors[k]}</p> : null;
    const id = (k: string) => `apply-${jobId ?? "general"}-${k}`;
    return (
        <form onSubmit={submit} noValidate className="grid gap-4 md:grid-cols-2">
            {/* honeypot: real people never see or fill this */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <div>
                <label className={labelClass} htmlFor={id("name")}><L en="Full name" kh="ឈ្មោះពេញ" /> *</label>
                <input id={id("name")} name="name" maxLength={100} autoComplete="name" className={inputClass} aria-invalid={!!fieldErrors.name} />{err("name")}
            </div>
            <div>
                <label className={labelClass} htmlFor={id("phone")}><L en="Phone number" kh="លេខទូរស័ព្ទ" /> *</label>
                <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} aria-invalid={!!fieldErrors.phone} />{err("phone")}
            </div>
            <div>
                <label className={labelClass} htmlFor={id("email")}><L en="Email (optional)" kh="អ៊ីមែល (ជាជម្រើស)" /></label>
                <input id={id("email")} name="email" type="email" maxLength={120} autoComplete="email" className={inputClass} aria-invalid={!!fieldErrors.email} />{err("email")}
            </div>
            <div>
                <label className={labelClass} htmlFor={id("experience")}><L en="Experience (optional)" kh="បទពិសោធន៍ (ជាជម្រើស)" /></label>
                <input id={id("experience")} name="experience" maxLength={500} placeholder={t("e.g. 2 years as a waiter", "ឧ. ២ឆ្នាំជាអ្នករត់តុ")} className={inputClass} />
            </div>
            <div className="md:col-span-2">
                <label className={labelClass} htmlFor={id("message")}><L en="Tell us about yourself" kh="ប្រាប់យើងអំពីខ្លួនអ្នក" /> *</label>
                <textarea id={id("message")} name="message" rows={4} maxLength={2000} className={inputClass} aria-invalid={!!fieldErrors.message} />{err("message")}
            </div>
            <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-3">
                    <button type="submit" disabled={busy} className={submitClass}>{busy ? t("Sending…", "កំពុងផ្ញើ…") : t("Send application", "ផ្ញើពាក្យសុំ")}</button>
                    {onCancel ? <button type="button" onClick={onCancel} className="rounded-full px-4 py-3 font-semibold text-[#8A4F0E] hover:bg-[#E5902C]/10"><L en="Cancel" kh="បោះបង់" /></button> : null}
                </div>
                {error ? <p className="mt-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{error}</p> : null}
            </div>
        </form>
    );
}
