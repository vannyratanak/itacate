import { NextResponse } from "next/server";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }
    try {
        const res = await fetch(`${backendURL}/surveys`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch {
        return NextResponse.json({ message: "Survey service unavailable" }, { status: 502 });
    }
}
