import { useState } from 'react'
import { Card } from '@nextui-org/react'
import ca from 'clsx'
import type { CompDataType } from '@/components/CodeDemo'
import CodeDemo from '@/components/CodeDemo'
import Sidebar from '@/components/Sidebar'
import RenderHtml from '@/components/CodeDemo/RenderHtml'
import GoEnd from '@/components/svg/GoEnd'
import { replaceLetter } from '@/lib/utils'
import Library from '@/Library/index.json'

export const flexLayout = ['card', 'buttons', 'cards', 'inputs', 'loaders']
export default function App() {
  const [list] = useState<CompDataType[]>(Library)
  const tabs = [...new Set(list.map(item => item.info.type))].sort()
  const [active, setActive] = useState(tabs[0])
  function handelMenu(value: string) {
    setActive(value)
  }
  return (
    <div className="flex gap-5">
      <Sidebar change={handelMenu} list={list} active={active} tabs={tabs} />
      <div className="flex flex-col w-full pb-80 sm:w-[80%] ml-0 sm:ml-[270px] mt-5">
        <section
          className={ca(
            flexLayout.includes(active)
              ? `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`
              : 'grid-cols-1',
            'mb-4',
          )}
        >
          {list
            .filter(item => item.info.type === active)
            .sort((a, b) => {
              return replaceLetter(a.info.name) - replaceLetter(b.info.name)
            })
            .map((item, index) => (
              <Card className="p-2 cursor-pointer flex mb-3" key={item.info.name + index}>
                <div className="flex flex-col">
                  <a
                    className="pl-3 flex items-center text-slate-800 mb-3"
                    href={`#${item.info.name}`}
                  >
                    {item.info.name}
                    {' '}
                    <GoEnd />
                  </a>
                  <div className="flex flex-col items-center justify-center min-h-40">
                    <RenderHtml html={item.html} />
                  </div>
                </div>
              </Card>
            ))}
        </section>
        {list
          .filter(item => item.info.type === active)
          .sort((a, b) => {
            return replaceLetter(a.info.name) - replaceLetter(b.info.name)
          })
          .map((item, index) => (
            <CodeDemo compData={item} key={`${index}Library`} />
          ))}
      </div>
    </div>
  )
}
