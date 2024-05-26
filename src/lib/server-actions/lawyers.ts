"use server";

import { ossApi } from "@/lib/oss-api";
import { type PaginationData } from "./types";

interface ILawyerDto {
  bio: string;
  id: number;
  name: string;
  seniority: number;
}

async function create(dto: {
  bio: string;
  name: string;
  organizationId: number;
  seniority: number;
}) {
  const { data } = await ossApi.post<{
    code: number;
    data: ILawyerDto;
    desc: string;
  }>(`/oss/lawyers/`, dto);
  console.log("create", data.data);
  return data.data;
}

async function findOne(id: number) {
  const { data } = await ossApi.get<{
    code: number;
    data: ILawyerDto;
    desc: string;
  }>(`/oss/lawyers/${id}`, {});
  return data.data;
}

async function findMany(
  params: Partial<{ page: number; pageSize: number }> = {}
) {
  const { page = 1, pageSize = 20 } = params;
  const { data } = await ossApi.get<{
    code: number;
    data: PaginationData<
      ILawyerDto & {
        createdAt: string;
        updatedAt: string;
      }
    >;
    desc: string;
  }>("/oss/lawyers", {
    page,
    pageSize,
  });
  return data.data;
}

async function update(id: number, values: Partial<ILawyerDto>) {
  const { data } = await ossApi.patch<{
    code: number;
    data: any;
    desc: string;
  }>(
    `/oss/lawyers/${id}`,
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
