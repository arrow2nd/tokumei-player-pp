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
  onClickPrev: () => void
  onClickNext: () => void
  onChangeShuffle: () => void
}

const Control = ({
  className = '',
  isPlaying,
  isShuffle,
  onClickPlay,
  onClickPrev,
  onClickNext,
  onChangeShuffle
}: Props): JSX.Element => {
  console.log(`[conrol] playing = ${isPlaying}`)

  return (
    <div
      className={`flex items-center text-2xl text-black drag-none ${className}`}
    >
      <Button onClick={() => console.log('open')}>
        <MdOpenInBrowser />
      </Button>
      <div className="flex mx-4 text-3xl">
        <Button disabled={isPlaying} onClick={onClickPrev}>
          <MdSkipPrevious />
        </Button>
        <Button onClick={onClickPlay}>
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </Button>
        <Button disabled={isPlaying} onClick={onClickNext}>
          <MdSkipNext />
        </Button>
      </div>
      <Button onClick={onChangeShuffle}>
        {isShuffle ? <MdShuffleOn /> : <MdShuffle />}
      </Button>
    </div>
  )
}

export default Control
