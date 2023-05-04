import { DynamicData, SurvaySumbitType, getItemSchema } from "@/hooks/useFormSurvay";
import { ItemResponseSurvay, menuOptions, options } from "@/lib/survay";
import { useEffect } from "react";
import { FieldError, FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
const phoneTest = /^[+855|0|+8550][-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,5}$/i;

export default function ChoosingSurvayUI({ data, register, errors }: { data: ItemResponseSurvay, register: UseFormRegister<SurvaySumbitType>, errors: FieldErrors<SurvaySumbitType> }) {
    useEffect(() => {
        console.log(errors)
    }, [errors])
    return (
        <>
            {data.menuOption.map((menu, indexElement) => {
                let menuName = `_${menu.id}`;
                return (

                    <div className="my-10" key={`${menu.name_en}_${menu.id}`}>
                        <label htmlFor={`dataChoice.${indexElement}.${menuName}`} className="inline-block mb-2 font-semibold">{menu.name_en} <span className=" text-rose-400">*</span></label>
                        {errors.dataChoice?.[indexElement]?.message ? (<span className="text-rose-500">{errors?.dataChoice?.[indexElement]?.message}</span>):null}
                        <div className={`grid mb-4 lg:grid-cols-5 md:grid-cols-5`}>
                            {data.options.map((option, index) => (
                                <div key={`${menuName}_${option.id}_${index}`}>
                                    <input type="radio" className="mr-2  input_checkbox" value={option.id}  {...register(`dataChoice.${indexElement}.${menuName}`, { required: true, },)} />
                                    <label htmlFor="Yes">{option.name_en}</label>
                                </div>
                            ))}

                        </div>
                    </div>

                )
            })}
        </>
    );
}