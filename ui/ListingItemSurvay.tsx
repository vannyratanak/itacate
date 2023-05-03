import { ResponseSurvay } from "@/lib/survay";
import { TableChoosingChoice } from "./TableChoosingForm";
import ChoosingSurvayUI from "./ChoosingSurvay";
import { Suspense } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { UseFormRegisterReturn } from "react-hook-form";

export default function ListingItemSurvay({ data, register}: { data: ResponseSurvay ,register:UseFormRegisterReturn}) {
    return (
        <>
            <Suspense fallback={<><SkeletonCard /></>}>
                {data.map((value, index) => {
                    if (value.id == 1) {
                        return (
                            <TableChoosingChoice data={value} key={value.id} />
                        )
                    } else {
                        return (
                            <ChoosingSurvayUI data={value} key={value.id} />
                        )
                    }
                })}

            </Suspense>

        </>)
}