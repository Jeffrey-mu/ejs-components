import { useState, useEffect } from "react";
import { api, header as headers } from "@/lib/constant";
import CodeDemo, { CompDataType } from "@/components/CodeDemo";
import Sidebar from "@/components/Sidebar";

export const tabs = ["card", "footer"];
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
      <div className="w-[200px] ">
        <Sidebar change={handelMenu} list={list} active={active} />
      </div>
      <div className="flex flex-col w-[80%]  pb-80">
        {list
          .filter((item) => item.info.type === active)
          .map((item) => (
            <CodeDemo compData={item} />
          ))}
      </div>
    </div>
  );
}
