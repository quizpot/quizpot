import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "any",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "any",
  },
  forcePathStyle: true,
});