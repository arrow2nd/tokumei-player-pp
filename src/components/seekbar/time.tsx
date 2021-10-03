import React, { useMemo } from 'react'

type Props = {
  sec: number
}

const Time = ({ sec }: Props): JSX.Element => {
  const minStr = useMemo(
    () => String(Math.floor(sec / 60)).padStart(2, '0'),
    [sec]
  )
  const secStr = useMemo(
    () => String(Math.ceil(sec % 60)).padStart(2, '0'),
    [sec]
  )

  return <span className="text-xs">{`${minStr}:${secStr}`}</span>
}

export default Time
