import { QFYSpinner } from "@/components/ui/qfy-spinner";
import { findOne } from "@/lib/server-actions/lawyers";
import { Card, Descriptions, type DescriptionsProps } from "antd";
import { Suspense } from "react";
import { EditButton } from "./_components/edit-button";

async function OrganizationCard(props: { id: number }) {
  const lawyer = await findOne(props.id);

  console.log(lawyer);

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
      dataIndex: "bio",
      label: "Bio",
    },
  ].map((i) => ({
    key: i.dataIndex,
    label: i.label,
    children: (
      <p>
        {
          //@ts-ignore
          lawyer[i.dataIndex]
        }
      </p>
    ),
  }));

  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full">
      <div className="w-full">
        <EditButton id={props.id}></EditButton>
      </div>
      <Card className="w-full">
        <Descriptions items={items} layout="vertical" title="Lawyer" />
      </Card>
    </div>
  );
}

function OrganizationDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<QFYSpinner></QFYSpinner>}>
      <OrganizationCard id={parseInt(params.id, 10)} />
    </Suspense>
  );
}

export default OrganizationDetailPage;
