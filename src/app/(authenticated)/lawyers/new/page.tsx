import { QFYSpinner } from "@/components/ui/qfy-spinner";
import { findMany } from "@/lib/server-actions/organizations";
import { Card } from "antd";
import { Suspense } from "react";
import { EditForm } from "./_components/edit-form";

async function EditFormCard() {
  const organizations = await findMany({ pageSize: 9999 });

  return (
    <Card className="w-full">
      <EditForm organizations={organizations.result}></EditForm>
    </Card>
  );
}

function CreationPage() {
  return (
    <Suspense fallback={<QFYSpinner></QFYSpinner>}>
      <EditFormCard></EditFormCard>
    </Suspense>
  );
}

export default CreationPage;
