import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Oss from 'ali-oss'
import fg from 'fast-glob'
import { consola } from 'consola'

const startTime = new Date()

consola.info(`Using fast-glob ali-oss consola`)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const files = fg.sync(path.join(__dirname, '../dist/**'))

consola.start('初始化client...')

const client = new Oss({
  // eslint-disable-next-line node/prefer-global/process
  accessKeyId: process.env.jeffreyOssId,
  // eslint-disable-next-line node/prefer-global/process
  accessKeySecret: process.env.jeffreyOssKey,
  bucket: 'ejs-component',
  region: 'oss-ap-northeast-2',
})

async function uploadFiles() {
  for (const file of files) {
    const fileName = file.split('/dist/')[1]
    const result = await client.put(fileName, file)
    if (result.res.status === 200)
      consola.success(`${fileName}上传成功！`)
    else
      consola.error(`${fileName}上传失败！`)
  }
}

uploadFiles()
  .catch(error => console.error(error))
  .finally(() => {
    const endTime = new Date()

    consola.success(`上传完成，耗时：${endTime - startTime}ms`)
  })
