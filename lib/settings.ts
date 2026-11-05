import { apiGet } from "@/lib/api";

export type DayHours = { day: number; open: string; close: string; closed: boolean }; // day 0 = Monday
export type Settings = {
    phone: string | null; email: string | null;
    address_en: string | null; address_kh: string | null;
    map_url: string | null; map_embed: string | null;
    facebook: string | null; instagram: string | null; telegram: string | null; tiktok: string | null;
    hours: DayHours[]; notice: string | null;
};

export const DEFAULT_SETTINGS: Settings = {
    phone: "+855 12 345 678", email: "hello@itacate.example",
    address_en: "123 Sample Street, Phnom Penh, Cambodia", address_kh: "ផ្លូវគំរូ ១២៣ ភ្នំពេញ កម្ពុជា",
    map_url: "https://maps.google.com/?q=Phnom+Penh", map_embed: null,
    facebook: "https://facebook.com", instagram: "https://instagram.com", telegram: null, tiktok: null,
    hours: Array.from({ length: 7 }, (_, day) => ({ day, open: "10:00", close: day >= 4 ? "23:00" : "22:00", closed: false })),
    notice: null,
};

// GET /settings is public. Missing/failed -> placeholder defaults, so pages always render.
export async function fetchSettings(): Promise<Settings> {
    const s = await apiGet<Partial<Settings> | null>("/settings", null);
    return { ...DEFAULT_SETTINGS, ...(s ?? {}), hours: Array.isArray(s?.hours) && s!.hours!.length ? s!.hours! : DEFAULT_SETTINGS.hours };
}

export const DAY_NAMES = {
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    kh: ["ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍", "ថ្ងៃអាទិត្យ"],
};
