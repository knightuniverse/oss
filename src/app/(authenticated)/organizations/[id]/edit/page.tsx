import { QFYSpinner } from "@/components/ui/qfy-spinner";
import { findOne } from "@/lib/server-actions/organizations";
import { Card } from "antd";
import { Suspense } from "react";
import { EditForm } from "./_components/edit-form";

async function FormCard(props: { id: number }) {
  const org = await findOne(props.id);

  return (
    <Card className="w-full">
      <EditForm id={props.id} initialValues={org}></EditForm>
    </Card>
  );
}

function EditPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<QFYSpinner></QFYSpinner>}>
      <FormCard id={parseInt(params.id, 10)} />
    </Suspense>
  );
}

export default EditPage;
