import { apiGet } from "@/lib/api";
import { L } from "@/ui/site/L";
import { PageHero, Section } from "@/ui/site/kit";
import GalleryGrid, { GalleryItem } from "@/ui/gallery/GalleryGrid";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery", description: "Photos of our food, our dining room and our evenings." };

export default async function GalleryPage() {
    const items = await apiGet<GalleryItem[]>("/gallery", []);
    return (
        <>
            <PageHero
                title={<L en="Gallery" kh="វិចិត្រសាល" />}
                subtitle={<L en="A taste of the food, the room and the good evenings." kh="រសជាតិនៃអាហារ បរិយាកាស និងពេលល្ងាចដ៏ល្អ។" />} />
            <Section><GalleryGrid items={items} /></Section>
        </>
    );
}
