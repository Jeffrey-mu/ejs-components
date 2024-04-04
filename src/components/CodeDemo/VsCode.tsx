import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { v4 as uuidv4 } from 'uuid'

interface CodeEditorProps {
  value: string
  mode?: string
  onChange: (val: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const [debounceValue, setDebounceValue] = useState(props.value)
  const [uuid] = useState(uuidv4()) // Store the UUID in state

  useDebounce(() => {
    props.onChange(debounceValue)
  }, 500, [debounceValue])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `${uuid}` && e.newValue)
        setDebounceValue(e.newValue)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [uuid])

  const data = {
    html: props.value,
    option: {
      automaticLayout: true,
      language: 'html',
      theme: 'vs-dark',
      wordWrap: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      fontSize: 16,
    },
    uuid,
  }

  return <iframe src={`/code/index.html?${JSON.stringify(data)}`} className="w-full h-80"></iframe>
}

export default CodeEditor
