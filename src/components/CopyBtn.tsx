import { Button, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import clsx from 'clsx'
import Copy from '@/components/svg/Copy'
import CopySuccess from '@/components/svg/CopySuccess'

export default function App(props: { value: string, className?: string }) {
  const [, copyToClipboard] = useCopyToClipboard()
  const [tooltip, setTooltip] = useState('Copy')
  return (
    <Tooltip
      content={tooltip}
      delay={0}
      closeDelay={0}
    >
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant="faded"
        onClick={() => {
          copyToClipboard(props.value)
          setTooltip('Copied!')
          setTimeout(() => {
            setTooltip('Copy')
          }, 1000)
        }}
        className={clsx('cursor-pointer icon-hover', props.className)}
      >
        {tooltip === 'Copy' ? <Copy /> : <CopySuccess />}

      </Button>
    </Tooltip>
  )
}
