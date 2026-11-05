import { fetchPosts } from "@/lib/blog";
import { Container, PageHero } from "@/ui/site/kit";
import { L } from "@/ui/site/L";
import { Pagination, PostGrid } from "@/ui/blog/BlogUI";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog & news" };

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
    const page = Math.max(parseInt(searchParams?.page ?? "1", 10) || 1, 1);
    const data = await fetchPosts(page, 9);
    return (
        <>
            <PageHero title={<L en="Blog & news" kh="ព័ត៌មាន និងរឿងរ៉ាវ" />} subtitle={<L en="Stories from our kitchen, new dishes and what is happening at Itacate." kh="រឿងរ៉ាវពីផ្ទះបាយរបស់យើង មុខម្ហូបថ្មី និងព្រឹត្តិការណ៍នៅ Itacate។" />} />
            <Container className="py-12 md:py-16">
                {data.items.length ? (
                    <>
                        <PostGrid posts={data.items} />
                        <Pagination page={data.page} pages={data.pages} />
                    </>
                ) : (
                    <p className="py-16 text-center text-lg text-[#8A4F0E]"><L en="No posts yet. Please check back soon." kh="មិនទាន់មានអត្ថបទទេ។ សូមត្រឡប់មកវិញក្រោយ។" /></p>
                )}
            </Container>
        </>
    );
}
