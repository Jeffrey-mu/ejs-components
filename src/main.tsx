import { createRoot } from "react-dom/client";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "./index.css";
import "./style/index.css";
const domNode = document.getElementById("root");
if (domNode) {
  const root = createRoot(domNode);
  root.render(
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="linght">
        <App />
      </NextThemesProvider>
    </NextUIProvider>,
  );
}
