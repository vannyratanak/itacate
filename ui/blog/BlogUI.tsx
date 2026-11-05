"use client";
import Link from "next/link";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { PostSummary, Post, cover } from "@/lib/blog";
import { assetUrl } from "@/lib/shop";
import { L, useLang, usePick } from "@/ui/site/L";

export function useDate() {
    const lang = useLang();
    return (iso: string | null) => (iso ? new Date(iso).toLocaleDateString(lang === "kh" ? "km-KH" : "en-US", { year: "numeric", month: "long", day: "numeric" }) : "");
}

export function PostCard({ post }: { post: PostSummary }) {
    const t = usePick();
    const date = useDate();
    const img = cover(post.cover_url);
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5902C]/25 bg-[#FFFBEA] shadow-[0_10px_30px_-14px_rgba(150,90,20,.35)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(150,90,20,.45)]">
            <Link href={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-[#F3EABF]" tabIndex={-1} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img ? <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-full w-full" />}
            </Link>
            <div className="flex flex-1 flex-col p-5">
                <time className="text-xs font-semibold uppercase tracking-widest text-[#E5902C]" dateTime={post.published_at ?? undefined}>{date(post.published_at)}</time>
                <h2 className="mt-2 text-xl font-bold leading-snug text-[#4A3412]">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#E5902C] focus:outline-none focus-visible:underline">{t(post, "title")}</Link>
                </h2>
                {t(post, "excerpt") ? <p className="mt-2 flex-1 text-[#6b4a1f]">{t(post, "excerpt")}</p> : <div className="flex-1" />}
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#E5902C] hover:underline">
                    <L en="Read more" kh="អានបន្ថែម" /> <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}

export function PostGrid({ posts }: { posts: PostSummary[] }) {
    return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map(p => <PostCard key={p.id} post={p} />)}</div>;
}

export function Pagination({ page, pages }: { page: number; pages: number }) {
    if (pages <= 1) return null;
    const href = (n: number) => (n === 1 ? "/blog" : `/blog?page=${n}`);
    const nums = Array.from({ length: pages }, (_, i) => i + 1);
    const base = "grid h-10 min-w-10 place-items-center rounded-full border border-[#E5902C]/40 px-3 text-sm font-semibold";
    return (
        <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? <Link href={href(page - 1)} className={`${base} text-[#8A4F0E] hover:bg-[#E5902C]/15`}>← <L en="Previous" kh="មុន" /></Link> : null}
            {nums.map(n => <Link key={n} href={href(n)} aria-current={n === page ? "page" : undefined} className={`${base} ${n === page ? "border-[#E5902C] bg-[#E5902C] text-[#FFFBEA]" : "text-[#8A4F0E] hover:bg-[#E5902C]/15"}`}>{n}</Link>)}
            {page < pages ? <Link href={href(page + 1)} className={`${base} text-[#8A4F0E] hover:bg-[#E5902C]/15`}><L en="Next" kh="បន្ទាប់" /> →</Link> : null}
        </nav>
    );
}

// The backend already sanitises on write; this is parsed into React elements (never dangerouslySetInnerHTML) and links/images are re-checked.
const parseOptions: HTMLReactParserOptions = {
    replace(node) {
        if (!(node instanceof Element)) return;
        if (node.name === "a") {
            const href = node.attribs?.href ?? "";
            if (href.startsWith("/") && !href.startsWith("//")) {
                return <Link href={href} className="font-semibold text-[#E5902C] underline">{(node.children as any[]).map((c: any) => c.data ?? "")}</Link>;
            }
        }
        if (node.name === "img") {
            const src = assetUrl(node.attribs?.src ?? null) ?? "";
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={node.attribs?.alt ?? ""} loading="lazy" className="mx-auto rounded-2xl" />;
        }
    },
};

export function PostBody({ post }: { post: Post }) {
    const lang = useLang();
    const html = lang === "kh" && post.html_kh ? post.html_kh : post.html_en;
    return (
        <div className="prose prose-lg mx-auto max-w-none prose-headings:text-[#4A3412] prose-p:text-[#4A3412]/90 prose-li:text-[#4A3412]/90 prose-strong:text-[#4A3412] prose-a:text-[#E5902C] prose-li:marker:text-[#E5902C] prose-blockquote:border-[#E5902C] prose-blockquote:text-[#8A4F0E]">
            {parse(html, parseOptions)}
        </div>
    );
}

export function PostHeader({ post }: { post: Post }) {
    const t = usePick();
    const date = useDate();
    return (
        <header className="mx-auto max-w-3xl text-center">
            <time className="text-sm font-semibold uppercase tracking-widest text-[#E5902C]" dateTime={post.published_at ?? undefined}>{date(post.published_at)}</time>
            <h1 className="mt-3 text-3xl font-bold leading-[1.4] text-[#4A3412] md:text-5xl">{t(post, "title")}</h1>
            {t(post, "excerpt") ? <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8A4F0E]">{t(post, "excerpt")}</p> : null}
        </header>
    );
}
