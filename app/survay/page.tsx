// import { titleLogo } from "@/lib/translate";

import ChooseLanguage from "@/ui/ChooseLanguage";

export const metadata = {
    title: 'Survay'
};
export default function Page() {
    return (
        <>
            <div className="my-10">
                <span className=" text-xl md:text-2xl font-sans font-bold  text-primary mt-2">ជ្រើសរើសភាសារបស់អ្នក។</span><br />
                <span className=" text-2xl md:text-3xl font-sans font-bold  text-primary mt-2">Choose your language</span>
            </div>
            <ChooseLanguage />
            <div className="text-2xl md:text-3xl font-sans font-bold  text-primary mt-10">
                Customer's Satisfaction Survey
            </div>
        </>
    )
}