
import { SurvaySumbitType } from "@/hooks/useFormSurvay";
import { ItemResponseSurvay } from "@/lib/survay";
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

export function TableChoosingChoice({ data, register, errors }: { data: ItemResponseSurvay, register: UseFormRegister<SurvaySumbitType>, errors: FieldErrors<SurvaySumbitType> }) {
    return (
        <>
            <table className=" table-auto w-full">

                <thead className="">
                    <tr className="bg-[#E5902C] text-center text-[#F3EABF]">
                        <th className=""></th>

                        {data.options.map((element, index) => {
                            let name = `${element.name_en}_${element.id}`;
                            return (<th className="p-2 text-center font-normal w-24" key={element.name_en}>{element.name_en} </th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1"></td>
                    </tr>
                    {data.menuOption.map((element, indexElement) => {
                        let name = `${element.name_en}_${element.id}`;
                        return (
                            <tr key={`${element.name_en}_${element.id}`} className="leading-loose border-[#E5902C] border-b-2">
                                <td className=""><label htmlFor={`${element.name_en}_${element.id}`} className=" inline-block mb-2 font-semibold">{element.name_en}  </label>
                                {errors?.dataChoice && errors.dataChoice?.[indexElement]?.message && (
                                    <><br /><span className="text-rose-500">{errors.dataChoice?.[indexElement]?.message  as string|null}</span></>
                                )}
                                </td>
                                {data.options.map((option, index) => (
                                    <td key={`${element.name_en}_${element.id}_${index}`} className="border-l-2 border-[#E5902C] text-center "><input type="radio" id="Yes" className=" input_checkbox" value={option.id} {...register(`dataChoice.${indexElement}.${name}`, { required: true })} /></td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>);
}