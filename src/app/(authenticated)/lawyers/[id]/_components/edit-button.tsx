"use client";

import { Button } from "antd";
import { useRouter } from 'next/navigation';

export function EditButton(props: { id: number }) {
  const router = useRouter();
  return (
    <Button
      type="primary"
      onClick={() => {
        router.push(`/lawyers/${props.id}/edit`);
      }}
    >
      编辑
    </Button>
  );
}
