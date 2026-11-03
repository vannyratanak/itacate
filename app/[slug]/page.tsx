import { notFound } from "next/navigation";
import { fetchPage, menuFor } from "@/lib/pages";
import PageContent from "@/ui/PageContent";

// Pages are edited in the backend dashboard's page builder, so render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const page = await fetchPage(params.slug);
    return { title: page?.title ?? "Not found" };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const page = await fetchPage(params.slug);
    if (!page) notFound();
    return <PageContent page={page} items={await menuFor(page)} />;
}
