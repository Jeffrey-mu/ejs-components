import path from 'node:path'
import { fileURLToPath } from 'node:url'
import uploadFiles from 'upload-files-to-oss'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

uploadFiles({
  // eslint-disable-next-line node/prefer-global/process
  accessKeyId: process.env.jeffreyOssId,
  // eslint-disable-next-line node/prefer-global/process
  accessKeySecret: process.env.jeffreyOssKey,
  bucket: 'ejs-component',
  region: 'oss-ap-northeast-2',
}, path.join(__dirname, '../dist'))
