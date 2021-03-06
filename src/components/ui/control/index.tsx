import React from 'react'
import {
  MdOpenInBrowser,
  MdPause,
  MdPlayArrow,
  MdShuffle,
  MdShuffleOn,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md'

import Button from '../../common/button'

type Props = {
  className?: string
  isPlaying: boolean
  isShuffle: boolean
  onClickPlay: () => void
  onClickPrev: () => void
  onClickNext: () => void
  onClickOpen: () => void
  onChangeShuffle: () => void
}

const Control = ({
  className = '',
  isPlaying,
  isShuffle,
  onClickPlay,
  onClickPrev,
  onClickNext,
  onClickOpen,
  onChangeShuffle
}: Props): JSX.Element => (
  <div
    className={`flex items-center text-2xl text-black drag-none ${className}`}
  >
    <Button onClick={onClickOpen}>
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

export default React.memo(Control)
