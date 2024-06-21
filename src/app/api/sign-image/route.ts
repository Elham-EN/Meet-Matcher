/**
 * When using the Cloudinary SDKs for any upload or admin method that
 * requires a signature, the signature is automatically generated and
 * added to the request.
 */

import { cloudinary } from "@/libs/cloudinary";

// Create API Endpoint that accept HTTP POST request from the
// cloudinary button and send response with a signed token
export async function POST(request: Request) {
  // Extract body of the request (All happeing from cloudinary btn)
  const body = (await request.json()) as { paramsToSign: Record<string, string> };
  const { paramsToSign } = body;
  const signature = cloudinary.v2.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );
  return Response.json({ signature });
}
