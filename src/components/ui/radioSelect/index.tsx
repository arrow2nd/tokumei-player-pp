import React from 'react'
import RadioNameSelect from './select/radioName'
import EpisodeSelect from './select/episode'
import { GroupOptionType, OptionType } from '../../../types/option'

type Props = {
  radioOptions: GroupOptionType[]
  episodeOptions: OptionType[]
  disabled: boolean
  onChangeRadio: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeEpisode: (path: string) => void
}

const RadioSelect = ({
  radioOptions,
  episodeOptions,
  disabled,
  onChangeRadio,
  onChangeEpisode
}: Props): JSX.Element => {
  return (
    <div className="flex flex-col w-9/12 drag-none">
      <RadioNameSelect
        className="text-sm"
        radioOptions={radioOptions}
        disabled={disabled}
        onChange={onChangeRadio}
      />
      <EpisodeSelect
        className="text-xs"
        episodeOptions={episodeOptions}
        disabled={disabled}
        onChange={onChangeEpisode}
      />
    </div>
  )
}

export default RadioSelect
