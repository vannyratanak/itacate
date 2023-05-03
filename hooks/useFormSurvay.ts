import { FormEvent, useEffect, useState } from "react";
import { useTranslate } from "./useTranslate";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod, { ZodType } from "zod";
const phoneTest = /^[+855|0|+8550][-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,5}$/i;
type DynamicData = {
    [key: string]: unknown;
}
type SurvaySumbitType = {
    username: string,
    phone: string,
    description?: string,
    dataChoice: DynamicData[],
    visit?:string|null
}
export function useFormSurvay() {
    const trans = useTranslate();

    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);

    const handleChange = (selectedDate: Date) => {
    }
    const handleClose = (state: boolean) => {
        setShow(state);
    }

    const submit = async (e: SurvaySumbitType) => {
        console.log(e);
        // router.push("/survay-success")
    }
    const schema: ZodType<SurvaySumbitType> = zod.object({
        username: zod.string({ required_error: trans.menu.error.username }).refine(value=>value!=null,{message:trans.menu.error.username }),
        phone: zod.string({ required_error: trans.menu.error.phone_required }).regex(phoneTest, { message: trans.menu.error.phone_format }),
        description:zod.string().refine(value=>true),
        dataChoice:zod.array(zod.object({}).nonstrict()),
        visit:zod.string().nullable().refine(value=>value!=null,{message:trans.menu.error.choose})
    })
    const { register, handleSubmit, formState: { errors } } = useForm<SurvaySumbitType>({ resolver: zodResolver(schema) })
    return { submit, handleChange, handleClose, show, setShow, router, trans, errors, register,handleSubmit }
}