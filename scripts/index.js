import path from 'node:path'
import fs from 'node:fs'
import fg from 'fast-glob'
import { __dirname } from './utils.js'

function initializeLibrary() {
  const dataJson = []
  const counters = {} // 用于存储不同类型的计数器

  const files = fg.sync(path.join(__dirname, '../src/Library/**/*.html'), { dot: true })
  files.forEach(((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8').toString()
    const type = filePath.split('/').at(-2)

    // 获取当前类型的计数器值，如果不存在，则初始化为0
    const count = counters[type] || 0
    // 更新计数器的值
    counters[type] = count + 1

    dataJson.push({
      info: {
        name: `${type.slice(0, -1)}_${count}`, // 使用计数器值作为后缀
        type,
      },
      ejs: '',
      use: '',
      html: file,
    })
  }))

  fs.writeFileSync(path.join(__dirname, '../src/Library/index.json'), JSON.stringify(dataJson))
}

initializeLibrary()
