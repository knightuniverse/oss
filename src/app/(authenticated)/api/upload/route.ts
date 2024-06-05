import { upload } from "@/lib/minio";
import { QFYApiResponse } from "@/lib/qfy-api-response";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const fd = await request.formData();
  const file = fd.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json(
      QFYApiResponse.create({
        code: 400,
        data: {},
        desc: "file is required",
      }),
      { status: 400 }
    );
  }

  try {
    const url = await upload(file);
    return NextResponse.json(
      QFYApiResponse.create({
        code: 200,
        data: {
          url,
        },
        desc: "",
      })
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      QFYApiResponse.create({
        code: 500,
        data: {},
        desc: "something is wrong",
      }),
      { status: 500 }
    );
  }
}
