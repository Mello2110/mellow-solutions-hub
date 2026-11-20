import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createSessionToken,
  getSessionCookieOptions,
  isAdminAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const LoginSchema = z.object({
  username: z.string().optional().default(""),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin authentication is not configured (missing ADMIN_PASSWORD)." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  if (!verifyAdminCredentials(parsed.data.username, parsed.data.password)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set({
    ...getSessionCookieOptions(),
    value: token,
  });

  return response;
}
