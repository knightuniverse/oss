import { QFYSpinner } from "@/components/ui/qfy-spinner";
import { Card } from "antd";
import { Suspense } from "react";
import { EditForm } from "./_components/edit-form";

function CreationPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<QFYSpinner></QFYSpinner>}>
      <Card className="w-full">
        <EditForm></EditForm>
      </Card>
    </Suspense>
  );
}

export default CreationPage;
