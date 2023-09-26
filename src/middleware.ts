import { NextRequest } from 'next/server'
import { landingPage } from './helpers/middlewares/landingPage';
import { userAuth } from './helpers/middlewares/userAuth';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/v1/landing/register')) {
    return landingPage(req);
  }

  return userAuth(req)
}

export const config = {
  matcher: [
    "/profile",
    "/login",
    "/api/users/:path*",
    "/api/auth/logout",
    "/v1/landing/register",
  ],
};