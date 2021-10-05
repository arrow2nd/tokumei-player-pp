import React from 'react'
import {
  MdOpenInBrowser,
  MdSkipPrevious,
  MdSkipNext,
  MdPlayArrow,
  MdShuffle
} from 'react-icons/md'

type Props = {
  className?: string
}

const Buttons = ({ className = '' }: Props): JSX.Element => {
  return (
    <div
      className={`flex items-center text-2xl text-black drag-none ${className}`}
    >
      <MdOpenInBrowser />
      <div className="flex mx-4 text-3xl">
        <MdSkipPrevious />
        <MdPlayArrow />
        <MdSkipNext />
      </div>
      <MdShuffle />
    </div>
  )
}

export default Buttons
