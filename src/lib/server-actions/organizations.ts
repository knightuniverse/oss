"use server";

import { ossApi } from "@/lib/oss-api";
import { type PaginationData } from "./types";

async function create(dto: { desc: string; name: string }) {
  const { data } = await ossApi.post<{
    code: number;
    data: {
      bio: string;
      id: number;
      name: string;
    };
    desc: string;
  }>(`/oss/organizations/`, dto);
  console.log("create", data.data);
  return data.data;
}

async function findOne(id: number) {
  const { data } = await ossApi.get<{
    code: number;
    data: {
      desc: string;
      id: number;
      name: string;
    };
    desc: string;
  }>(`/oss/organizations/${id}`, {});
  return data.data;
}

async function findMany(
  params: Partial<{ page: number; pageSize: number }> = {}
) {
  const { page = 1, pageSize = 20 } = params;
  const { data } = await ossApi.get<{
    code: number;
    data: PaginationData<{
      createdAt: string;
      desc: string;
      id: number;
      name: string;
      updatedAt: string;
    }>;
    desc: string;
  }>("/oss/organizations", {
    page,
    pageSize,
  });
  return data.data;
}

async function update(
  id: number,
  values: Partial<{
    desc: string;
    name: string;
  }>
) {
  const { data } = await ossApi.patch<{
    code: number;
    data: any;
    desc: string;
  }>(
    `/oss/organizations/${id}`,
    Object.entries(values)
      .filter(([key, value]) => value !== null && value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Record<string, any>)
  );
  return data.data;
}

export { create, findMany, findOne, update };
