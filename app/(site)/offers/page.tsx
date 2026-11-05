import { apiGet } from "@/lib/api";
import { Offer } from "@/lib/offers";
import OffersView from "@/ui/offers/OffersView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Offers & Events" };

export default async function OffersPage() {
    const [offers, events] = await Promise.all([
        apiGet<Offer[]>("/offers?kind=offer", []),
        apiGet<Offer[]>("/offers?kind=event", []),
    ]);
    return <OffersView offers={offers} events={events} />;
}
