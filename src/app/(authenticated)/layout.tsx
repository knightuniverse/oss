import { isAuthenticated } from "@/lib/server-actions/authentication";
import { Breadcrumb } from "antd";
import { redirect } from "next/navigation";
import { SideBar } from "./_components/sidebar";

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
async function Layout(props: { children: React.ReactNode }) {
  await guard();

  return (
    <main className="flex flex-row justify-start items-start min-h-screen">
      <SideBar></SideBar>
      <div className="flex flex-col grow justify-start items-start min-h-screen">
        <div className="p-6 w-full">
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: <a href="">Application Center</a>,
              },
              {
                title: <a href="">Application List</a>,
              },
              {
                title: "An Application",
              },
            ]}
          />
        </div>

        <div className="bg-neutral-100 grow p-6 w-full">{props.children}</div>
      </div>
    </main>
  );
}

export default Layout;
