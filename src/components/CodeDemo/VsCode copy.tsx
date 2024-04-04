import * as monaco from 'monaco-editor'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-use'
import { configureMonacoTailwindcss } from 'monaco-tailwindcss'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker.js?worker'
import TailwindcssWorker from 'monaco-tailwindcss/tailwindcss.worker.js?worker'
import { v4 as uuidv4 } from 'uuid'

window.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    console.log(label)
    if (label === 'editorWorkerService')
      return new EditorWorker()
    if (label === 'tailwindcss')
      return new TailwindcssWorker()
    return new EditorWorker()
  },

}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

configureMonacoTailwindcss(monaco)
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
  const iframeRef = useRef<HTMLIFrameElement>(null)
  let monacoInstance: monaco.editor.IStandaloneCodeEditor | null = null

  useEffect(() => {
    if (containerRef.current) {
      if (monacoInstance) {
        monacoInstance.layout()
      }
      else {
        monacoInstance = monaco.editor.create(containerRef.current, {
          value: props.value,
          automaticLayout: true,
          language: 'html',
          theme: 'vs-dark',
          wordWrap: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          fontSize: 16,
        })

        monacoInstance.onDidChangeModelContent(() => {
          if (monacoInstance)
            setDebounceValue(monacoInstance.getValue())
        })
      }
    }

    if (iframeRef.current) {
      window.addEventListener('storage', (e) => {
        console.log(e.newValue)
      })
    }
    return () => {
      if (monacoInstance)
        monacoInstance.dispose()
    }
  }, [])
  const uuid = uuidv4()
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

  return <iframe ref={iframeRef} src={`/code/index.html?${JSON.stringify(data)}`} className="w-full h-80"></iframe> // <div ref={containerRef} className="h-60" />
}

export default CodeEditor
