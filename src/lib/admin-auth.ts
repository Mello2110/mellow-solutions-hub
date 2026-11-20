import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "mellow_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getAdminUsername(): string | null {
  const user = process.env.ADMIN_USERNAME;
  return user && user.trim().length > 0 ? user.trim() : null;
}

function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.trim().length > 0 ? pw : null;
}

function getSigningSecret(): string {
  if (process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length >= 16) {
    return process.env.ADMIN_SECRET;
  }
  const pw = getAdminPassword() ?? "unconfigured-fallback";
  return crypto.createHash("sha256").update(`mellow-hub:${pw}`).digest("hex");
}

export function isAdminAuthConfigured(): boolean {
  return getAdminPassword() !== null;
}

function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Constant-time credentials comparison against ADMIN_USERNAME (if set) and ADMIN_PASSWORD.
 */
export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const expectedPassword = getAdminPassword();
  if (!expectedPassword || !password) return false;

  const expectedUsername = getAdminUsername();
  if (expectedUsername) {
    if (!username || !safeEqual(username.trim(), expectedUsername)) {
      return false;
    }
  }

  return safeEqual(password, expectedPassword);
}

interface SessionPayload {
  role: "admin";
  exp: number;
}

function signPayload(encodedPayload: string): string {
  return crypto
    .createHmac("sha256", getSigningSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createSessionToken(): string {
  const payload: SessionPayload = {
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
  const signature = signPayload(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !isAdminAuthConfigured()) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encoded, signature] = parts;
  if (!encoded || !signature) return false;

  const expectedSig = signPayload(encoded);
  const sigBuf = Buffer.from(signature, "utf-8");
  const expectedBuf = Buffer.from(expectedSig, "utf-8");

  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    ) as SessionPayload;
    return (
      parsed.role === "admin" &&
      typeof parsed.exp === "number" &&
      parsed.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function getSessionCookieOptions() {
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
