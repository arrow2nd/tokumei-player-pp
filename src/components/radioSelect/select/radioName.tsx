import React, { useMemo, ChangeEvent } from 'react'
import { GroupOptionType } from '../../../types/option'

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
  const optGroups = useMemo(
    () =>
      radioOptions.map((e) => (
        <optgroup key={e.label} label={e.label}>
          {e.options.map((e) => (
            <option key={e.label} value={e.value}>
              {e.label}
            </option>
          ))}
        </optgroup>
      )),
    [radioOptions]
  )

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
