import { SurveyFormValues, answerKey } from "@/hooks/useFormSurvey";
import { useTranslate } from "@/hooks/useTranslate";
import { ItemResponseSurvey, localName } from "@/lib/survey";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function ChoosingSurveyUI({ data, register, errors }: { data: ItemResponseSurvey, register: UseFormRegister<SurveyFormValues>, errors: FieldErrors<SurveyFormValues> }) {
    const trans = useTranslate();
    return (
        <>
            {data.menuOption.map(menu => {
                const key = answerKey(menu.id);
                const error = errors.answers?.[key]?.message as string | undefined;
                return (
                    <fieldset className="my-10" key={menu.id}>
                        <legend className={`inline-block mb-2 font-semibold ${error ? "text-rose-500" : ""}`}>
                            {localName(menu, trans.name)} <span className="text-rose-400">*</span>
                            {error ? <span className="ml-2 font-normal text-rose-500">{error}</span> : null}
                        </legend>
                        <div className="grid mb-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-2">
                            {data.options.map(option => {
                                const id = `${key}_${option.id}`;
                                return (
                                    <div key={id} className="flex items-center">
                                        <input id={id} type="radio" className="mr-2 input_checkbox" value={option.id} {...register(`answers.${key}`)} />
                                        <label htmlFor={id}>{localName(option, trans.name)}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>
                );
            })}
        </>
    );
}
