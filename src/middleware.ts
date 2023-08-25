import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateLandingRegister } from './app/v1/landing/validations'

export async function middleware(request: NextRequest) {
  const body = await request.json();

  try {
    validateLandingRegister(body);
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

export const config = {
  matcher: '/v1/landing/register',
}