"use client";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/organizations",
    label: "机构管理",
  },
  {
    key: "/lawyers",
    label: "律师管理",
  },
];

function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Menu
      selectedKeys={[pathname]}
      className="min-h-screen"
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={items}
      mode="inline"
      theme="dark"
    />
  );
}

export { SideBar };
