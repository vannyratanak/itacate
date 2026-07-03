import { ResponseSurvey } from "@/lib/survey";
import FormSurvey from "@/ui/FormSurvey";
import { SkeletonCard } from "@/ui/SkeletonCard";
import { Suspense } from "react";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function fetchSurveyField():Promise<ResponseSurvey> {
    const res = await fetch(backendURL + "/surveys/field", {
        next:{revalidate:20},
        headers: {
            'Content-Type': 'application/json',
        }
    },);
    const fields = await res.json();
    return fields;
}
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
