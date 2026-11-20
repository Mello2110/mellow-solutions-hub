import React from "react";
import { HomeClient } from "@/components/HomeClient";
import { getFlagshipIds } from "@/lib/flagship-store";
import { verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [flagshipIds, isAdmin] = await Promise.all([
    getFlagshipIds(),
    verifyAdminSession(),
  ]);

  return (
    <HomeClient
      initialFlagshipIds={flagshipIds}
      initialIsAdmin={isAdmin}
    />
  );
}
