import { assetBase, backendURL } from "@/lib/shop";

// SERVER components: read from the backend. Never throws: returns `fallback` if the backend is down or answers an error.
export async function apiGet<T>(path: string, fallback: T): Promise<T> {
    try {
        const res = await fetch(`${backendURL}${path}`, { cache: "no-store", signal: AbortSignal.timeout(4000) } as RequestInit);
        if (!res.ok) return fallback;
        return (await res.json()) as T;
    } catch {
        return fallback;
    }
}

// BROWSER code (forms): same-origin "/api" in production (nginx -> backend), the backend URL in local dev.
export const publicApi = assetBase ?? backendURL ?? "";

export type SendResult<T = any> = { ok: boolean; status: number; data: T };
export async function apiSend<T = any>(path: string, method: "POST" | "PATCH" | "DELETE", body?: unknown): Promise<SendResult<T>> {
    try {
        const res = await fetch(`${publicApi}${path}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, status: res.status, data };
    } catch {
        return { ok: false, status: 0, data: {} as T };
    }
}
// Nest returns { message: string | string[] } on errors.
export const errorText = (r: SendResult, fallback: string) => [].concat((r.data as any)?.message ?? fallback).join(", ");
