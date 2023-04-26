import { NextResponse } from "next/server";
const backendURL=process.env.NEXT_PUBLIC_BACKEND_URL;
export async function GET(request:Request){
    const res = await fetch(backendURL+"/surveys/field",{
        headers:{
            'Content-Type': 'application/json',
        }
    });
    const fields = await res.json();
    return NextResponse.json({fields})
}