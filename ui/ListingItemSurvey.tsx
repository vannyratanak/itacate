import { ResponseSurvey } from "@/lib/survey";
import { TableChoosingChoice } from "./TableChoosingForm";
import ChoosingSurveyUI from "./ChoosingSurvey";
import { Suspense } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { SurveySumbitType } from "@/hooks/useFormSurvey";

export default function ListingItemSurvey({ data, register,errors}: { data: ResponseSurvey ,register:UseFormRegister<SurveySumbitType>,errors:FieldErrors<SurveySumbitType>}) {
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
                            <ChoosingSurveyUI data={value} key={value.id} register={register} errors={errors}/>
                        )
                    }
                })}

            </Suspense>

        </>)
}