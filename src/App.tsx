import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Index from '@/pages/Index'
import About from '@/pages/About'

function App() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const style = document.createElement('style')
    style.textContent = `
      body {
        background-color: #fff !important; /* Set background color to white */
        color: #000 !important; /* Set text color to black */
        /* Add more overrides as needed */
      }
    `
    document.head.append(style)
  }
  return (
    <div className="App font-sans absolute inset-0 -z-10 h-fit bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
