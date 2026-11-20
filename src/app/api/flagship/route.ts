import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifyAdminSession } from "@/lib/admin-auth";
import { getFlagshipIds, setProjectFlagship } from "@/lib/flagship-store";

const ToggleFlagshipSchema = z.object({
  projectId: z.string().min(1),
  featured: z.boolean(),
});

export async function GET() {
  const flagshipIds = await getFlagshipIds();
  return NextResponse.json(
    { flagshipIds },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = ToggleFlagshipSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Expected { projectId: string, featured: boolean }." },
      { status: 400 }
    );
  }

  try {
    const flagshipIds = await setProjectFlagship(
      parsed.data.projectId,
      parsed.data.featured
    );
    revalidatePath("/");
    return NextResponse.json({ flagshipIds });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update flagship list.";
    const status = message.startsWith("Unknown project ID") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
