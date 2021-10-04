import React, { useMemo, ChangeEvent } from 'react'
import { GroupOptionType } from '../../../types/option'
import { createOptions } from './createOptions'

type Props = {
  className?: string
  radioOptions: GroupOptionType[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const RadioNameSelect = ({
  className = '',
  radioOptions,
  onChange
}: Props): JSX.Element => {
  const optGroups = useMemo(() => {
    return radioOptions.map((e) => (
      <optgroup className="font-sans" key={e.label} label={e.label}>
        {createOptions(e.options, 40)}
      </optgroup>
    ))
  }, [radioOptions])

  return (
    <select
      className={`border-none outline-none ${className}`}
      onChange={onChange}
    >
      {optGroups.length > 0 ? optGroups : <option>Loading...</option>}
    </select>
  )
}

export default RadioNameSelect
