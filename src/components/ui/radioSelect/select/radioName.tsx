import React, { useMemo } from 'react'

import { Option, OptionGroup } from '../../../../types/option'

import Select from '../../../common/select'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  radioOptions: OptionGroup[]
  disabled: boolean
  onChange: (current: Option) => void
}

const RadioNameSelect = ({
  className = '',
  radioOptions,
  disabled,
  onChange
}: Props): JSX.Element => {
  const optGroups = useMemo(
    () =>
      radioOptions.map((e) => (
        <optgroup className="font-sans" key={e.label} label={e.label}>
          {createOptions(e.options)}
        </optgroup>
      )),
    [radioOptions]
  )

  return (
    <Select
      className={className}
      disabled={disabled}
      options={optGroups}
      onChange={onChange}
    />
  )
}

export default React.memo(RadioNameSelect)
