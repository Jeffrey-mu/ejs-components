import * as monaco from 'monaco-editor'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-use'

interface CodeEditorProps {
  value: string
  mode?: string
  onChange: (val: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const [debounceValue, setDebounceValue] = useState(props.value)
  const [,] = useDebounce(() => {
    props.onChange(debounceValue)
  }, 500, [debounceValue])

  const containerRef = useRef<HTMLDivElement>(null)
  let monacoInstance: monaco.editor.IStandaloneCodeEditor | null = null

  useEffect(() => {
    if (containerRef.current) {
      if (monacoInstance) {
        monacoInstance.layout()
      }
      else {
        monacoInstance = monaco.editor.create(containerRef.current, {
          value: props.value,
          language: props.mode || 'html',
          theme: 'vs-dark',
          wordWrap: 'on',
          fontSize: 16,
        })

        window.addEventListener('resize', () => {
          if (monacoInstance)
            monacoInstance.layout()
        })

        monacoInstance.onDidChangeModelContent(() => {
          if (monacoInstance)
            setDebounceValue(monacoInstance.getValue())
        })
      }
    }

    return () => {
      if (monacoInstance)
        monacoInstance.dispose()
    }
  }, [])

  return <div ref={containerRef} className="h-60" />
}

export default CodeEditor
