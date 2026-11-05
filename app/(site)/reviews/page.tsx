import { apiGet } from "@/lib/api";
import { Review, ReviewSummary } from "@/lib/offers";
import ReviewsView from "@/ui/reviews/ReviewsView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Reviews" };

export default async function ReviewsPage() {
    const [reviews, summary] = await Promise.all([
        apiGet<Review[]>("/reviews", []),
        apiGet<ReviewSummary>("/reviews/summary", { responses: 0, approved: 0, average: null }),
    ]);
    return <ReviewsView reviews={reviews} summary={summary} />;
}
