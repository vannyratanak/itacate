import { fetchMenu, MenuItem } from "@/lib/menu";
import { backendURL } from "@/lib/shop";

export type SitePage = { slug: string; title: string; html: string; css: string };

// null = no such published page (or the backend is unreachable): callers decide what to show.
export async function fetchPage(slug: string): Promise<SitePage | null> {
    try {
        const res = await fetch(`${backendURL}/pages/${encodeURIComponent(slug)}`, { cache: "no-store", signal: AbortSignal.timeout(5000) } as RequestInit);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

// Images uploaded in the editor are stored as /uploads/x.png (relative to the backend).
export const withBackendAssets = (s: string) => s.replace(/(["'(])\/uploads\//g, `$1${backendURL}/uploads/`);

// Live blocks from the page builder are saved as placeholder divs (data-itacate="menu" | "language");
// PageContent swaps each one, in place, for the real component.
// Only hits the backend for the menu when the page actually contains a Live menu block.
export async function menuFor(page: SitePage): Promise<MenuItem[]> {
    return /data-itacate="menu"/.test(page.html) ? fetchMenu().catch(() => []) : [];
}
