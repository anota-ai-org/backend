import { NextRequest, NextResponse } from "next/server";

// TODO: create endpoint that gets username from url and returns user data
export async function GET(req: NextRequest) {
  const response = new NextResponse(JSON.stringify({ status: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  return response;
}