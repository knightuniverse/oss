"use client";

import { create } from "@/lib/server-actions/organizations";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditForm() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: { desc: string; name: string }) {
    try {
      setSubmitting(true);
      await create(values);
      message.success("新组织已保存");
      router.push("/organizations");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        desc: "",
        name: "",
      }}
      onFinish={onSubmit}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item label="Description" name="desc" rules={[{ required: true }]}>
        <Input placeholder="Description" />
      </Form.Item>

      <Form.Item>
        <Button disabled={submitting} htmlType="submit" type="primary">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
