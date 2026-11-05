"use client";
import { DAY_NAMES, Settings } from "@/lib/settings";
import { Card } from "@/ui/site/kit";
import { useLang } from "@/ui/site/L";
import { T } from "@/ui/messages/T";

const Icon = ({ d }: { d: string }) => (
    <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#E5902C] text-[#FFFBEA]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
    </span>
);

const heading = "text-sm font-bold uppercase tracking-widest text-[#8A4F0E]";

// Address, phone, email, hours, map and social links (all from the public /settings).
export default function ContactInfo({ settings }: { settings: Settings }) {
    const lang = useLang();
    const address = lang === "kh" ? settings.address_kh || settings.address_en : settings.address_en;
    const socials = ([["Facebook", settings.facebook], ["Instagram", settings.instagram], ["Telegram", settings.telegram], ["TikTok", settings.tiktok]] as [string, string | null][]).filter(([, u]) => u);
    return (
        <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <Card>
                    <Icon d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <h3 className={heading}><T k="address" /></h3>
                    <p className="mt-1 text-[#4A3412]">{address}</p>
                    {settings.map_url ? <a href={settings.map_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-[#8A4F0E] underline"><T k="getDirections" /></a> : null}
                </Card>
                <Card>
                    <Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                    <h3 className={heading}><T k="callUs" /></h3>
                    {settings.phone ? <a className="mt-1 block text-lg font-semibold text-[#4A3412] hover:underline" href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a> : null}
                    {settings.email ? <a className="mt-1 block break-all text-[#4A3412] hover:underline" href={`mailto:${settings.email}`}>{settings.email}</a> : null}
                </Card>
            </div>
            <Card>
                <h3 className={heading}><T k="hours" /></h3>
                <ul className="mt-3 divide-y divide-[#E5902C]/20 text-[#4A3412]">
                    {settings.hours.map(d => (
                        <li key={d.day} className="flex justify-between gap-3 py-1.5 text-sm">
                            <span className="font-semibold">{DAY_NAMES[lang][d.day]}</span>
                            <span>{d.closed ? <T k="closed" /> : `${d.open} – ${d.close}`}</span>
                        </li>
                    ))}
                </ul>
            </Card>
            {socials.length ? (
                <Card>
                    <h3 className={heading}><T k="followUs" /></h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {socials.map(([n, u]) => <a key={n} href={u!} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#E5902C] px-4 py-1.5 text-sm font-semibold text-[#8A4F0E] hover:bg-[#E5902C]/15">{n}</a>)}
                    </div>
                </Card>
            ) : null}
        </div>
    );
}
