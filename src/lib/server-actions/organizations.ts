"use server";

import { ossApi } from "@/lib/oss-api";

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
    data: {
      count: number;
      exceedCount: boolean;
      exceedTotalPages: boolean;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
      page: number;
      result: Array<{
        createdAt: string;
        id: number;
        name: string;
        updatedAt: string;
      }>;
      totalPages: number;
    };
    desc: string;
  }>("/oss/organizations", {
    page,
    pageSize,
  });
  return data.data;
}

export { findMany, findOne };
