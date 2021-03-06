import React, { useState } from 'react'

import Time from './time'

type Props = {
  className?: string
  currentSec: number
  durationSec: number
  onSeek: (sec: number) => void
}

const Seekbar = ({
  className = '',
  currentSec,
  durationSec,
  onSeek
}: Props): JSX.Element => {
  const [isDuringSeek, setIsDuringSeek] = useState(false)
  const [seekSec, setSeekSec] = useState(0)

  // シーク開始
  const handleSeekStart = () => setIsDuringSeek(true)

  // シーク終了
  const handleSeekFinish = () => {
    onSeek(seekSec)
    setTimeout(() => setIsDuringSeek(false), 1000)
  }

  // シーク中
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sec = parseFloat(e.currentTarget.value)

    if (seekSec !== sec) {
      setSeekSec(sec)
    }
  }

  return (
    <div className={`flex items-center w-11/12 drag-none ${className}`}>
      <Time sec={isDuringSeek ? seekSec : currentSec} />
      <input
        className="w-full h-1.5 mx-3 w-appearance-none cursor-pointer bg-gray-300 overflow-hidden outline-none rounded-md"
        type="range"
        min={0}
        max={durationSec}
        step={1}
        value={isDuringSeek ? seekSec : currentSec}
        onChange={handleSeek}
        onMouseDown={handleSeekStart}
        onMouseUp={handleSeekFinish}
      />
      <Time sec={durationSec} />
    </div>
  )
}

export default React.memo(Seekbar)
