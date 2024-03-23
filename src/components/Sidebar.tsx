import ca from 'clsx'
import { useLocation } from 'react-use'
import { useWindowScroll } from '@uidotdev/usehooks'
import type { CompDataType } from './CodeDemo'
import ArrowDown from '@/components/svg/ArrowDown'
import { tabs } from '@/pages/Index'
import { replaceLetter } from '@/lib/utils'

export default function App({
  change,
  list,
  active,
}: {
  change: (value: string) => void
  list: CompDataType[]
  active: string
}) {
  const state = useLocation()
  const [, scrollTo] = useWindowScroll()
  function handelMenu(value: string) {
    change(value)
    scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }
  return (
    <div className="sticky top-[89px] max-h-[80vh] overflow-auto">
      <ul className="h-full box-border bg-content1 outline-none shadow-medium rounded-large transition-transform-background flex w-full flex-col p-3 CodeDemo mb-3 gap-3 text-yellow-800">
        <li className="text-xl font-bold">Components</li>
        {tabs.map((item, index) => {
          return (
            <li key={index}>
              <span
                onClick={handelMenu.bind(null, item)}
                className={ca(
                  `${item === active ? 'text-orange-600' : ''} w-fullcursor-pointer pl-4 flex text-xl hover:text-orange-600 ml-3 items-center justify-between pr-5`,
                )}
              >
                {item}
                <ArrowDown rotate={active === item ? '' : 'rotate-90'} />
              </span>
              <ul
                className={ca(
                  `mt-2 transform transition-all duration-500 ease-in-out ${active === item ? 'block' : 'hidden'
                  }`,
                )}
              >
                {list
                  .filter(item_list => item_list.info.type === item)
                  .sort((a, b) => {
                    return replaceLetter(a.info.name) - replaceLetter(b.info.name)
                  })
                  .map(item => (
                    <li
                      className={ca(
                        `border-l-1 ml-6 h-10  flex cursor-pointer `,
                      )}
                      key={item.use}
                    >
                      <a
                        className={ca(
                          `border-l-1 h-6 pl-6 flex border-transparent hover:text-orange-600 cursor-pointer w-full hover:border-orange-500 ml-[-1px]`,
                          state.hash?.slice(1) === item.info.name
                            ? 'text-orange-600 border-orange-500'
                            : '',
                        )}
                        href={`#${item.info.name}`}
                      >
                        {item.info.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
