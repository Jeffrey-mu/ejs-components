import { useRef, useState } from 'react'
import clsx from 'clsx'
import AceEditor from 'react-ace'
import { useCopyToClipboard, useDebounce, useFullscreen, useToggle } from 'react-use'
import { Button, Card, CardBody } from '@nextui-org/react'
import Pc from '@/components/svg/Pc'
import Mobile from '@/components/svg/Mobile'
import EditCode from '@/components/svg/EditCode'
import Copy from '@/components/svg/Copy'
import ScreenFull from '@/components/svg/ScreenFull'
import Pad from '@/components/svg/Pad'
import Laptop from '@/components/svg/Laptop'
import CopySuccess from '@/components/svg/CopySuccess'
import MobileSm from '@/components/svg/MobileSm'
import 'ace-builds/src-noconflict/mode-html'// jsx模式的包
import 'ace-builds/src-noconflict/theme-monokai'// monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'

// 代码联想
export default function App({ html, mode }: { html: string, mode?: boolean }) {
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(550)
  const [innerHtml, setInnerHtml] = useState(html)
  const [editHtml, setEditHtml] = useState(html)
  const [showEdit, setShowEdit] = useState(false)
  const ref = useRef(null)
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) })
  const [,] = useDebounce(
    () => {
      setInnerHtml(editHtml)
    },
    500,
    [editHtml],
  )
  const [state, copyToClipboard] = useCopyToClipboard()
  // 模拟响应式
  const screen = [
    {
      width: 320,
      height: 550,
      type: 'xs',
      icon: <Mobile />,
    },
    {
      width: 640,
      height: 640,
      type: 'sm',
      icon: <MobileSm />,
    },
    {
      width: 768,
      height: 768,
      type: 'md',
      icon: <Pad />,
    },
    {
      width: 1024,
      height: 1024,
      type: 'lg',
      icon: <Laptop />,
    },
    {
      width: 1280,
      height: 1280,
      type: 'xl',
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
        <Card ref={ref}>
          <div className="flex gap-3 bg-slate-700 justify-between items-center mb-2 p-4 text-white">
            <div className="flex items-center gap-5 text-center">
              {screen.map(item => (
                <div
                  key={item.type}
                  className={clsx(
                    `cursor-pointer ${width === item.width ? 'text-orange-400' : ''} icon-hover `,
                  )}
                  onClick={switchDevice.bind(null, item.type)}
                >
                  {item.icon}
                  <p className="text-sm">{item.type}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="faded"
                onClick={() => toggle()}
                className={clsx(
                  `cursor-pointer icon-hover`,
                )}
              >
                <ScreenFull />
                {isFullscreen ? 'Exit' : 'Full'}
                {' '}
                Screen
              </Button>
              <Button
                size="sm"
                variant="faded"
                onClick={setShowEdit.bind(null, !showEdit)}
                className={clsx(
                  `cursor-pointer icon-hover`,
                )}
              >
                <EditCode />
                {!showEdit ? ' Show Code' : ' Hide Code'}
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="faded"
                onClick={copyToClipboard.bind(null, innerHtml)}
                className={clsx(
                  `cursor-pointer icon-hover`,
                )}
              >
                {!state.value ? <Copy /> : <CopySuccess />}

              </Button>
            </div>
          </div>
          <CardBody>
            {
              showEdit
                ? (
                  <div className="p-2 border-2">
                    <AceEditor
                      mode="html"
                      theme="monokai"
                      name="app_code_editor"
                      fontSize={14}
                      showPrintMargin
                      height="300px"
                      width="100%"
                      showGutter
                      value={editHtml}
                      onChange={(value) => {
                        setEditHtml(value)
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
          </CardBody>

        </Card>
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
