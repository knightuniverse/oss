"use client";

import { Button, Card, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import queryString from "query-string";

function AntdTable({ data, searchParams }: any) {
  const router = useRouter();

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
