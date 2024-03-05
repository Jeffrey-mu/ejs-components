import { useState, useEffect } from "react";
import { api, header as headers } from "@/lib/constant";
import CodeDemo, { CompDataType } from "@/components/CodeDemo";
import { useLocation } from "react-use";
import ca from "clsx";
import ArrowDown from "@/components/svg/ArrowDown";
export default function App() {
  const state = useLocation();
  const [list, setList] = useState<CompDataType[]>([]);
  const tabs = ["card", "footer"];
  const [active, setActive] = useState(tabs[0]);

  useEffect(() => {
    console.log(state, "state");
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
        <div className="sticky top-[89px]">
          <ul className="h-full text-foreground box-border bg-content1 outline-none shadow-medium rounded-large transition-transform-background flex w-full flex-col p-3 CodeDemo mb-3 gap-3">
            <li className="text-xl font-bold">Components</li>
            {tabs.map((item) => {
              return (
                <>
                  <li onClick={handelMenu.bind(null, item)} key={item}>
                    <span
                      className={ca(
                        `${item === active ? "text-orange-600" : ""} w-full cursor-pointer pl-4 flex text-xl hover:text-orange-600 ml-3 items-center justify-between pr-5`,
                      )}
                    >
                      {item}
                      <ArrowDown />
                    </span>

                    <ul className={ca(`mt-2`)}>
                      {list
                        .filter((item_list) => item_list.info.type === item)
                        .map((item) => (
                          <li
                            className={ca(
                              `border-l-1 ml-6 h-10  flex cursor-pointer `,
                            )}
                          >
                            <a
                              className={ca(
                                `border-l-1 h-6 pl-6 flex border-transparent hover:text-orange-600 cursor-pointer w-full hover:border-orange-500`,
                                state.hash?.slice(1) === item.info.name
                                  ? "text-orange-600 border-orange-500"
                                  : "",
                              )}
                              href={`#${item.info.name}`}
                            >
                              {item.info.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
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
