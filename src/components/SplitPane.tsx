import type { ReactNode } from 'react'
import { useState } from 'react'
import SplitPane, { Pane } from 'split-pane-react'
import 'split-pane-react/esm/themes/default.css'

interface Props {
  rightSlot: ReactNode
  leftSlot: ReactNode
}
export default function App(props: Props) {
  const [sizes, setSizes] = useState([500, 'auto'])
  const { rightSlot, leftSlot } = props
  return (
    <div style={{ height: 500 }}>
      <SplitPane
        split="horizontal"
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={200}>
          <div>
            {leftSlot}
          </div>
        </Pane>
        <Pane minSize={200}>
          <div>
            {rightSlot}
          </div>
        </Pane>
      </SplitPane>
    </div>
  )
};
