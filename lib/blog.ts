import { apiGet } from "@/lib/api";
import { assetUrl } from "@/lib/shop";

export type PostSummary = {
    id: number; slug: string;
    title_en: string; title_kh: string | null;
    excerpt_en: string | null; excerpt_kh: string | null;
    cover_url: string | null; published_at: string | null;
};
export type Post = PostSummary & { html_en: string; html_kh: string | null };
export type PostPage = { items: PostSummary[]; total: number; page: number; limit: number; pages: number };

export const EMPTY_PAGE: PostPage = { items: [], total: 0, page: 1, limit: 9, pages: 0 };

export const fetchPosts = (page = 1, limit = 9) => apiGet<PostPage>(`/blog?page=${page}&limit=${limit}`, EMPTY_PAGE);
export const fetchPost = (slug: string) => apiGet<Post | null>(`/blog/${encodeURIComponent(slug)}`, null);

// Covers are generated/uploaded files: "/uploads/..." goes to the backend (dev) or "/api/uploads" (production).
export const cover = (url: string | null) => assetUrl(url);
