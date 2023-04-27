"use client";

import { useTranslate } from "@/hooks/useTranslate";
import Image from "next/image";
import {  useState ,SVGAttributes} from "react";
import Datepicker from "tailwind-datepicker-react"
export default function FormSurvay() {
    const trans = useTranslate();
    const [show, setShow] = useState <boolean>(false)
    const handleChange = (selectedDate: Date) => {
    }
    const handleClose = (state: boolean) => {
        setShow(state)
    }
    return (
        <>
            <form action="" className="p-2">
                <div className="grid lg:grid-cols-2 lg:gap-2">
                    <div className="">
                        <div className={`text-primary ${trans.name == "en" ? 'lg:text-3xl text-2xl' : 'lg:text-2xl text-xl'} font-semibold`}>{trans.menu.title_tell_us}</div>
                        <div className="mt-5 mb-4">
                            <InputTextComponent name={trans.menu.name} placeholder={trans.menu.name_placeholder} />
                        </div>
                        <div className="mb-4">
                            <InputTextComponent name={trans.menu.phone} placeholder={trans.menu.phone_placeholder} />
                        </div>
                        <div className="mb-4">
                             <label htmlFor={trans.menu.date_visit} className="block mb-2 font-semibold">{trans.menu.date_visit} <span className=" text-rose-400">*</span></label>
                            <DemoComponent handleChange={handleChange} show={show} handleClose={handleClose } />
                        </div>
                        <div>
                            <label htmlFor={trans.menu.restuarant} className="block mb-2 font-semibold">{trans.menu.restuarant} <span className=" text-rose-400">*</span></label>
                            <div className="grid lg:grid-cols-2">
                                <div>
                                <input type="radio" id="Yes"  name="visit" className="mr-2 input_checkbox"  value={"true"} />
                                <label htmlFor="Yes">Yes</label>
                                </div>
                                <div>
                                <input type="radio" id="No" name="visit" className="mr-2 input_checkbox"  value={"false"} />
                                <label htmlFor="No">No</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <Image
                            className="transition"
                            width={300}
                            height={90}
                            src={"/king.png"} alt={"Form King"} />
                    </div>
                </div>
            </form>

        </>
    );
}
function InputTextComponent({ name, placeholder, date }: { name: string, placeholder?: string, date?: boolean }) {
    let [placehoderState, setPlaceholderState] = useState<boolean>(false);
    return (
        <>
            <label htmlFor={name} className="block mb-2 font-semibold">{name} <span className=" text-rose-400">*</span></label>
            <input type="text" className="input_component" onFocus={(e) => {
                setPlaceholderState(true)
            }} onBlur={(e) => {
                setPlaceholderState(false);
            }} placeholder={placehoderState == true ? placeholder : undefined} />
        </>
    )
}

const options = {
    title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-[#F3EABF]",
        todayBtn: "",
        clearBtn: "text-[#E5902C] border-[#E5902C]/30 bg-[#E5902C]/30 focus:ring-[#E5902C]/30 focus:bg-[#E5902C]/30 hover:bg-[#E5902C]/30",
        icons: "text-[#E5902C] border-[#E5902C]/30 bg-[#E5902C]/30 focus:ring-[#E5902C]/30 focus:bg-[#E5902C]/30 hover:bg-[#E5902C]/30",
        text: "focus:text-[#F3EABF]",
        disabledText: "bg-[#E5902C]/30 text-[#E5902C]",
        input: " text-[#F3EABF]",
        inputIcon: "text-[#F3EABF]",
        selected: "bg-[#E5902C] text-[#F3EABF] hover:bg-[#E5902C]",
    },
    icons: {
        // () => ReactNode | JSX.Element
        prev: () => <><ArrowLeftIcon strokeWidth={2.5} className=" h-5 w-5"/></>,
        next: () => <><ArrowLongRightIcon strokeWidth={2.5} className=" h-5 w-5"/></>,
    },
    datepickerClassNames: "top-50",
    defaultDate: new Date(),
    language: "en",
}

const DemoComponent = ({handleChange,show,handleClose}:{handleChange: ((date: Date) => void) | undefined,show:boolean,handleClose:(show: boolean) => void}) => {
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