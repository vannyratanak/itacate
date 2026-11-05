"use client";
import Link from "next/link";
import { useEffect } from "react";
import { L } from "@/ui/site/L";

// Last-resort page for unexpected errors. Kept free of data fetching so it can never fail the same way.
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => { console.error(error); }, [error]);
    return (
        <main className="grid min-h-screen place-items-center bg-[#F3EABF] px-5 py-16 text-center">
            <div className="max-w-md">
                <p className="text-6xl font-extrabold text-[#E5902C]" aria-hidden="true">!</p>
                <h1 className="mt-3 text-2xl font-bold text-[#4A3412] md:text-3xl"><L en="Something went wrong in the kitchen" kh="មានបញ្ហាមួយកើតឡើងក្នុងផ្ទះបាយ" /></h1>
                <p className="mt-3 text-[#8A4F0E]"><L en="Please try again. If it keeps happening, call us and we will look after you." kh="សូមព្យាយាមម្តងទៀត។ ប្រសិនបើនៅតែកើតឡើង សូមទូរស័ព្ទមកយើង ហើយយើងនឹងជួយអ្នក។" /></p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={reset} className="rounded-full bg-[#E5902C] px-6 py-3 font-semibold text-[#FFFBEA] shadow-md hover:bg-[#d4801f] focus:outline-none focus:ring-2 focus:ring-[#E5902C] focus:ring-offset-2"><L en="Try again" kh="ព្យាយាមម្តងទៀត" /></button>
                    <Link href="/" className="rounded-full border-2 border-[#E5902C] px-6 py-3 font-semibold text-[#8A4F0E] hover:bg-[#E5902C]/10"><L en="Back to home" kh="ត្រឡប់ទៅទំព័រដើម" /></Link>
                </div>
            </div>
        </main>
    );
}
