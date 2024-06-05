import mime from "mime";
import * as Minio from "minio";

const MINIO_CONFIG = {
  endPoint: "minio.docker.internal",
  port: 9000,
  useSSL: false,
  accessKey: "23FUFBjg0IuXbcHBjHdP",
  secretKey: "s6oA1uyMNlWpDkouOcg2yQo2IZeiF3sXHG38wgla",
};

const minioClient = new Minio.Client(MINIO_CONFIG);

async function upload(file: Blob) {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Destination object name
  const dest = `${Date.now()}.${mime.getExtension(file.type)}`;

  // Destination bucket
  const bucket = "docs";

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
