"use client";
import { useTranslate } from "@/hooks/useTranslate";
import { ResponseSurvay } from "@/lib/survay";
import Image from "next/image";
import { useState, SVGAttributes, use, useEffect, Suspense, FormEvent } from "react";
import Datepicker from "tailwind-datepicker-react"
import ListingItemSurvay from "./ListingItemSurvay";
import { SkeletonCard } from "@/ui/SkeletonCard";
import { useFormSurvay } from "@/hooks/useFormSurvay";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

export default function FormSurvay({ field_survay }: { field_survay: ResponseSurvay }) {
    const { trans, submit, show, handleChange, handleClose, handleSubmit, register, errors } = useFormSurvay();
    function ShowError({message}:{message?:string}) {
        return (<>
            {message ? <span className="text-rose-500">{message}</span> : null}
        </>);
    }
    return (
        <>
            <form action="#" className="p-2 w-full " onSubmit={handleSubmit(submit)}>
                <div className="grid lg:grid-cols-2 lg:gap-2 mx-auto">
                    <div className="">
                        <div className={`text-primary ${trans.name == "en" ? 'lg:text-3xl text-2xl' : 'lg:text-2xl text-xl'} font-semibold`}>{trans.menu.title_tell_us}</div>
                        <div className="mt-5 mb-4">
                            <InputTextComponent register={register('username')}  error={errors.username?.message} name={trans.menu.name} placeholder={trans.menu.name_placeholder} />
                        </div>
                        <div className="mb-4">
                            <InputTextComponent register={register('phone')} error={errors.phone?.message} name={trans.menu.phone} placeholder={trans.menu.phone_placeholder} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={trans.menu.date_visit} className="block mb-2 font-semibold">{trans.menu.date_visit} <span className=" text-rose-400">*</span></label>
                            <DemoComponent handleChange={handleChange} show={show} handleClose={handleClose} />
                        </div>
                        <div>
                            <label htmlFor={trans.menu.restuarant} className="inline-block mb-2 font-semibold">{trans.menu.restuarant} <span className=" text-rose-400">*</span></label>
                            <ShowError message={errors.visit?.message}/>
                            <div className="grid grid-cols-2 mb-4">
                                <div>
                                    <input type="radio" id="Yes" {...register("visit")} name="visit" className="mr-2 input_checkbox" value={"true"} />
                                    <label htmlFor="Yes">Yes</label>
                                </div>
                                <div>
                                    <input type="radio" id="No" {...register("visit")} name="visit" className="mr-2 input_checkbox" value={"false"} />
                                    <label htmlFor="No">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <Image
                            className="transition h-auto w-auto"
                            width={300}
                            height={90}
                            src={"/king.png"} alt={"Form King"} />
                    </div>
                </div>
                <div className="my-5">
                    <Suspense fallback={<><SkeletonCard /></>}>
                        <label htmlFor={trans.menu.choose_following} className="block mb-2 font-semibold" >{trans.menu.choose_following} <span className=" text-rose-400">*</span></label>
                        <ListingItemSurvay data={field_survay} register={register("dataChoice")} />

                    </Suspense>
                </div>

                <div className="w-full">
                    <label htmlFor={trans.menu.comment} className="block  mb-2 font-semibold">{trans.menu.comment}</label>
                    <TextArea />
                </div>
                <div className=" w-full">
                    <button type="submit" className=" float-right  btn mt-2 mb-2 ">
                        Submit
                    </button>
                </div>
            </form>

        </>
    );
}
function InputTextComponent({ name, placeholder, date, register,error }: { name: string, placeholder?: string, date?: boolean, register?: UseFormRegisterReturn,error?:string }) {
    let [placehoderState, setPlaceholderState] = useState<boolean>(false);
    return (
        <>
            <label htmlFor={name} className={`block mb-2 font-semibold ${error?'text-rose-500':''}`}>{name} <span className=" text-rose-400">*</span></label>
            <input type="text" className={`${error?'input_error':'input_component'}`} {...register} onFocus={(e) => {
                setPlaceholderState(true)
            }} onBlur={(e) => {
                setPlaceholderState(false);
            }} placeholder={placehoderState == true ? placeholder : undefined} />
            {error?<div className="text-rose-500 mt-2">{error}</div>:null}
        </>
    )
}
function TextArea() {
    return (<>
        <textarea className="selection:bg-[#E5902C] text-gray-700 selection:text-[#F3EABF] placeholder:text-[#E5902C] w-full border-[#E5902C] transition bg-[#F3EABF] rounded-sm shadow-sm focus:ring-[#E5902C] focus:ring-1 focus:border-[#E5902C]" rows={8} name="" placeholder="Write your comment or sugestions ...." ></textarea>
    </>)
}
const options = {
    title: "Visiting Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-[#F3EABF]",
        todayBtn: "",
        clearBtn: "text-[#E5902C] border-[#E5902C]/30 bg-[#E5902C]/30 focus:ring-[#E5902C]/30 focus:bg-[#E5902C]/30 hover:bg-[#E5902C]/30",
        icons: "text-[#E5902C] border-[#E5902C]/30 bg-[#E5902C]/30 focus:ring-[#E5902C]/30 focus:bg-[#E5902C]/30 hover:bg-[#E5902C]/30",
        text: "focus:text-[#F3EABF]",
        disabledText: "bg-[#E5902C]/30 text-[#E5902C]",
        input: " text-black",
        inputIcon: "text-[#F3EABF] bg-[#E5902C]",
        selected: "bg-[#E5902C] text-[#F3EABF] hover:bg-[#E5902C]",
    },
    icons: {
        // () => ReactNode | JSX.Element
        prev: () => <><ArrowLeftIcon strokeWidth={2.5} className=" h-5 w-5" /></>,
        next: () => <><ArrowLongRightIcon strokeWidth={2.5} className=" h-5 w-5" /></>,
    },
    datepickerClassNames: "top-50",
    defaultDate: new Date(),
    language: "en",
}

const DemoComponent = ({ handleChange, show, handleClose }: { handleChange: ((date: Date) => void) | undefined, show: boolean, handleClose: (show: boolean) => void }) => {
    return (
        <div>
            <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
        </div>
    )
}
export function ArrowLeftIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
    );
}
export function ArrowLongRightIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
    );
}