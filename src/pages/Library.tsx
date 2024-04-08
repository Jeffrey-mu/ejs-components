import Library from '@/Library/index.json'
import CodeList from '@/components/CodeList'

export default function App() {
  return (
    <CodeList codeList={Library} />
  )
}
