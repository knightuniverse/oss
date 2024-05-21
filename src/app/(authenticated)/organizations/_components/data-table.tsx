import { findMany } from "@/lib/services/organizations-service";
import { Table } from "antd";

async function DataTable(
  props: Partial<{
    searchParams: Record<string, any>;
  }>
) {
  const data = await findMany(props.searchParams);

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
  ];

  return (
    <div>
      <Table dataSource={data.result} columns={columns} />
    </div>
  );
}

export { DataTable };
