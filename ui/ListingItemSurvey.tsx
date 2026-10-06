import { ResponseSurvey } from "@/lib/survey";
import { TableChoosingChoice } from "./TableChoosingForm";
import ChoosingSurveyUI from "./ChoosingSurvey";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SurveyFormValues } from "@/hooks/useFormSurvey";

export default function ListingItemSurvey({ data, register, errors }: { data: ResponseSurvey, register: UseFormRegister<SurveyFormValues>, errors: FieldErrors<SurveyFormValues> }) {
    return (
        <>
            {data.map(value => value.id == 1
                ? <TableChoosingChoice data={value} key={value.id} register={register} errors={errors} />
                : <ChoosingSurveyUI data={value} key={value.id} register={register} errors={errors} />)}
        </>
    );
}
