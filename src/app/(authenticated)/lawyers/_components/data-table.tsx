"use client";

import {
  setFeatured,
  unsetFeatured
} from "@/lib/server-actions/lawyers";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Space, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

function ActionButton(props: {
  children: React.ReactNode;
  onClick: () => Promise<void>;
}) {
  const { children, onClick } = props;
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    await onClick();
    setBusy(false);
  }

  return (
    <Button disabled={busy} type="link" onClick={handleClick}>
      {children}
    </Button>
  );
}

function AntdTable({ data, searchParams }: any) {
  const router = useRouter();

  // TODO [ANTD 服务端渲染](https://ant-design.antgroup.com/docs/react/server-side-rendering-cn)
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Link href={`/lawyers/${text}`}>{text}</Link>,
    },
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "简介",
      dataIndex: "bio",
      key: "bio",
    },
    {
      title: "机构",
      dataIndex: ["organization", "name"],
      key: "organization",
    },
    {
      title: "是否推荐",
      dataIndex: "featured",
      key: "featured",
      render: (featured: number) =>
        featured === 1 ? <CheckOutlined style={{ color: "green" }} /> : null,
    },
    {
      title: "操作",
      key: "actions",
      render: (_: any, record: any) => (
        <Space split={<Divider type="vertical" />}>
          {record.featured === 1 ? (
            <ActionButton
              onClick={async () => {
                unsetFeatured(record.id);
                router.refresh();
              }}
            >
              取消推荐
            </ActionButton>
          ) : (
            <ActionButton
              onClick={async () => {
                setFeatured(record.id);
                router.refresh();
              }}
            >
              设为推荐
            </ActionButton>
          )}
        </Space>
      ),
    },
  ];

  function onPaginationChange(page: number, pageSize: number) {
    router.push(
      `/lawyers?${queryString.stringify({
        page,
        pageSize,
      })}`
    );
  }

  function onCreate() {
    router.push("/lawyers/new");
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full">
      <div className="w-full">
        <Button type="primary" onClick={onCreate}>
          添加
        </Button>
      </div>

      <Card className="w-full">
        <Table
          columns={columns}
          dataSource={data.result}
          pagination={{
            current: data.page,
            pageSize: searchParams?.pageSize || 20,
            total: data.count,
            onChange: onPaginationChange,
          }}
        />
      </Card>
    </div>
  );
}

export { AntdTable };
