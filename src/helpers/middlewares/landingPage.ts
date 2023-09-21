import { NextRequest, NextResponse } from "next/server";
import { validateLandingRegister } from "@/app/v1/landing/validations";

export async function landingPage(request: NextRequest) {
  const body = await request.json();

  try {
    validateLandingRegister(body);
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}