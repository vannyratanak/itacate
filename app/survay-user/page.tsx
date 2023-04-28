import { ResponseSurvay } from "@/lib/survay";
import FormSurvay from "@/ui/FormSurvay";
import { SkeletonCard } from "@/ui/SkeletonCard";
import { Suspense } from "react";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
async function fetchSurvayField():Promise<ResponseSurvay> {
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
    title: 'Survay User'
};
export default async function Page() {
    let data = await fetchSurvayField();
    return (
        <>
            <div className="max-h-screen container mx-auto mt-5 max-w-screen-sm lg:max-w-screen-lg ">
                <Suspense fallback={<>
                    <div className="max-h-screen w-full">
                        <SkeletonCard />
                    </div>
                </>}>

                    <FormSurvay field_survay={data} />
                </Suspense>
            </div>
        </>
    )
}