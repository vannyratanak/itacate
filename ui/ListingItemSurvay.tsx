import { ResponseSurvay } from "@/lib/survay";
import { TableChoosingChoice } from "./TableChoosingForm";
import ChoosingSurvayUI from "./ChoosingSurvay";
import { Suspense } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { SurvaySumbitType } from "@/hooks/useFormSurvay";

export default function ListingItemSurvay({ data, register,errors}: { data: ResponseSurvay ,register:UseFormRegister<SurvaySumbitType>,errors:FieldErrors<SurvaySumbitType>}) {
    return (
        <>
            <Suspense fallback={<><SkeletonCard /></>}>
                {data.map((value, index) => {
                    if (value.id == 1) {
                        return (
                            <TableChoosingChoice data={value} key={value.id} register={register} errors={errors}/>
                        )
                    } else {
                        return (
                            <ChoosingSurvayUI data={value} key={value.id} register={register} errors={errors}/>
                        )
                    }
                })}

            </Suspense>

        </>)
}