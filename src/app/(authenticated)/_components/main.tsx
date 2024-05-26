"use client";

import { signOut } from "@/lib/server-actions/authentication";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, type MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { SideBar } from "./sidebar";

function Main(props: { children: React.ReactNode }) {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "sign-out",
      label: "Sign Out",
    },
  ];

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout className="!min-h-screen">
      <Layout.Header className="flex flex-row justify-between items-center">
        <div>LOGO</div>
        <div>
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => {
                if (key === "sign-out") {
                  handleSignOut();
                }
              },
            }}
            placement="bottom"
          >
            <div className="cursor-pointer flex flex-row gap-1 justify-center items-center">
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="text-white">root</span>
            </div>
          </Dropdown>
        </div>
      </Layout.Header>

      <Layout>
        <Layout.Sider width={200}>
          <SideBar className="h-full"></SideBar>
        </Layout.Sider>

        <Layout className="p-6">{props.children}</Layout>
      </Layout>
    </Layout>
  );
}

export { Main };
