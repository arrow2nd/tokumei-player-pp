import React from 'react'

import { Option, OptionGroup } from '../../../types/option'

import EpisodeSelect from './select/episode'
import RadioNameSelect from './select/radioName'

type Props = {
  radioOptions: OptionGroup[]
  episodeOptions: Option[]
  disabled: boolean
  currentEpisode: string
  onChangeRadio: (current: Option) => void
  onChangeEpisode: (current: Option) => void
}

const RadioSelect = ({
  radioOptions,
  episodeOptions,
  disabled,
  currentEpisode,
  onChangeRadio,
  onChangeEpisode
}: Props): JSX.Element => (
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
      currentEpisode={currentEpisode}
      onChange={onChangeEpisode}
    />
  </div>
)

export default React.memo(RadioSelect)
