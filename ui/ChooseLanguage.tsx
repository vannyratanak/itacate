"use client";

import { dispatchTranslate } from "@/hooks/useTranslate";
import { useRouter } from "next/navigation";


export default function ChooseLanguage() {
    const dispatch = dispatchTranslate()
    const router = useRouter()
    return (
    <>
        <button className="btn" onClick={(e)=>{
            dispatch({type:"kh"})
            router.push("/survay-user")
        }}>ខ្មែរ</button>
        <button className="btn"onClick={(e)=>{
            dispatch({type:"en"})
            router.push("/survay-user")
        }}>English</button>   
    </>
    );
}