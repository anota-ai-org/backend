import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch('https://anotai-api.fly.dev/getRows');
  const data = await res.json();

  return NextResponse.json({ ...data });
}