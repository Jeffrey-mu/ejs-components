import { useState, useEffect } from "react";
import { api, header as headers } from "@/lib/constant";
import CodeDemo, { CompDataType } from "@/components/CodeDemo";
import { Card, CardBody } from "@nextui-org/react";
import clsx from "clsx";
export default function App() {
  const [list, setList] = useState<CompDataType[]>([]);
  const tabs = ['card', 'footer']
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
    setActive(value)
  }
  return (
    <div className="flex gap-5">
      <div className="w-[200px]">
        <ul className="sticky top-10">
          <li className="mb-3 text-xl font-bold">
            Components
          </li>
          {
            tabs.map(item => {
              return <>
                <li onClick={handelMenu.bind(null, item)} key={item}
                  className={clsx(`${item === active ? 'text-orange-600 border-orange-600' : ''} h-7 w-full cursor-pointer pl-4 mb-2 flex items-center text-xl hover:border-orange-600 hover:text-orange-600  border-l-2 ml-3`)}>
                  <span>{item}</span>
                </li>
              </>

            })
          }
          <li>
            <span>

            </span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-[80%]">
        <Card>
          <CardBody>
            {
              list.filter(item => item.info.type === active).map((item) =>
                <CodeDemo compData={item} />)
            }
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
