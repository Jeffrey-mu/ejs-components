import path from 'node:path'
import uploadFiles from 'upload-files-to-oss'
import { __dirname } from './utils.js'

uploadFiles({
  // eslint-disable-next-line node/prefer-global/process
  accessKeyId: process.env.jeffreyOssId,
  // eslint-disable-next-line node/prefer-global/process
  accessKeySecret: process.env.jeffreyOssKey,
  bucket: 'ejs-component',
  region: 'oss-ap-northeast-2',
}, path.join(__dirname, '../dist'))
