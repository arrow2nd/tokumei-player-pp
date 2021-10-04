import React, { useState, ChangeEvent, useEffect } from 'react'
import { OptionType } from '../../../types/option'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  episodeOptions: OptionType[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const EpisodeSelect = ({
  className = '',
  episodeOptions,
  onChange
}: Props): JSX.Element => {
  const [options, setOptions] = useState([] as JSX.Element[])
  const [selectedValue, setSelectedValue] = useState('')

  // エピソードリストを更新
  useEffect(() => {
    const newOptions = createOptions(episodeOptions, 35)

    setOptions(newOptions)

    // 最新話をセット
    if (newOptions.length > 0) {
      setSelectedValue(episodeOptions.slice(-1)[0].value)
    }
  }, [episodeOptions])

  // 値が変更された
  const handleChangeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.currentTarget.value)
    onChange(e)
  }

  return (
    <select
      className={`border-none outline-none ${className}`}
      value={selectedValue}
      onChange={handleChangeValue}
    >
      {options.length > 0 ? options : <option>Loading...</option>}
    </select>
  )
}

export default EpisodeSelect
