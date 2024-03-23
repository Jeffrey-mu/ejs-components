import { useState } from 'react'
import clsx from 'clsx'
import Pc from '@/components/svg/Pc'
import Mobile from '@/components/svg/Mobile'

export default function App({ html, mode }: { html: string, mode?: boolean }) {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(550)
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
        <div className="flex gap-3 justify-end items-center">
          {screen.map(item => (
            <span
              className={clsx(
              `cursor-pointer ${width === item.width ? 'text-orange-500' : ''} icon-hover `,
              )}
              onClick={switchDevice.bind(null, item.type)}
            >
              {item.icon}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <iframe
            className={clsx(
            `w-[${width}px] h-[${height}px] border-dashed border-2 p-3 overflow-auto hover:border-orange-600 hover:bg-slate-50`,
            )}
            srcDoc={renderHtml(
              html
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
