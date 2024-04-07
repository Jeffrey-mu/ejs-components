import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useFullscreen, useToggle } from 'react-use'
import { Button, Card, CardBody } from '@nextui-org/react'
import VsCode from './VsCode'
import CopyBtn from '@/components/CopyBtn'
import Pc from '@/components/svg/Pc'
import Mobile from '@/components/svg/Mobile'
import EditCode from '@/components/svg/EditCode'
import ScreenFull from '@/components/svg/ScreenFull'
import Pad from '@/components/svg/Pad'
import Laptop from '@/components/svg/Laptop'
import MobileSm from '@/components/svg/MobileSm'
import { flexLayout } from '@/pages/Library'
// 模拟响应式
export const screen = [
  {
    width: 320,
    height: 550,
    type: 'xs',
    icon: <Mobile />,
  },
  {
    width: 640,
    height: 550,
    type: 'sm',
    icon: <MobileSm />,
  },
  {
    width: 768,
    height: 550,
    type: 'md',
    icon: <Pad />,
  },
  {
    width: 1024,
    height: 550,
    type: 'lg',
    icon: <Laptop />,
  },
  {
    width: 1280,
    height: 550,
    type: 'xl',
    icon: <Pc />,
  },
]
interface RenderHtmlProps {
  html: string
  type?: string
  mode?: boolean
  showTools?: boolean
}
export default function App({ html, mode, type, showTools }: RenderHtmlProps) {
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(550)
  const [innerHtml, setInnerHtml] = useState(html)
  const [showEdit, setShowEdit] = useState(false)
  const ref = useRef(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) })
  function switchDevice(type: string) {
    const device = screen.find(item => item.type === type)
    if (device) {
      setWidth(device.width)
      setHeight(device.height)
      setTimeout(() => onLoad())
    }
  }
  useEffect(() => {
    setInnerHtml(html)
  }, [html])
  function renderHtml(html: string) {
    return `<!doctype html>
    <html lang="en" class="h-full">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4006584_j5f79uup7rj.css">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>ejs & html</title>
      </head>
      <body class="h-full ${flexLayout.includes(type as string) ? 'flex flex-col justify-center items-center' : ''} ">
      ${formatWidth(html)}
      </body>
    </html>`
  }
  function formatWidth(html: string): string {
    if (flexLayout.includes(type as string)) {
      return `
      <div class="flex justify-center">
        <div class="max-w-[450px]">
          ${html}
      </div>
      </div>
      `
    }
    return html
  }
  function onLoad() {
    const iframe = iframeRef.current
    if (!iframe)
      return
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document
    const bodyHeight = iframeDocument?.body.scrollHeight
    if (bodyHeight)
      setHeight(bodyHeight + 5)
  }
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe)
      return

    iframe.addEventListener('load', onLoad)
    return () => {
      iframe.removeEventListener('load', onLoad)
    }
  }, [iframeRef])
  // return;
  return mode
    ? (
      <>
        <Card ref={ref}>
          {
            showTools
              ? (
                <div className="hidden sm:flex gap-3 bg-slate-200 justify-between items-center mb-2 p-4">
                  <div className="flex items-center gap-5 text-center">
                    {screen.map(item => (
                      <div
                        key={item.type}
                        className={clsx(
                          `cursor-pointer ${width === item.width ? 'text-slate-400' : ''} icon-hover `,
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
                      color="primary"
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
                      color="primary"
                      variant="faded"
                      onClick={setShowEdit.bind(null, !showEdit)}
                      className={clsx(
                        `cursor-pointer icon-hover`,
                      )}
                    >
                      <EditCode />
                      {!showEdit ? ' Show Code' : ' Hide Code'}
                    </Button>
                    <CopyBtn value={innerHtml} />
                  </div>
                </div>
                )
              : <></>
          }

          <CardBody className={clsx(isFullscreen ? '' : '', 'flex flex-col gap-4')}>
            <div className="flex justify-center flex-1">
              <iframe
                ref={iframeRef}
                className={clsx(
                  `w-[${width}px] h-[${height}px] min-h-40 border-dashed rounded-xl border-2 box-content overflow-auto p-5 hover:border-orange-200`,
                )}
                srcDoc={renderHtml(
                  innerHtml
                    .replace('data-src', 'src')
                    .replace('<a ', '<a onClick="event.preventDefault();" '),
                )}
              >
              </iframe>
            </div>
            {
              showEdit
                ? (
                  <div className="flex-1 border-t-2 border-solid border-teal-800 rounded-lg overflow-hidden relative">
                    <CopyBtn
                      value={innerHtml}
                      className={clsx(
                        `absolute bottom-2 right-10 bg-gray-700/80 text-white border-none`,
                      )}
                    />

                    <VsCode
                      value={html}
                      mode="html"
                      onChange={(value) => {
                        console.log(value, 'html')
                        setInnerHtml(value)
                      }}
                    />
                  </div>
                  )
                : <></>
            }

          </CardBody>

        </Card>
      </>
      )
    : (
      <div className="flex justify-center items-center flex-1 pb-2">
        <div
          className="w-full"
          dangerouslySetInnerHTML={{
            __html: html
              .replace('data-src', 'src')
              .replace('<a ', '<a onClick="event.preventDefault();" '),
          }}
        />
      </div>
      )
}
