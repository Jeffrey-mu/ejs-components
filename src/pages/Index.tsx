import Success from "@/components/svg/Success";
import Error from "@/components/svg/Error";
import { Input, Spinner, Card, CardBody, Divider } from "@nextui-org/react";
import { useState } from "react";
export default function App() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<string[][] | []>([]);
  function submit() {
    setValue("");
    setIsLoading(true);
    fetch("http://localhost:3131/verify?name=" + value, {
      method: "get",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.code === 200) {
          const resList = [...[res.message], ...(list.length ? [...list] : [])];
          setList(resList);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        const resList = [
          ["请求失败,请重试"],
          ...(list.length ? [...list] : []),
        ];
        setList(resList);
        setIsLoading(false);
      });
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      submit();
    }
  };
  return (
    <>
      <div className="flex gap-1 w-full items-center mb-4 ">
        <Input
          label="文件地址"
          type="text"
          description="请输入本机文件地址"
          labelPlacement="outside"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      {isLoading ? <Spinner /> : <></>}
      {list.map((item_list, index) => {
        return (
          <Card className="mb-3" key={index}>
            {item_list.map((item, index) => {
              return (
                <div key={index}>
                  <>
                    {index === 0 ? (
                      <CardBody>
                        {item_list
                          .join(",")
                          .includes("检查全部通过，可以上传！") ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Success />
                            验证通过
                          </div>
                        ) : (
                          <div className="flex  items-center gap-2 text-red-600">
                            验证失败
                            <Error />
                          </div>
                        )}
                      </CardBody>
                    ) : (
                      <></>
                    )}
                    <CardBody>
                      <p>{item}</p>
                    </CardBody>
                    <Divider />
                  </>
                </div>
              );
            })}
          </Card>
        );
      })}
    </>
  );
}
