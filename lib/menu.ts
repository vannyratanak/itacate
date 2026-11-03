import { backendURL } from "@/lib/shop";

export type MenuItem = {
    id: number;
    name_en: string;
    name_kh: string | null;
    description_en: string | null;
    description_kh: string | null;
    category: string;
    category_kh: string | null;
    price: string;
    image_url: string | null;
};

export async function fetchMenu(): Promise<MenuItem[]> {
    const res = await fetch(`${backendURL}/menu`, { cache: "no-store", signal: AbortSignal.timeout(8000) } as RequestInit);
    if (!res.ok) throw new Error(`Menu request failed: ${res.status}`);
    return res.json();
}
