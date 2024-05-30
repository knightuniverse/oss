"use client";

import { Card, Table, type ColumnsType } from "antd";
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
      title: "文档",
      dataIndex: ["doc", "title"],
      render: (title: string, r: any) => (
        <Link href={`/documents/${r.doc.id}`}>{title}</Link>
      ),
    },
    {
      title: "手机",
      dataIndex: ["phone", "purePhoneNumber"],
    },
  ];

  function onPaginationChange(page: number, pageSize: number) {
    router.push(
      `/document-downloads?${queryString.stringify(
        searchParams.documentId
          ? {
              documentId: searchParams.documentId,
              page,
              pageSize,
            }
          : {
              page,
              pageSize,
            }
      )}`
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full">
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
