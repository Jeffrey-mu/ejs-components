import { useRef, useState } from 'react'
import clsx from 'clsx'
import { useCopyToClipboard, useFullscreen, useToggle } from 'react-use'
import { Button, Card, CardBody, Tooltip } from '@nextui-org/react'
import CodeEditor from './CodeEditor'
import Pc from '@/components/svg/Pc'
import Mobile from '@/components/svg/Mobile'
import EditCode from '@/components/svg/EditCode'
import Copy from '@/components/svg/Copy'
import ScreenFull from '@/components/svg/ScreenFull'
import Pad from '@/components/svg/Pad'
import Laptop from '@/components/svg/Laptop'
import CopySuccess from '@/components/svg/CopySuccess'
import MobileSm from '@/components/svg/MobileSm'
// 模拟响应式
export const screen = [
  {
    width: 323,
    height: 550,
    type: 'xs',
    icon: <Mobile />,
  },
  {
    width: 643,
    height: 640,
    type: 'sm',
    icon: <MobileSm />,
  },
  {
    width: 771,
    height: 768,
    type: 'md',
    icon: <Pad />,
  },
  {
    width: 1027,
    height: 1024,
    type: 'lg',
    icon: <Laptop />,
  },
  {
    width: 1283,
    height: 1280,
    type: 'xl',
    icon: <Pc />,
  },
]
export default function App({ html, mode }: { html: string, mode?: boolean }) {
  const [width, setWidth] = useState(320)
  const [height, setHeight] = useState(550)
  const [innerHtml, setInnerHtml] = useState(html)
  const [showEdit, setShowEdit] = useState(false)
  const [tooltip, setTooltip] = useState('Copy')
  const ref = useRef(null)
  const [show, toggle] = useToggle(false)
  const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) })
  const [, copyToClipboard] = useCopyToClipboard()

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
      <title>ejs & html</title>
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
          <div className="flex gap-3 bg-slate-200 justify-between items-center mb-2 p-4">
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
              <Tooltip
                content={tooltip}
                delay={0}
                closeDelay={0}
              >
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  variant="faded"
                  onClick={() => {
                    copyToClipboard(innerHtml)
                    setTooltip('Copied!')
                    setTimeout(() => {
                      setTooltip('Copy')
                    }, 1000)
                  }}
                  className={clsx(
                    `cursor-pointer icon-hover`,
                  )}
                >
                  {tooltip === 'Copy' ? <Copy /> : <CopySuccess />}

                </Button>
              </Tooltip>

            </div>
          </div>
          <CardBody>
            {
              showEdit
                ? (
                  <div className="p-2 border-2">
                    <CodeEditor
                      value={html}
                      mode="html"
                      onChange={(value) => {
                        setInnerHtml(value)
                      }}
                    />
                  </div>
                  )
                : <></>
            }

            <div className="flex justify-center">
              <iframe
                className={clsx(
                  `w-[${width}px] h-[${height}px] border-dashed border-2 overflow-auto hover:border-orange-400 hover:bg-slate-50`,
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
