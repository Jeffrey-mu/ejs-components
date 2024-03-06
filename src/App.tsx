import { Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Layout from "./components/Layout";

function App() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #fff !important; /* Set background color to white */
        color: #000 !important; /* Set text color to black */
        /* Add more overrides as needed */
      }
    `;
    document.head.append(style);
  }
  return (
    <div className="App font-sans bg-slate-100 dark:bg-transparent">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
