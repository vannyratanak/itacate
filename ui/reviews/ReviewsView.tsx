"use client";
import { ButtonLink, Card, PageHero, Section } from "@/ui/site/kit";
import { L, useLang } from "@/ui/site/L";
import { Review, ReviewSummary, formatDate } from "@/lib/offers";
import Stars from "@/ui/reviews/Stars";

function ReviewCard({ r }: { r: Review }) {
    const lang = useLang();
    return (
        <Card className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
                <Stars score={r.score} />
                {r.score != null ? <span className="text-sm font-bold text-[#8A4F0E]">{r.score.toFixed(1)}</span> : null}
            </div>
            <blockquote className="flex-1 leading-relaxed text-[#4A3412]">
                <span aria-hidden="true" className="mr-1 text-3xl font-black leading-none text-[#E5902C]/60">“</span>{r.message}
            </blockquote>
            <footer className="flex items-center gap-3 border-t border-[#E5902C]/20 pt-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E5902C] text-sm font-bold text-[#FFFBEA]" aria-hidden="true">{r.first_name.slice(0, 1).toUpperCase()}</span>
                <div className="text-sm"><div className="font-semibold text-[#4A3412]">{r.first_name}</div><div className="text-[#8A4F0E]">{formatDate(r.created_at, lang)}</div></div>
            </footer>
        </Card>
    );
}

export default function ReviewsView({ reviews, summary }: { reviews: Review[]; summary: ReviewSummary }) {
    return (
        <>
            <PageHero
                title={<L en="What our guests say" kh="អ្វីដែលភ្ញៀវរបស់យើងនិយាយ" />}
                subtitle={summary.average != null ? (
                    <span className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        <span className="inline-flex items-center gap-2"><Stars score={summary.average} size={26} /><strong className="text-2xl text-[#4A3412]">{summary.average.toFixed(1)}</strong><span>/ 5</span></span>
                        <span className="hidden sm:inline" aria-hidden="true">·</span>
                        <span><L en={`${summary.responses} survey responses`} kh={`ការឆ្លើយតបស្ទង់មតិ ${summary.responses}`} /></span>
                    </span>
                ) : <L en="Real comments from our survey." kh="មតិពិតពីការស្ទង់មតិរបស់យើង។" />}
            />
            <Section>
                {reviews.length ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{reviews.map(r => <ReviewCard key={r.id} r={r} />)}</div>
                ) : (
                    <Card className="mx-auto max-w-xl text-center">
                        <div className="text-4xl" aria-hidden="true">💬</div>
                        <p className="mt-2 font-semibold text-[#4A3412]"><L en="No reviews to show yet" kh="មិនទាន់មានមតិត្រូវបង្ហាញទេ" /></p>
                        <p className="mt-1 text-sm text-[#8A4F0E]"><L en="Be the first to tell us about your visit." kh="សូមជាអ្នកដំបូងដែលប្រាប់យើងអំពីដំណើរមកលេងរបស់អ្នក។" /></p>
                    </Card>
                )}
                <div className="mt-10 text-center">
                    <ButtonLink href="/survey"><L en="Share your experience" kh="ចែករំលែកបទពិសោធន៍របស់អ្នក" /></ButtonLink>
                </div>
            </Section>
        </>
    );
}
