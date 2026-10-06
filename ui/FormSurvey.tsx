"use client";
import { useTranslate } from "@/hooks/useTranslate";
import { ResponseSurvey } from "@/lib/survey";
import Image from "next/image";
import { useState, SVGAttributes, Suspense } from "react";
import Datepicker from "tailwind-datepicker-react"
import ListingItemSurvey from "./ListingItemSurvey";
import { SkeletonCard } from "@/ui/SkeletonCard";
import { useFormSurvey } from "@/hooks/useFormSurvey";
import { UseFormRegisterReturn } from "react-hook-form";

export default function FormSurvey({ field_survey }: { field_survey: ResponseSurvey }) {
    const { trans, submit, submitError, isSubmitting, setDate, register, errors } = useFormSurvey(field_survey);
    const [show, setShow] = useState(false);
    function ShowError({message}:{message?:string}) {
        return (<>
            {message ? <span className="text-rose-500">{message}</span> : null}
        </>);
    }
    return (
        <>
            <form noValidate className="p-2 w-full" onSubmit={submit}>
                <div className="grid lg:grid-cols-2 lg:gap-2 mx-auto">
                    <div className="">
                        <div className={`text-primary ${trans.name == "en" ? 'lg:text-3xl text-2xl' : 'lg:text-2xl text-xl'} font-semibold`}>{trans.menu.title_tell_us}</div>
                        <div className="mt-5 mb-4">
                            <InputTextComponent id="username" autoComplete="name" register={register('username')}  error={errors.username?.message} name={trans.menu.name} placeholder={trans.menu.name_placeholder} />
                        </div>
                        <div className="mb-4">
                            <InputTextComponent id="phone" type="tel" autoComplete="tel" register={register('phone')} error={errors.phone?.message} name={trans.menu.phone} placeholder={trans.menu.phone_placeholder} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block mb-2 font-semibold">{trans.menu.date_visit} <span className=" text-rose-400">*</span></label>
                            <DemoComponent handleChange={setDate} show={show} handleClose={setShow} />
                        </div>
                        <div>
                            <p className="inline-block mb-2 font-semibold">{trans.menu.restuarant} <span className=" text-rose-400">*</span></p>
                            <ShowError message={errors.visit?.message}/>
                            <div className="grid grid-cols-2 mb-4">
                                <div>
                                    <input type="radio" id="Yes" {...register("visit")} className="mr-2 input_checkbox" value={"true"} />
                                    <label htmlFor="Yes">{trans.menu.yes}</label>
                                </div>
                                <div>
                                    <input type="radio" id="No" {...register("visit")} className="mr-2 input_checkbox" value={"false"} />
                                    <label htmlFor="No">{trans.menu.no}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-[2rem] mb-4 order-first lg:order-none">
                        <Image
                            className="transition h-auto w-full"
                            width={300}
                            height={120}
                            src={"/king.png"} alt={"Form King"} />
                    </div>
                </div>
                <div className="my-5">
                    <Suspense fallback={<><SkeletonCard /></>}>
                        <p className="block mb-2 font-semibold">{trans.menu.choose_following} <span className=" text-rose-400">*</span></p>
                        <ListingItemSurvey data={field_survey} register={register} errors={errors}  />

                    </Suspense>
                </div>

                <div className="w-full">
                    <label htmlFor="description" className="block mb-2 font-semibold">{trans.menu.comment}</label>
                    <TextArea register={register("description")} placeholder={trans.menu.comment_placeholder} />
                </div>
                <div className=" w-full">
                    {submitError ? <p role="alert" className="text-rose-500 text-right mt-2">{submitError}</p> : null}
                    <button type="submit" disabled={isSubmitting} className="float-right btn mt-2 mb-2 disabled:opacity-60 disabled:cursor-wait">
                        {isSubmitting ? trans.menu.submitting : trans.menu.submit}
                    </button>
                </div>
            </form>

        </>
    );
}
function InputTextComponent({ id, name, placeholder, register, error, type = "text", autoComplete }: { id: string, name: string, placeholder?: string, register?: UseFormRegisterReturn, error?: string, type?: string, autoComplete?: string }) {
    const [focused, setFocused] = useState(false);
    const { onBlur, ...rest } = register ?? ({} as UseFormRegisterReturn);
    return (
        <>
            <label htmlFor={id} className={`block mb-2 font-semibold ${error ? 'text-rose-500' : ''}`}>{name} <span className=" text-rose-400">*</span></label>
            <input id={id} type={type} autoComplete={autoComplete} className={error ? 'input_error' : 'input_component'}
                aria-invalid={error ? true : undefined} {...rest}
                onFocus={() => setFocused(true)}
                onBlur={e => { setFocused(false); onBlur?.(e); }}
                placeholder={focused ? placeholder : undefined} />
            {error ? <div className="text-rose-500 mt-2">{error}</div> : null}
        </>
    )
}
function TextArea({ register, placeholder }: { register: UseFormRegisterReturn, placeholder: string }) {
    return (
        <textarea id="description" className="selection:bg-[#E5902C] text-gray-700 selection:text-[#F3EABF] placeholder:text-[#E5902C] w-full border-[#E5902C] transition bg-[#F3EABF] rounded-lg shadow-sm focus:ring-[#E5902C] focus:ring-1 focus:border-[#E5902C]" rows={6} placeholder={placeholder} {...register} />
    )
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
