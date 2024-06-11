import mime from "mime";
import * as Minio from "minio";

const MINIO_CONFIG = {
  endPoint: process.env.MINIO_END_POINT || "minio.docker.internal",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "",
  secretKey: process.env.MINIO_SECRET_KEY || "",
};

const MINIO_BUCKET = process.env.MINIO_BUCKET || "";

const minioClient = new Minio.Client(MINIO_CONFIG);

async function upload(file: Blob) {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Destination object name
  const dest = `${Date.now()}.${mime.getExtension(file.type)}`;

  // Destination bucket
  const bucket = MINIO_BUCKET;

  // Check if the bucket exists
  // If it doesn't, create it
  const exists = await minioClient.bucketExists(bucket);
  if (exists) {
    console.log("Bucket " + bucket + " exists.");
  } else {
    await minioClient.makeBucket(bucket, "us-east-1");
    console.log("Bucket " + bucket + ' created in "us-east-1".');
  }

  // Upload the file with fPutObject
  // If an object with the same name exists,
  // it is updated with new data
  await minioClient.putObject(bucket, dest, buffer);

  return `/${bucket}/${dest}`;
}

export { upload };
