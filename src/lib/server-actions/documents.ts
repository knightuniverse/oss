"use server";

import { ossApi } from "@/lib/oss-api";
import { type PaginationData } from "./types";

interface IDocumentDto {
  href: string;
  id: number;
  organizationId: number;
  title: string;
}

async function create(dto: {
  organizationId: string;
  href: string;
  thumbnail: string;
  title: string;
}) {
  const { data } = await ossApi.post<{
    code: number;
    data: IDocumentDto;
    desc: string;
  }>(`/oss/documents/`, dto);
  console.log("create", data.data);
  return data.data;
}

async function findOne(id: number) {
  const { data } = await ossApi.get<{
    code: number;
    data: IDocumentDto;
    desc: string;
  }>(`/oss/documents/${id}`, {});
  return data.data;
}

async function findMany(
  params: Partial<{
    organizationId: number;
    page: number;
    pageSize: number;
  }> = {}
) {
  const { page = 1, pageSize = 20, ...where } = params;
  const { data } = await ossApi.get<{
    code: number;
    data: PaginationData<
      IDocumentDto & {
        createdAt: string;
        updatedAt: string;
      }
    >;
    desc: string;
  }>("/oss/documents", {
    page,
    pageSize,
    where,
  });
  console.log(data.data);
  return data.data;
}

// TODO
async function update(id: number, values: Partial<IDocumentDto>) {
  const { data } = await ossApi.patch<{
    code: number;
    data: any;
    desc: string;
  }>(
    `/oss/documents/${id}`,
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
export type { IDocumentDto };

