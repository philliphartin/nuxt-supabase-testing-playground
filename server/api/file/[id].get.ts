const config = useRuntimeConfig()

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const REGION = 'us-west-1'
const BUCKET_NAME = 'airlume-staging'

async function getSignedS3Url(path: string) {
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: config.private.awsAccessKeyId,
      secretAccessKey: config.private.awsSecretAccessKey
    }
  })

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: path
  })

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600 // The URL will be valid for 1 hour
    })
    return signedUrl
  } catch (error) {
    throw error
  }
}

export default defineEventHandler(async (event) => {
  // Get the id from the body
  const id = getRouterParam(event, 'id') as string
  return sendRedirect(event, await getSignedS3Url(id))
})
