import { getEnvVariable, getErrorResponse } from "@/helpers/utils";
import { prisma } from "@/db/prisma/connection";
import { signToken } from "@/helpers/token";
import { LoginUserInput, LoginUserSchema } from "@/helpers/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRATION = getEnvVariable("JWT_EXPIRATION");

    const token = await signToken(
      { sub: user.id },
      { exp: `${JWT_EXPIRATION}m` }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRATION) * 60;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}