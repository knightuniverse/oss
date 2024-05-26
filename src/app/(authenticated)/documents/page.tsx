import { QFYSpinner } from "@/components/ui/qfy-spinner";
import { findMany } from "@/lib/server-actions/documents";
import md5 from "md5";
import { Suspense } from "react";
import { z } from "zod";
import { AntdTable } from "./_components/data-table";

function getSearchParams(data: Record<string, any>) {
  const SearchParams = z.object({
    page: z.optional(z.coerce.number()).default(1),
    pageSize: z.optional(z.coerce.number()).default(20),
  });
  const result = SearchParams.safeParse(data);
  return result.success
    ? result.data
    : {
        page: 1,
        pageSize: 20,
      };
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
        fallback={<QFYSpinner></QFYSpinner>}
      >
        <DataTable searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default OrganizationsPage;
