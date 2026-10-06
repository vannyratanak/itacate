import { SurveyFormValues, answerKey } from "@/hooks/useFormSurvey";
import { useTranslate } from "@/hooks/useTranslate";
import { ItemResponseSurvey, localName } from "@/lib/survey";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export function TableChoosingChoice({ data, register, errors }: { data: ItemResponseSurvey, register: UseFormRegister<SurveyFormValues>, errors: FieldErrors<SurveyFormValues> }) {
    const trans = useTranslate();
    return (
        <div className="w-full overflow-x-auto">
            <table className="table-auto min-w-max w-full">
                <thead>
                    <tr className="bg-[#E5902C] text-center text-[#F3EABF]">
                        <th></th>
                        {data.options.map(option => (
                            <th className="p-2 text-center font-normal w-24 whitespace-nowrap" key={option.id}>{localName(option, trans.name)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr><td className="p-1"></td></tr>
                    {data.menuOption.map(menu => {
                        const key = answerKey(menu.id);
                        const error = errors.answers?.[key]?.message as string | undefined;
                        return (
                            <tr key={menu.id} className="leading-loose border-[#E5902C] border-b-2">
                                <th scope="row" className="text-left font-semibold">
                                    {localName(menu, trans.name)}
                                    {error ? <><br /><span className="font-normal text-rose-500">{error}</span></> : null}
                                </th>
                                {data.options.map(option => (
                                    <td key={option.id} className="border-l-2 border-[#E5902C] text-center">
                                        <input type="radio" className="input_checkbox" value={option.id}
                                            aria-label={`${localName(menu, trans.name)}: ${localName(option, trans.name)}`}
                                            {...register(`answers.${key}`)} />
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
