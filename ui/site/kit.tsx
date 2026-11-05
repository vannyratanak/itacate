import Link from "next/link";
import { ReactNode } from "react";

// Shared look for every public page: cream background, orange accents, brown text.
export const BRAND = { orange: "#E5902C", cream: "#F3EABF", ink: "#4A3412", soft: "#FBF5DC" };

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function PageHero({ title, subtitle, image }: { title: ReactNode; subtitle?: ReactNode; image?: string | null }) {
    return (
        <section className="relative overflow-hidden border-b border-[#E5902C]/25 bg-gradient-to-b from-[#FFFBEA] to-[#F3EABF]"
            style={image ? { backgroundImage: `linear-gradient(rgba(74,52,18,.55),rgba(74,52,18,.55)), url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
            <Container className="py-14 text-center md:py-20">
                <h1 className={`text-3xl font-bold tracking-tight md:text-5xl ${image ? "text-[#FFFBEA]" : "text-[#4A3412]"}`}>{title}</h1>
                {subtitle ? <p className={`mx-auto mt-4 max-w-2xl text-base md:text-lg ${image ? "text-[#F3EABF]" : "text-[#8A4F0E]"}`}>{subtitle}</p> : null}
            </Container>
        </section>
    );
}

export function Section({ title, subtitle, children, tone = "plain", className = "" }:
    { title?: ReactNode; subtitle?: ReactNode; children: ReactNode; tone?: "plain" | "soft"; className?: string }) {
    return (
        <section className={`${tone === "soft" ? "bg-[#FBF5DC]" : ""} py-12 md:py-16 ${className}`}>
            <Container>
                {title ? <h2 className="mb-2 text-center text-2xl font-bold text-[#4A3412] md:text-3xl">{title}</h2> : null}
                {subtitle ? <p className="mx-auto mb-8 max-w-2xl text-center text-[#8A4F0E]">{subtitle}</p> : <div className="mb-6" />}
                {children}
            </Container>
        </section>
    );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] p-5 shadow-[0_10px_30px_-14px_rgba(150,90,20,.35)] ${className}`}>{children}</div>;
}

export function ButtonLink({ href, children, variant = "solid" }: { href: string; children: ReactNode; variant?: "solid" | "outline" }) {
    const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#E5902C] focus:ring-offset-2 focus:ring-offset-[#F3EABF]";
    return <Link href={href} className={`${base} ${variant === "solid" ? "bg-[#E5902C] text-[#FFFBEA] shadow-md hover:bg-[#d4801f]" : "border-2 border-[#E5902C] text-[#8A4F0E] hover:bg-[#E5902C]/10"}`}>{children}</Link>;
}

// Form classes: identical to the survey form's orange inputs.
export const inputClass = "w-full rounded-lg border border-[#E5902C] bg-[#FFFBEA] px-3 py-2.5 text-[#4A3412] placeholder:text-[#E5902C]/70 shadow-sm focus:border-[#E5902C] focus:ring-1 focus:ring-[#E5902C]";
export const labelClass = "mb-1 block text-sm font-semibold text-[#4A3412]";
export const submitClass = "rounded-full bg-[#E5902C] px-8 py-3 text-base font-bold text-[#FFFBEA] shadow-md transition hover:bg-[#d4801f] focus:outline-none focus:ring-2 focus:ring-[#E5902C] focus:ring-offset-2 disabled:opacity-60";
export const errorClass = "mt-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700";
export const successClass = "rounded-2xl border border-[#E5902C]/40 bg-[#FFFBEA] p-6 text-center text-[#4A3412]";
