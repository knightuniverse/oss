"use client";

import { create } from "@/lib/server-actions/lawyers";
import { type IOrganizationDto } from "@/lib/server-actions/organizations";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditForm(props: { organizations: Array<IOrganizationDto> }) {
  const { organizations = [] } = props;

  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: {
    bio: string;
    name: string;
    organizationId: number;
    seniority: number;
  }) {
    try {
      setSubmitting(true);
      await create(values);
      message.success("更新已保存");
      router.push("/lawyers");
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
        bio: "",
        name: "",
        seniority: 1,
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="机构"
        name="organizationId"
        rules={[{ required: true }]}
      >
        <Select
          options={organizations.map((i) => ({ label: i.name, value: i.id }))}
          placeholder="机构"
        />
      </Form.Item>

      <Form.Item label="名字" name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item label="工作经验" name="seniority" rules={[{ required: true }]}>
        <InputNumber placeholder="工作经验" />
      </Form.Item>

      <Form.Item label="简介" name="bio" rules={[{ required: true }]}>
        <Input.TextArea placeholder="简介" />
      </Form.Item>

      <Form.Item>
        <Button disabled={submitting} htmlType="submit" type="primary">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
