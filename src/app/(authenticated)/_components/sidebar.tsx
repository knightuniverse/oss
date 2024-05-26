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
  {
    key: "/documents",
    label: "文档管理",
  },
];

function SideBar(props: Partial<{ className: string }>) {
  const pathname = usePathname();
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <Menu
      selectedKeys={[pathname]}
      onClick={onClick}
      defaultSelectedKeys={["/organizations"]}
      defaultOpenKeys={["/organizations"]}
      items={items}
      mode="inline"
      style={{ height: "100%", borderRight: 0 }}
      {...props}
    />
  );
}

export { SideBar };
