import { isAuthenticated } from "@/lib/server-actions/authentication";
import { redirect } from "next/navigation";
import { SignInForm } from "./_components/sign-in-form";

async function guard() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return;
  }

  redirect("/organizations");
}

async function SignInPage() {
  await guard();

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <div className="container rounded-[0.5rem] border bg-background shadow lg:px-0">
        <div className="flex-col items-center justify-center h-[800px] w-full md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"></div>

          <div className="lg:p-8">
            <SignInForm></SignInForm>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
