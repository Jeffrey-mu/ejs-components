import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import './style.css'
export type CompDataType = {
  ejs: string,
  html: string,
  use: string,
  name: string,
}

export default function App({ compData }: { compData: CompDataType }) {
  return (
    <div className="flex w-full flex-col CodeDemo">
      <h2 className="py-3 text-xl font-bold">{compData.name}</h2>
      <div className="flex" dangerouslySetInnerHTML={{ __html: compData.html.replace('data-src', 'src').replace('<a ', '<a onClick="event.preventDefault();" ') }}>
      </div>

      <Tabs className="my-2" aria-label="Options">
        {
          (Object.keys(compData) as Array<keyof CompDataType>).map(item => {
            if (item === 'name') {
              return null;
            }
            return (
              <Tab key={item} title={item}>
                <Card>
                  <CardBody>
                    {compData[item]}
                  </CardBody>
                </Card>
              </Tab>
            );
          })
        }
      </Tabs>
    </div>
  );
}
