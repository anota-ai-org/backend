import { getEnvVariable } from "./utils";
import { SignJWT, jwtVerify } from "jose";

export async function signToken(
  payload: { sub: string },
  options: { exp: string }
) {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export async function verifyToken<T>(token: string): Promise<T> {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
    ).payload as T;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid or expired");
  }
};