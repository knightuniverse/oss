import { findMany } from "@/lib/server-actions/lawyers";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import md5 from "md5";
import { Suspense } from "react";
import { z } from "zod";

import { AntdTable } from "./_components/data-table";

function getSearchParams(data: Record<string, any>) {
  const SearchParams = z.object({
    page: z.optional(z.coerce.number()).default(1),
    pageSize: z.optional(z.coerce.number()).default(10),
  });
  const result = SearchParams.safeParse(data);
  return result.success
    ? result.data
    : {
        page: 1,
        pageSize: 10,
      };
}

function Spinner() {
  return <div className="flex flex-col justify-center items-center h-full w-full"><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>;
}

async function DataTable(
  props: Partial<{
    searchParams: Record<string, any>;
  }>
) {
  const { searchParams } = props;
  const data = await findMany(searchParams);
  return <AntdTable data={data} searchParams={searchParams}></AntdTable>;
}

async function OrganizationsPage(props: { searchParams: Record<string, any> }) {
  const searchParams = getSearchParams(props.searchParams);

  return (
    <>
      <Suspense
        key={md5(JSON.stringify(searchParams))}
        fallback={<Spinner></Spinner>}
      >
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default OrganizationsPage;
