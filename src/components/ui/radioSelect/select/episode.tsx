import React, { useEffect, useState } from 'react'

import { Option } from '../../../../types/option'
import Select from '../../../common/select'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  episodeOptions: Option[]
  disabled: boolean
  currentEpisode: string
  onChange: (current: Option) => void
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
    const newOptions = createOptions(episodeOptions)
    setOptions(newOptions)

    // 最新話をセット
    if (newOptions.length > 0) {
      onChange(episodeOptions.slice(-1)[0])
    }
  }, [episodeOptions, onChange])

  return (
    <Select
      className={className}
      value={currentEpisode}
      disabled={disabled}
      options={options}
      onChange={onChange}
    />
  )
}

export default React.memo(EpisodeSelect)
