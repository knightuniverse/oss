"use client";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    label: "机构管理",
  },
];

function SideBar() {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
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
