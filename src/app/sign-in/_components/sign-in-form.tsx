"use client";

import { signIn } from "@/lib/server-actions/authentication";
import { Button, Form, Input } from "antd";
import { useState } from "react";

export function SignInForm() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: { password: string; phone: string }) {
    try {
      setSubmitting(true);
      await signIn(values);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form layout="vertical" form={form} initialValues={{}} onFinish={onSubmit}>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button disabled={submitting} htmlType="submit" type="primary">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
}
