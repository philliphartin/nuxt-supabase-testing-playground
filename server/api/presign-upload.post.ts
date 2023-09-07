import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { id, type, filename } = await readBody(event)

  return {
    url: await createPresignedUrl(id, type, filename),
    headers: [],
    fields: [],
    method: 'PUT'
  }
})

const createPresignedUrl = async (id: string, type: string, filename: string) => {
  // Configure AWS SDK
  const s3Client = new S3Client({
    region: config.private.awsDefaultRegion,
    credentials: {
      accessKeyId: config.private.awsAccessKeyId,
      secretAccessKey: config.private.awsSecretAccessKey
    }
  })

  // Specify the bucket name and key for the object you want to create a presigned URL for
  const bucketName = config.private.awsBucket
  const key = `${filename}`

  // Set the expiration time for the presigned URL (e.g., 1 hour from now)
  const expirationTime = 60 * 60 // 1 hour

  // Generate the presigned URL
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: id
  })

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: expirationTime
  })

  return signedUrl
}
