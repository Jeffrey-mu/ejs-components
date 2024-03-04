import { useState, useEffect } from "react";
import { api, header as headers } from "@/lib/constant";
import CodeDemo, { CompDataType } from "@/components/CodeDemo";
import { Tabs, Tab, Card, CardBody, Spinner } from "@nextui-org/react";
export default function App() {
  const [list, setList] = useState<CompDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const tabs = ['card', 'footer']
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
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" onSelectionChange={() => {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
          }, 200)
        }}>
          {tabs.map((type) => {
            return <Tab key={type} title={type}>
              <Card>
                <CardBody>
                  {
                    loading ? <Spinner /> : list.filter(item => item.info.type === type).map((item) =>
                      <CodeDemo compData={item} />)
                  }
                </CardBody>
              </Card>
            </Tab>
          })}
        </Tabs>
      </div>

    </div>
  );
}
