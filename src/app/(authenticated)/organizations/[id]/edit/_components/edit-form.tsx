"use client";

import { update } from "@/lib/server-actions/organizations";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";

export function EditForm(props: {
  id: number;
  initialValues: {
    desc: string;
    name: string;
  };
}) {
  const { initialValues = {} } = props;

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: { desc: string; name: string }) {
    try {
      setSubmitting(true);
      await update(props.id, values);
      message.success('更新已保存');
      // TODO
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
      initialValues={initialValues}
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
