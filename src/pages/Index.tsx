import { useEffect, useState } from 'react'
import { api, header as headers } from '@/lib/constant'
import type { CompDataType } from '@/components/CodeDemo/index'
import CodeList from '@/components/CodeList'

export default function App() {
  const [list, setList] = useState<CompDataType[]>([])
  useEffect(() => {
    const sessionStorage_componentsList = sessionStorage.getItem('componentsList')
    if (sessionStorage_componentsList) {
      setList(JSON.parse(sessionStorage_componentsList))
      return
    }
    fetch(`${api}/componentsList`, {
      method: 'get',
      headers,
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.code === 200) {
          setList(res.data)
          sessionStorage.setItem('componentsList', JSON.stringify(res.data))
        }
      })
      .catch((err) => {
        console.log(err)
        setList([])
      })
  }, [])

  return (
    <CodeList codeList={list} />
  )
}
