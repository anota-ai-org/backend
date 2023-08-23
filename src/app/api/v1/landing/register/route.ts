import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await fetch('https://anotai-api.fly.dev/addRow', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(error, { status: res.status });
    }
    
    const message = await res.text();
    return NextResponse.json(message, { status: res.status });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
