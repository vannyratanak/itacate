import Link from "next/link";
import { notFound } from "next/navigation";
import { cover, fetchPost, fetchPosts } from "@/lib/blog";
import { Container, ButtonLink } from "@/ui/site/kit";
import { L } from "@/ui/site/L";
import { PostBody, PostGrid, PostHeader } from "@/ui/blog/BlogUI";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await fetchPost(params.slug);
    return post ? { title: post.title_en, description: post.excerpt_en ?? undefined } : { title: "Post not found" };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
    const [post, latest] = await Promise.all([fetchPost(params.slug), fetchPosts(1, 4)]);
    if (!post) notFound();
    const more = latest.items.filter(p => p.slug !== post.slug).slice(0, 3);
    const img = cover(post.cover_url);
    return (
        <>
            <Container className="pt-8">
                <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-[#E5902C] hover:underline">← <L en="All posts" kh="អត្ថបទទាំងអស់" /></Link>
            </Container>
            <article className="py-8 md:py-12">
                <Container><PostHeader post={post} /></Container>
                {img ? (
                    <Container className="mt-8 max-w-4xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="aspect-[16/9] w-full rounded-3xl object-cover shadow-[0_18px_40px_-16px_rgba(150,90,20,.45)]" />
                    </Container>
                ) : null}
                <Container className="mt-10 max-w-3xl"><PostBody post={post} /></Container>
            </article>
            <section className="border-t border-[#E5902C]/25 bg-[#FBF5DC] py-12">
                <Container>
                    {more.length ? (
                        <>
                            <h2 className="mb-6 text-center text-2xl font-bold text-[#4A3412]"><L en="More posts" kh="អត្ថបទផ្សេងទៀត" /></h2>
                            <PostGrid posts={more} />
                        </>
                    ) : null}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <ButtonLink href="/reservations"><L en="Book a table" kh="កក់តុ" /></ButtonLink>
                        <ButtonLink href="/menu" variant="outline"><L en="See the menu" kh="មើលម៉ឺនុយ" /></ButtonLink>
                    </div>
                </Container>
            </section>
        </>
    );
}
