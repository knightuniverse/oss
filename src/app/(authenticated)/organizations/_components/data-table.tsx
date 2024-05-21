"use client";

import { Table } from "antd";
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
      title: "简介",
      dataIndex: "desc",
      key: "desc",
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
  );
}

export { AntdTable };
