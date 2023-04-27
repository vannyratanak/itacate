import FormSurvay from "@/ui/FormSurvay";


export const metadata = {
    title: 'Survay User'
};
export default function Page() {
    return (
        <>
        <div className="max-h-screen container mx-auto mt-5 max-w-5xl">
            <FormSurvay/>

        </div>
        </>
        )
}