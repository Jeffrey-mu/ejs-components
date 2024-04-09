export default function About() {
  return <>
    <header className="bg-orange-500 text-white py-4 mt-4">
      <h1 className="text-2xl font-bold text-center">关于我们</h1>
    </header>
    <main className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">我们是谁</h2>
        <p className="text-gray-700">欢迎来到我们的 TailwindCSS 组件库。我们致力于提供高质量、易于使用的组件，帮助开发者快速构建现代化的界面。</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">我们的使命</h2>
        <p className="text-gray-700">我们的使命是简化前端开发过程，让开发者专注于业务逻辑而不是样式。通过我们的组件库，您可以轻松创建各种样式一致的界面。</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">联系我们</h2>
        <p className="text-gray-700 mb-2">如果您有任何疑问或反馈，请随时联系我们。您可以通过电子邮件或社交媒体与我们取得联系。</p>
        <p className="text-gray-700 mb-2">Email: jeffrey.muc@gmail.com</p>
        <p className="text-gray-700">Twitter: https://twitter.com/jiafengwang_yo</p>
      </section>
    </main></>
}
