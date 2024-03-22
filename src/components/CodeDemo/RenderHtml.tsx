import { useState } from "react";
import clsx from "clsx";
export default function App({ html, mode }: { html: string, mode?: boolean }) {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(550)
  // 模拟响应式
  const screen = [
    {
      width: 400,
      height: 550,
      type: "mobile"
    },
    {
      width: 1024,
      height: 700,
      type: "pc"
    }
  ];
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
    </html>`;
  }
  // return;
  return mode ? (
    <>
      <div>
        screen: {
          screen.map(item => <span>{item.type}</span>)
        }
      </div>
      <div className={clsx(`w-[${width}px] h-[${height}px]`)}>
        <iframe
          className="h-full w-full"
          srcDoc={renderHtml(
            html
              .replace("data-src", "src")
              .replace("<a ", '<a onClick="event.preventDefault();" '),
          )}
        ></iframe>
      </div>
    </>
  ) : (
    <div
      dangerouslySetInnerHTML={{
        __html: html
          .replace("data-src", "src")
          .replace("<a ", '<a onClick="event.preventDefault();" '),
      }}
    />
  );
}
