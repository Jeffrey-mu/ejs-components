import AceEditor from 'react-ace'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import 'ace-builds/src-noconflict/mode-html'// jsx模式的包
import 'ace-builds/src-noconflict/theme-monokai'// monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'

interface CodeEditorProps {
  value: string
  mode?: string
  onChange: (val: string) => void
}
export default function CodeEditor(props: CodeEditorProps) {
  const [debounceValue, setDebounceValue] = useState(props.value)
  const [,] = useDebounce(
    () => {
      props.onChange(debounceValue)
    },
    500,
    [debounceValue],
  )
  return (
    <AceEditor
      mode="html"
      theme="monokai"
      name="app_code_editor"
      fontSize={16}
      style={{ }}
      showPrintMargin
      height="300px"
      width="100%"
      showGutter
      value={debounceValue}
      onChange={(value) => {
        setDebounceValue(value)
      }}
      wrapEnabled
      highlightActiveLine // 突出活动线
      enableSnippets // 启用代码段
      setOptions={{
        enableBasicAutocompletion: true, // 启用基本自动完成功能
        enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
        enableSnippets: true, // 启用代码段
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  )
}
