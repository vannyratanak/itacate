import { useState } from "react";
import { useTranslate } from "./useTranslate";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { ResponseSurvey } from "@/lib/survey";

// +855 / 855 / 0 prefix followed by 8-9 digits; spaces, dots and dashes are ignored
const phoneTest = /^(\+?855|0)\d{8,9}$/;
export const normalizePhone = (value: string) => value.replace(/[\s.\-()]/g, "");

export const answerKey = (menuId: number) => `q${menuId}`;

export type SurveyFormValues = {
    username: string,
    phone: string,
    date: string,
    visit: string | null,
    description?: string,
    answers: Record<string, string | null | undefined>,
}

export function useFormSurvey(fields: ResponseSurvey) {
    const trans = useTranslate();
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const e = trans.menu.error;

    const menuIds = fields.flatMap(group => group.menuOption.map(menu => menu.id));

    const schema = zod.object({
        username: zod.string({ required_error: e.username }).trim().min(1, e.username),
        phone: zod.string({ required_error: e.phone_required }).trim().min(1, e.phone_required)
            .refine(value => phoneTest.test(normalizePhone(value)), { message: e.phone_format }),
        date: zod.string().min(1),
        visit: zod.string({ invalid_type_error: e.choose }).nullable().refine(value => value != null, { message: e.choose }),
        description: zod.string().optional(),
        answers: zod.object(Object.fromEntries(
            menuIds.map(id => [answerKey(id), zod.string({ invalid_type_error: e.another_choice, required_error: e.another_choice }).min(1, e.another_choice)])
        )),
    });

    const form = useForm<SurveyFormValues>({
        resolver: zodResolver(schema),
        defaultValues: { date: new Date().toISOString(), visit: null, answers: {} },
    });

    const submit = form.handleSubmit(async values => {
        setSubmitError(null);
        const payload = {
            name: values.username.trim(),
            phoneNumber: normalizePhone(values.phone),
            dateVisit: values.date,
            usedToVisit: values.visit === "true",
            message: values.description?.trim() || undefined,
            answers: menuIds.map(id => ({ menu_id: id, option_id: Number(values.answers[answerKey(id)]) })),
        };
        try {
            const res = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(String(res.status));
            router.push("/survey-success");
        } catch {
            setSubmitError(e.submit_failed);
        }
    });

    return {
        trans, router, submit, submitError,
        register: form.register,
        errors: form.formState.errors,
        isSubmitting: form.formState.isSubmitting,
        setDate: (date: Date) => form.setValue("date", date.toISOString()),
    };
}
