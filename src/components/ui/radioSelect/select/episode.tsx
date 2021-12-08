import React, { ChangeEvent, useEffect, useState } from 'react'

import { OptionType } from '../../../../types/option'
import Select from '../../../common/select'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  episodeOptions: OptionType[]
  disabled: boolean
  currentEpisode: string
  onChange: (path: string) => void
}

const EpisodeSelect = ({
  className = '',
  episodeOptions,
  disabled,
  currentEpisode,
  onChange
}: Props): JSX.Element => {
  const [options, setOptions] = useState([] as JSX.Element[])

  // エピソードリストを更新
  useEffect(() => {
    const newOptions = createOptions(episodeOptions, 35)

    setOptions(newOptions)

    // 最新話をセット
    if (newOptions.length > 0) {
      onChange(episodeOptions.slice(-1)[0].value)
    }
  }, [episodeOptions, onChange])

  const handleChangeValue = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <Select
      className={className}
      value={currentEpisode}
      disabled={disabled}
      options={options}
      onChange={handleChangeValue}
    />
  )
}

export default React.memo(EpisodeSelect)
