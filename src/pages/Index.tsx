import { useState, useEffect } from "react";
import { api, header as headers } from "@/lib/constant";
import CodeDemo, { CompDataType } from "@/components/CodeDemo";
export default function App() {
  const [list, setList] = useState<CompDataType[]>([]);
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

  return (
    <div>
      {list.map((item) => {
        return <CodeDemo compData={item} />;
      })}
    </div>
  );
}
