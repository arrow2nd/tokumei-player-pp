import React, { useState } from 'react'
import Time from './time'

type Props = {
  currentSec: number
  durationSec: number
}

const Seekbar = ({ currentSec, durationSec }: Props): JSX.Element => {
  const [isDuringSeek, setIsDuringSeek] = useState(false)
  const [seekSec, setSeekSec] = useState(0)

  // シーク開始
  const handleSeekStart = () => setIsDuringSeek(true)

  // シーク終了
  const handleSeekFinish = () => {
    // props.onSeek(seekTime)
    setTimeout(() => setIsDuringSeek(false), 1000)
  }

  // シーク中
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.currentTarget.value)
    if (time !== seekSec) setSeekSec(time)
  }

  return (
    <div>
      <Time sec={currentSec} />
      <input
        className="appearance-none cursor-pointer bg-gray-300 overflow-hidden outline-none w-3/4 h-1.5 rounded-md mx-3"
        type="range"
        min="0"
        max={durationSec}
        step="1"
        value={isDuringSeek ? seekSec : currentSec}
        onChange={handleSeek}
        onMouseDown={handleSeekStart}
        onMouseUp={handleSeekFinish}
      />
      <Time sec={durationSec} />
    </div>
  )
}

export default Seekbar
