"use server";

import { ossApi } from "@/lib/oss-api";
import { isNumber } from "lodash-es";
import { type PaginationData } from "./types";

interface IDocumentDownloadDto {
  documentId: number;
  id: number;
  phoneId: number;
}

async function findMany(
  params: Partial<{
    documentId: number;
    page: number;
    pageSize: number;
  }> = {}
) {
  const { documentId, page = 1, pageSize = 20 } = params;
  const { data } = await ossApi.get<{
    code: number;
    data: PaginationData<
      IDocumentDownloadDto & {
        doc: {
          createdAt: string;
          downloadCount: number;
          href: string;
          id: number;
          organizationId: number;
          removedAt: string;
          thumbnail: string;
          title: string;
          updatedAt: string;
        };
      } & {
        phone: {
          countryCode: string;
          createdAt: string;
          id: number;
          phoneNumber: string;
          purePhoneNumber: string;
          updatedAt: string;
        };
      } & {
        createdAt: string;
        updatedAt: string;
      }
    >;
    desc: string;
  }>(
    "/oss/document-downloads",
    isNumber(documentId) && documentId > 0
      ? {
          documentId,
          page,
          pageSize,
        }
      : {
          page,
          pageSize,
        }
  );
  console.log("findMany", JSON.stringify(data.data.result[0]));

  return data.data;
}

export { findMany };
