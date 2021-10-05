import React from 'react'
import Button from '../../common/button'
import {
  MdOpenInBrowser,
  MdSkipPrevious,
  MdSkipNext,
  MdPlayArrow,
  MdShuffle,
  MdShuffleOn,
  MdPause
} from 'react-icons/md'

type Props = {
  className?: string
  isPlaying: boolean
  isShuffle: boolean
  onClickPlay: () => void
  onChangeShuffle: () => void
}

const Control = ({
  className = '',
  isPlaying,
  isShuffle,
  onClickPlay,
  onChangeShuffle
}: Props): JSX.Element => {
  console.log(`[playing] : ${isPlaying}`)

  return (
    <div
      className={`flex items-center text-2xl text-black drag-none ${className}`}
    >
      <Button onClick={() => console.log('open')}>
        <MdOpenInBrowser />
      </Button>
      <div className="flex mx-4 text-3xl">
        <MdSkipPrevious />
        <Button onClick={onClickPlay}>
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </Button>
        <MdSkipNext />
      </div>
      <Button onClick={onChangeShuffle}>
        {isShuffle ? <MdShuffleOn /> : <MdShuffle />}
      </Button>
    </div>
  )
}

export default Control
