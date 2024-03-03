export default function App({ html }: { html: string }) {
  // 模拟响应式
  // const screen = [
  //   {
  //     width: 765,
  //     height: 250,
  //     type: "mobile"
  //   },
  //   {
  //     width: 768,
  //     height: 500,
  //     type: "pc"
  //   }
  // ];
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
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html
          .replace("data-src", "src")
          .replace("<a ", '<a onClick="event.preventDefault();" '),
      }}
    />
  );
  return (
    <iframe
      srcDoc={renderHtml(
        html
          .replace("data-src", "src")
          .replace("<a ", '<a onClick="event.preventDefault();" '),
      )}
    ></iframe>
  );
}
