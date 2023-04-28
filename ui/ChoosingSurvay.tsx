import {  ItemResponseSurvay, menuOptions,  options } from "@/lib/survay";

export default function ChoosingSurvayUI({data}:{data:ItemResponseSurvay}) {
    return (
        <>
            {data.menuOption.map(menu => {
                let menuName = `${menu.name_en}_${menu.id}`
                return (
                    <>
                        <div className="my-10">
                            <label htmlFor={menuName} className="block mb-2 font-semibold">{menu.name_en} <span className=" text-rose-400">*</span></label>
                            <div className={`grid mb-4 lg:grid-cols-5 md:grid-cols-5`}>
                                {data.options.map(option => (<>
                                    <div>
                                        <input type="radio" id="Yes" name={menuName} className="mr-2 mt-2 input_checkbox" value={option.id} />
                                        <label htmlFor="Yes">{option.name_en}</label>
                                    </div>
                                </>))}

                            </div>
                        </div>
                    </>
                )
            })}
        </>
    );
}