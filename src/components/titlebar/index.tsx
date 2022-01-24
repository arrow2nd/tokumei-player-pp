import React from 'react'
import { MdClose, MdMinimize } from 'react-icons/md'

import Button from '../common/button'

type TitleBarIcon = {
  title: string
  onClick: () => void
  icon: JSX.Element
}

const TitleBar = (): JSX.Element => {
  const isWin = process.env.PLATFORM === 'win32'
  const position = isWin ? 'right-0' : 'left-0'

  const icons: TitleBarIcon[] = [
    {
      title: '閉じる',
      onClick: () => window.api.windowClose(),
      icon: <MdClose />
    },
    {
      title: '最小化',
      onClick: () => window.api.windowMinimize(),
      icon: <MdMinimize />
    }
  ]

  // アイコンを逆順に並び替える
  if (isWin) {
    icons.reverse()
  }

  return (
    <div className={`fixed top-0 ${position} p-2 text-base drag-none`}>
      {icons.map((e) => (
        <Button key={e.title} onClick={e.onClick}>
          {e.icon}
        </Button>
      ))}
    </div>
  )
}

export default TitleBar
