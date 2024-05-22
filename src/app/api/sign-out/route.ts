import { QFYApiResponse } from "@/lib/qfy-api-response";
import { signOut } from "@/lib/server-actions/authentication";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  await signOut();

  return NextResponse.json(QFYApiResponse.ok);
}
