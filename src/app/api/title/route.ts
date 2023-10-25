import { NextResponse, NextRequest } from 'next/server';

export async function POST (request: NextRequest) {
    const body = await request.json();
    const res = await fetch(body.url)
    const html = await res.text()
   
    return NextResponse.json({ message: html }, { status: 200 });
}