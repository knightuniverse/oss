import { isAuthenticated } from "@/lib/server-actions/authentication";
import { redirect } from "next/navigation";

async function guard() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/sign-in");
  }

  redirect("/organizations");
}

export default async function Home() {
  await guard();
}
