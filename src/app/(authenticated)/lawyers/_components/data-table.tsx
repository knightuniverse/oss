"use client";

import { Button, Card, Table } from "antd";
import { useRouter } from "next/navigation";
import queryString from "query-string";

function AntdTable({ data, searchParams }: any) {
  const router = useRouter();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "自我介绍",
      dataIndex: "bio",
      key: "bio",
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

  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full">
      <div className="w-full">
        <Button type="primary">添加</Button>
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
