import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import "./style.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import RenderHtml from "./RenderHtml";
import { copyText } from "@/lib/utils";
export type CompDataType = {
  ejs: string;
  html: string;
  use: string;
  info: {
    name: string;
    type: string;
  };
};
const ejsSyntax = {
  keywords: [
    "if",
    "else",
    "for",
    "each",
    "in",
    "include",
    "extends",
    "block",
    "script",
    "style",
    "html",
    "body",
  ],
  string: /("|')(\\?.)*?\1/,
  comment: /<!--[\s\S]*?-->/,
};
export default function App({ compData }: { compData: CompDataType }) {
  const [copyState, setCopyState] = useState(false);
  function copy(text: string) {
    copyText(text);
    setCopyState(true);
    setTimeout(() => {
      setCopyState(false);
    }, 2000);
  }
  return (
    <Card className="flex w-full flex-col p-3 CodeDemo mb-3">
      <h2 className="py-2 text-xl font-bold">{compData.info.name}</h2>
      <Tabs
        className="my-2"
        aria-label="Options"
        onSelectionChange={() => {
          setCopyState(false);
        }}
      >
        {(Object.keys(compData) as Array<keyof CompDataType>).map((item) => {
          if (item === "info") {
            return null;
          }
          return (
            <Tab key={item} title={item}>
              <Card>
                <CardBody>
                  <div className="flex justify-end cursor-pointer">
                    <span onClick={copy.bind(null, compData[item])}>
                      {copyState ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="green"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path d="m12 15l2 2l4-4" />
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </g>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="1.5"
                          >
                            <path d="M20.998 10c-.012-2.175-.108-3.353-.877-4.121C19.243 5 17.828 5 15 5h-3c-2.828 0-4.243 0-5.121.879C6 6.757 6 8.172 6 11v5c0 2.828 0 4.243.879 5.121C7.757 22 9.172 22 12 22h3c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16v-1" />
                            <path d="M3 10v6a3 3 0 0 0 3 3M18 5a3 3 0 0 0-3-3h-4C7.229 2 5.343 2 4.172 3.172C3.518 3.825 3.229 4.7 3.102 6" />
                          </g>
                        </svg>
                      )}
                    </span>
                  </div>
                  <SyntaxHighlighter
                    language="ejs"
                    style={okaidia}
                    customStyle={{ padding: 20 }}
                    showLineNumbers
                    wrapLines
                    languageCustomSyntax={ejsSyntax}
                  >
                    {compData[item]}
                  </SyntaxHighlighter>
                </CardBody>
              </Card>
            </Tab>
          );
        })}
      </Tabs>
      <div className="w-1/2">
        <RenderHtml html={compData.html} />
      </div>
    </Card>
  );
}
