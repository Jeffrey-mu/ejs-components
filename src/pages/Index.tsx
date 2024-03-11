import { useState, useEffect } from "react";
import { api, header as headers } from "@/lib/constant";
import CodeDemo, { CompDataType } from "@/components/CodeDemo";
import Sidebar from "@/components/Sidebar";
import RenderHtml from "@/components/CodeDemo/RenderHtml";
import { Card } from "@nextui-org/react";
import ca from "clsx";
export const tabs = ["card", "footer", "titlebar"];
export default function App() {
  const [list, setList] = useState<CompDataType[]>([]);
  const [active, setActive] = useState(tabs[0]);

  useEffect(() => {
    fetch(api + "/componentsList", {
      method: "get",
      headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.code === 200) {
          setList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setList([]);
      });
  }, []);
  function handelMenu(value: string) {
    setActive(value);
  }
  return (
    <div className="flex gap-5">
      <section className="w-[200px] ">
        <Sidebar change={handelMenu} list={list} active={active} />
      </section>

      <div className="flex flex-col w-[80%] pb-80">
        <section
          className={ca(
            active === "card"
              ? `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`
              : "grid-cols-1",
            "mb-4",
          )}
        >
          {list
            .filter((item) => item.info.type === active)
            .map((item) => (
              <Card className="p-2 cursor-pointer flex">
                <a href={`#${item.info.name}`}>
                  <RenderHtml html={item.html} />
                </a>
              </Card>
            ))}
        </section>
        {list
          .filter((item) => item.info.type === active)
          .map((item) => (
            <CodeDemo compData={item} />
          ))}
      </div>
    </div>
  );
}
