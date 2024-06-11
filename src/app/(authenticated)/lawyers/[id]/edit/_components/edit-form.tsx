"use client";

import { update } from "@/lib/server-actions/lawyers";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";

export function EditForm(props: {
  id: number;
  initialValues: {
    bio: string;
    name: string;
    seniority: number;
  };
}) {
  const { initialValues = {} } = props;

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: {
    bio: string;
    name: string;
    seniority: number;
  }) {
    try {
      setSubmitting(true);
      await update(props.id, values);
      message.success("更新已保存");
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
      <Form.Item label="名字" name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item label="工作经验" name="seniority" rules={[{ required: true }]}>
        <InputNumber placeholder="工作经验" />
      </Form.Item>

      <Form.Item label="简介" name="bio" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Description" />
      </Form.Item>

      <Form.Item>
        <Button disabled={submitting} htmlType="submit" type="primary">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
