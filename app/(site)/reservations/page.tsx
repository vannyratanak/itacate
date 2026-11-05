import type { Metadata } from "next";
import { fetchSettings } from "@/lib/settings";
import { Container, PageHero } from "@/ui/site/kit";
import { L } from "@/ui/site/L";
import HoursCard from "@/ui/reservations/HoursCard";
import ReservationForm from "@/ui/reservations/ReservationForm";
import { T } from "@/ui/reservations/text";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Reserve a table", description: "Book a table online and we will confirm by phone." };

export default async function ReservationsPage() {
    const settings = await fetchSettings();
    return (
        <>
            <PageHero title={<L en={T.title.en} kh={T.title.kh} />} subtitle={<L en={T.subtitle.en} kh={T.subtitle.kh} />} />
            <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
                <ReservationForm phone={settings.phone} />
                <aside><HoursCard settings={settings} /></aside>
            </Container>
        </>
    );
}
