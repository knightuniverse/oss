"use client";

import { Button, Card, Space, Table, type ColumnsType } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import queryString from "query-string";

function AntdTable({ data, searchParams }: any) {
  const router = useRouter();

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <Link href={`/organizations/${text}`}>{text}</Link>
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "href",
      dataIndex: "href",
      key: "href",
    },
    {
      title: "下载记录",
      key: "actions",
      render: (_, record, index) => {
        return (
          <Space>
            <Button type="link">下载记录</Button>
          </Space>
        );
      },
    },
  ];

  function onPaginationChange(page: number, pageSize: number) {
    router.push(
      `/organizations?${queryString.stringify({
        page,
        pageSize,
      })}`
    );
  }

  function onCreate() {
    router.push("/organizations/new");
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
