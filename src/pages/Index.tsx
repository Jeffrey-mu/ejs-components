import { useEffect, useState } from 'react'
import { Card } from '@nextui-org/react'
import ca from 'clsx'
import { api, header as headers } from '@/lib/constant'
import type { CompDataType } from '@/components/CodeDemo'
import CodeDemo from '@/components/CodeDemo'
import Sidebar from '@/components/Sidebar'
import RenderHtml from '@/components/CodeDemo/RenderHtml'
import GoEnd from '@/components/svg/GoEnd'
import { replaceLetter } from '@/lib/utils'

export const tabs = ['card', 'footer', 'titlebar', 'layout', 'header']
export default function App() {
  const [list, setList] = useState<CompDataType[]>([])
  const [active, setActive] = useState(tabs[0])

  useEffect(() => {
    fetch(`${api}/componentsList`, {
      method: 'get',
      headers,
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.code === 200)
          setList(res.data)
      })
      .catch((err) => {
        console.log(err)
        setList([])
      })
  }, [])
  function handelMenu(value: string) {
    setActive(value)
  }
  return (
    <div className="flex gap-5">
      <Sidebar change={handelMenu} list={list} active={active} />
      <div className="flex flex-col w-full pb-80 sm:w-[80%] ml-0 sm:ml-[270px] mt-5">
        <section
          className={ca(
            active === 'card'
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
              <Card className="p-2 cursor-pointer flex mb-3" key={index}>
                <div className="">
                  <a
                    className="pl-3 flex items-center text-slate-800 mb-3"
                    href={`#${item.info.name}`}
                  >
                    {item.info.name}
                    {' '}
                    <GoEnd />
                  </a>
                  <RenderHtml html={item.html} />
                </div>
              </Card>
            ))}
        </section>
        {list
          .filter(item => item.info.type === active)
          .sort((a, b) => {
            return replaceLetter(a.info.name) - replaceLetter(b.info.name)
          })
          .map(item => (
            <CodeDemo compData={item} key={item.ejs} />
          ))}
      </div>
    </div>
  )
}
