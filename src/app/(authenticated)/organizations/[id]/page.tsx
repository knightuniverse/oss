import { findOne } from "@/lib/server-actions/organizations";
import { LoadingOutlined } from "@ant-design/icons";
import { Card, Descriptions, Spin, type DescriptionsProps } from "antd";
import { Suspense } from "react";

async function OrganizationCard(props: { id: number }) {
  const org = await findOne(props.id);

  const items: DescriptionsProps["items"] = [
    {
      dataIndex: "id",
      label: "ID",
    },
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "desc",
      label: "Desc",
    },
  ].map((i) => ({
    key: i.dataIndex,
    label: i.label,
    children: <p>{org[i.dataIndex]}</p>,
  }));

  return (
    <Card className="w-full">
      <Descriptions items={items} layout="vertical" title="Organization" />
    </Card>
  );
}

function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}

function OrganizationDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Spinner></Spinner>}>
      <OrganizationCard id={parseInt(params.id, 10)} />
    </Suspense>
  );
}

export default OrganizationDetailPage;
