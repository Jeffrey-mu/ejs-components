import { useState } from 'react'
import clsx from 'clsx'
import AceEditor from 'react-ace'
import { useDebounce } from 'react-use'
import Pc from '@/components/svg/Pc'
import Mobile from '@/components/svg/Mobile'
import EditCode from '@/components/svg/EditCode'
import 'ace-builds/src-noconflict/mode-jsx'// jsx模式的包
import 'ace-builds/src-noconflict/theme-monokai'// monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'
// 代码联想
export default function App({ html, mode }: { html: string, mode?: boolean }) {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(550)
  const [innerHtml, setInnerHtml] = useState(html)
  const [showEdit, setShowEdit] = useState(false)
  const [, cancel] = useDebounce(
    () => {
      console.log('useDebounce change')
      setInnerHtml(innerHtml)
    },
    500,
    [innerHtml],
  )
  // 模拟响应式
  const screen = [
    {
      width: 400,
      height: 550,
      type: 'mobile',
      icon: <Mobile />,
    },
    {
      width: 1024,
      height: 700,
      type: 'pc',
      icon: <Pc />,
    },
  ]
  function switchDevice(type: string) {
    const device = screen.find(item => item.type === type)
    if (device) {
      setWidth(device.width)
      setHeight(device.height)
    }
  }
  function renderHtml(html: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4006584_j5f79uup7rj.css">
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Document</title>
    </head>
    <body>
    ${html}
    </body>
    </html>`
  }
  // return;
  return mode
    ? (
      <>
        <div className="flex gap-3 justify-end items-center mb-2">
          <span
            onClick={setShowEdit.bind(null, !showEdit)}
            className={clsx(
            `${showEdit ? 'text-orange-400' : ''} bg-slate-50 p-1 cursor-pointer icon-hover`,
            )}
          >
            <EditCode />
          </span>
          {screen.map(item => (
            <span
              className={clsx(
                `cursor-pointer bg-slate-50 p-1  ${width === item.width ? 'text-orange-400' : ''} icon-hover `,
              )}
              onClick={switchDevice.bind(null, item.type)}
            >
              {item.icon}
            </span>
          ))}
        </div>
        {
          showEdit ? (
            <div className="p-2 border-2">
              <AceEditor
                mode="jsx"
                theme="monokai"
                name="app_code_editor"
                fontSize={14}
                showPrintMargin
                height="200px"
                width="100%"
                showGutter
                value={innerHtml}
                onChange={(value) => {
                  console.log('change')
                  setInnerHtml(value)
                }}
                wrapEnabled
                highlightActiveLine // 突出活动线
                enableSnippets // 启用代码段
                setOptions={{
                  enableBasicAutocompletion: true, // 启用基本自动完成功能
                  enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
                  enableSnippets: true, // 启用代码段
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.' }]}
              />
            </div>
          ) : <></>
        }

        <div className="flex justify-center">
          <iframe
            className={clsx(
              `w-[${width}px] h-[${height}px] border-dashed border-2 p-3 overflow-auto hover:border-orange-400 hover:bg-slate-50`,
            )}
            srcDoc={renderHtml(
              innerHtml
                .replace('data-src', 'src')
                .replace('<a ', '<a onClick="event.preventDefault();" '),
            )}
          >
          </iframe>
        </div>
      </>
      )
    : (
      <div
        dangerouslySetInnerHTML={{
          __html: html
            .replace('data-src', 'src')
            .replace('<a ', '<a onClick="event.preventDefault();" '),
        }}
      />
      )
}
