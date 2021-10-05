import React, { useState, ChangeEvent, useEffect } from 'react'
import Select from '../../../common/select'
import { OptionType } from '../../../../types/option'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  episodeOptions: OptionType[]
  disabled: boolean
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const EpisodeSelect = ({
  className = '',
  episodeOptions,
  disabled,
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
    <Select
      className={className}
      value={selectedValue}
      disabled={disabled}
      options={options}
      onChange={handleChangeValue}
    />
  )
}

export default EpisodeSelect