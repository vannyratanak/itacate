
"use client";
import { ItemResponseSurvay } from "@/lib/survay";

export function TableChoosingChoice({ data }: { data: ItemResponseSurvay }) {
    return (
        <>
            <table className=" table-auto w-full">

                <thead className="">
                    <tr className="bg-[#E5902C] text-center text-[#F3EABF]">
                        <th className=""></th>

                        {data.options.map(element => (<th className="p-2 text-center font-normal w-24" key={element.name_en}>{element.name_en}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-1"></td>
                    </tr>
                    {data.menuOption.map(element => (
                        <tr key={`${element.name_en}_${element.id}`} className="leading-loose border-[#E5902C] border-b-2">
                            <td className=""><label htmlFor={`${element.name_en}_${element.id}`} className="block mb-2 font-semibold">{element.name_en} </label></td>
                            {data.options.map((option,index) => (
                                <td key={`${option.id}_${index}`} className="border-l-2 border-[#E5902C] text-center "><input type="radio" id="Yes" name={`${element.name_en}_${element.id}`} className=" input_checkbox" value={option.id} /></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>);
}