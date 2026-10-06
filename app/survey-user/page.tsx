import { ResponseSurvey } from "@/lib/survey";
import FormSurvey from "@/ui/FormSurvey";
import { SkeletonCard } from "@/ui/SkeletonCard";
import { Suspense } from "react";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function fetchSurveyField():Promise<ResponseSurvey> {
    const res = await fetch(backendURL + "/surveys/field", {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(8000),
    } as RequestInit);
    if (!res.ok) throw new Error(`Survey fields request failed: ${res.status}`);
    return res.json();
}
// Render per request: the cached (ISR) copy was served as an empty 304 once stale, giving a blank page on refresh
export const dynamic = 'force-dynamic';
export const metadata = {
    title: 'Survey User'
};
export default async function Page() {
    let data = await fetchSurveyField();
    return (
        <>
            <div className="max-h-screen container mx-auto mt-5 max-w-screen-sm lg:max-w-screen-lg ">
                <Suspense fallback={<>
                    <div className="max-h-screen w-full">
                        <SkeletonCard />
                    </div>
                </>}>

                    <FormSurvey field_survey={data} />
                </Suspense>
            </div>
        </>
    )
}
