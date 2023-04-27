"use client";

import { useTranslate } from "@/hooks/useTranslate";
export default function ThankForFeedBack(){
    const trans = useTranslate();
    return (
        <>
            <p className="lg:leading-relaxed font-serif whitespace-pre-wrap  text-center lg:text-3xl text-primary text-xl">
                {trans.menu.feeback_message}
            </p>
           <div className="mt-10 text-center text-sm lg:text-xl lg:leading-normal">
           <div className="text-primary">
                {trans.menu.contact.phone}
            </div>
            <div className="text-primary">  
                {trans.menu.contact.email}
            </div>
           </div>
        </>
    );
}