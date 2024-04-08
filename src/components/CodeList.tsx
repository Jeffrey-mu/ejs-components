import { useEffect, useState } from 'react'
import { Card } from '@nextui-org/react'
import ca from 'clsx'
import type { CompDataType } from '@/components/CodeDemo'
import CodeDemo from '@/components/CodeDemo'
import Sidebar from '@/components/Sidebar'
import RenderHtml from '@/components/CodeDemo/RenderHtml'
import GoEnd from '@/components/svg/GoEnd'
import { replaceLetter } from '@/lib/utils'

export const flexLayout = ['card', 'buttons', 'cards', 'inputs', 'loaders']
export default function App(props: { codeList: CompDataType[] }) {
  const uuid = Math.random() * 100
  const { codeList } = props
  const [active, setActive] = useState('')
  const [tabs, setTabs] = useState<string[]>([])

  useEffect(() => {
    initializeData(codeList)
  }, [props])
  function initializeData(data: CompDataType[]) {
    const tabs = [...new Set(data.map(item => item.info.type))].sort()
    setActive(tabs[0])
    setTabs(tabs)
  }
  function handelMenu(value: string) {
    setActive(value)
  }
  return (
    <div className="flex gap-5">
      <Sidebar change={handelMenu} list={codeList} active={active} tabs={tabs} />
      <div className="flex flex-col w-full flex-1 pb-80 ml-0 sm:ml-[250px] sm:w-[calc(100%-270px)] mt-5">
        <section
          className={ca(
            flexLayout.includes(active)
              ? `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4`
              : 'grid-cols-1',
            'mb-4',
          )}
        >
          {codeList
            .filter(item => item.info.type === active)
            .sort((a, b) => {
              return replaceLetter(a.info.name) - replaceLetter(b.info.name)
            })
            .map((item, index) => (
              <Card className="p-2 cursor-pointer flex mb-3" key={item.info.name + index + uuid}>
                <div className="">
                  <a
                    className="pl-3 flex items-center text-slate-800 mb-3"
                    href={`#${item.info.name}`}
                  >
                    {item.info.name}
                    {' '}
                    <GoEnd />
                  </a>
                  <div className={ca(
                    flexLayout.includes(active)
                      ? `flex flex-col items-center justify-center min-h-40`
                      : '',
                  )}
                  >
                    <RenderHtml html={item.html} />
                  </div>
                </div>
              </Card>
            ))}
        </section>
        {codeList
          .filter(item => item.info.type === active)
          .sort((a, b) => {
            return replaceLetter(a.info.name) - replaceLetter(b.info.name)
          })
          .map((item, index) => (
            <CodeDemo compData={item} key={`${index}CodeDemo`} />
          ))}
      </div>
    </div>
  )
}
