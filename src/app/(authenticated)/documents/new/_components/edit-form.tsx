"use client";

import { create } from "@/lib/server-actions/documents";
import { type IOrganizationDto } from "@/lib/server-actions/organizations";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Form, Input, Select, Upload, message } from "antd";
import mime from "mime";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditForm(props: { organizations: Array<IOrganizationDto> }) {
  const { organizations = [] } = props;

  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(values: {
    organizationId: string;
    href: string;
    thumbnail: string;
    title: string;
  }) {
    try {
      setSubmitting(true);

      console.log("values", values);

      await create(values);
      message.success("更新已保存");
      router.push("/documents");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  const hrefProps: UploadProps = {
    accept: [mime.getType("doc"), mime.getType("docx")].join(","),
    name: "file",
    action: "/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        const response = info.file.response;
        const { data } = response;
        form.setFieldValue("href", data.url);

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const thumbnailProps: UploadProps = {
    accept: 'image/*',
    name: "file",
    action: "/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        const response = info.file.response;
        const { data } = response;
        form.setFieldValue("thumbnail", data.url);

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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

      <Form.Item label="名字" name="title" rules={[{ required: true }]}>
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item label="文档" name="href" rules={[{ required: true }]}>
        <Upload {...hrefProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="缩略图" name="thumbnail" rules={[{ required: true }]}>
        <Upload {...thumbnailProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button disabled={submitting} htmlType="submit" type="primary">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}
