export type Shop = { name: string; title: string; logo_url: string | null };

export const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FALLBACK: Shop = { name: "Itacate", title: "Best Spanish Restaurant", logo_url: null };

// The backend serves uploads as relative paths (/uploads/x.png); anything else (the offline
// fallback logo) is a file in this app's own /public.
export const assetUrl = (u?: string | null) => (u ? (u.startsWith("/uploads/") ? `${backendURL}${u}` : u) : null);

export const DEFAULT_LOGO = "/king.png";
// Logo set in the backend, else the built-in default.
export const logoSrc = (shop: Shop) => assetUrl(shop.logo_url) ?? DEFAULT_LOGO;

// Never let a backend outage take the public pages down: fall back to the built-in identity.
export async function fetchShop(): Promise<Shop> {
    try {
        const res = await fetch(`${backendURL}/shop`, { cache: "no-store", signal: AbortSignal.timeout(4000) } as RequestInit);
        if (!res.ok) return FALLBACK;
        return await res.json();
    } catch {
        return FALLBACK;
    }
}
