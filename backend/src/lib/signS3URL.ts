// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3 = new S3Client({ region: process.env.S3_REGION });

// const generateSignedVideoUrl = async (key: string) => {
//   const command = new GetObjectCommand({
//     Bucket: process.env.S3_BUCKET,
//     Key: key,
//     // ResponseContentType: "video/mp4", // 👈 force Content-Type
//   });

//   const signedUrl = await getSignedUrl(s3, command, {
//     expiresIn: 7200, // 2 hour
//   });
//   console.log("signedUrl", signedUrl);

//   return signedUrl;
// };

import {
  S3Client,
  GetObjectCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { HttpResponse } from "@smithy/protocol-http";

/**
 * Detects AWS clock offset by making a HEAD request to S3
 * and comparing with local system time.
 */
async function detectClockOffset(
  region: string,
  bucket: string
): Promise<number> {
  const tempClient = new S3Client({ region });

  let serverDateHeader: string | undefined;

  // Inject middleware to capture raw response headers
  tempClient.middlewareStack.add(
    (next) => async (args) => {
      const result = await next(args);
      const httpResponse = result.response as HttpResponse;
      serverDateHeader = httpResponse.headers["date"];
      return result;
    },
    { step: "deserialize", name: "captureDateHeader" }
  );

  try {
    await tempClient.send(new HeadBucketCommand({ Bucket: bucket }));

    if (!serverDateHeader) {
      console.warn("No Date header found in response");
      return 0;
    }

    const serverDate = new Date(serverDateHeader);
    const localDate = new Date();

    const offset = serverDate.getTime() - localDate.getTime();
    console.log("Detected clock offset (ms):", offset);

    return offset;
  } catch (err) {
    console.error("Failed to detect clock offset, defaulting to 0:", err);
    return 0;
  }
}

export async function createS3ClientWithOffset(region: string, bucket: string) {
  const offset = await detectClockOffset(region, bucket);

  return new S3Client({
    region,
    systemClockOffset: offset,
  });
}

/**
 * Example: Generate signed URL
 */
export async function generateSignedVideoUrl(key: string) {
  const s3 = await createS3ClientWithOffset(
    process.env.S3_REGION!,
    process.env.S3_BUCKET!
  );
  console.log(key);

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600, // 1 hour
  });

  console.log("Signed URL:", signedUrl);
  return signedUrl;
}

export default generateSignedVideoUrl;
