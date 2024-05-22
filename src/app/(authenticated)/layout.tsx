import { isAuthenticated } from "@/lib/server-actions/authentication";
import { redirect } from "next/navigation";
import { Main } from "./_components/main";

async function guard() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/sign-in");
  }
}

/**
 * Auth Guard
 * @param props
 * @returns
 */
async function QFYLayout(props: { children: React.ReactNode }) {
  await guard();
  return <Main>{props.children}</Main>;
}

export default QFYLayout;
