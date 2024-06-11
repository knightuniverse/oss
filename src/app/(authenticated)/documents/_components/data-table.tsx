"use client";

import { Button, Card, Space, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import queryString from "query-string";

function AntdTable({ data, searchParams }: any) {
  const router = useRouter();

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Link href={`/documents/${text}`}>{text}</Link>,
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
      render: (_: any, record: any) => {
        return (
          <Space>
            <Link href={`/document-downloads?documentId=${record.id}`}>
              下载记录
            </Link>
          </Space>
        );
      },
    },
  ];

  function onPaginationChange(page: number, pageSize: number) {
    router.push(
      `/documents?${queryString.stringify({
        page,
        pageSize,
      })}`
    );
  }

  function onCreate() {
    router.push("/documents/new");
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
