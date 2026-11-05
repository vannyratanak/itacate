import { SVGAttributes } from "react";

export const datepickerOptions = {
    title: "Visiting Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-[#FBF5DC]",
        todayBtn: "",
        clearBtn: "",
        icons: "cal-nav",
        text: "",
        disabledText: "cal-out",
        input: "text-black",
        inputIcon: "text-[#F3EABF] bg-[#E5902C]",
        selected: "cal-sel",
    },
    icons: {
        prev: () => <ChevronIcon dir="left" />,
        next: () => <ChevronIcon dir="right" />,
    },
    datepickerClassNames: "top-50 itacate-cal",
    defaultDate: new Date(),
    language: "en",
}


export function ChevronIcon({ dir, ...props }: { dir: "left" | "right" } & SVGAttributes<SVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-5" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d={dir === "left" ? "M14.5 6L8.5 12l6 6" : "M9.5 6l6 6-6 6"} />
        </svg>
    );
}
